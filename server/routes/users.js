const express = require('express');
const http = require('http');
const querystring = require('query-string');
const Subscriber = require('../schema/Subscriber');
const SubscriberData = require('../schema/SubscriberData');
const Subscription = require('../schema/Subscription');
const User = require('../schema/User');
const Notification = require('../schema/Notification');
const EmailSubscription = require('../schema/EmailSubscription')
const ContactUs = require('../schema/ContactUs');
const Ticket = require('../schema/Ticket');
const Invoice = require('../schema/Invoice');
const Plans = require('../schema/Plans')
const bcrypt = require('bcrypt');
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE);
const endpointSecret = process.env.endpointSecret
const sgMail = require('@sendgrid/mail')
const WelcomeEmail = require('../emails/WelcomeEmail')
var generator = require('generate-password');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = express.Router();

const checkauth = (req, res, next) => {
  const authenticated = typeof req.user !== 'undefined';
  if (!req.isAuthenticated()) {
    // if user not authenticated send it to client
    console.log(`not Logged in : ${authenticated}`);
    res.status(500).json({ msg: 'Authorization failed', authenticated });
    return;
  }
  next();
}

const sendToRMS = async (req, res) => {
  const { id } = req.body;
  const subscriber = await Subscriber.findOne({ _id: id });
  const userEmail = subscriber.email.split('@');
  const fullName = subscriber.firstName + ' ' + subscriber.lastName

  const subscriberData = await SubscriberData.findOne({ userId: id })
  const subscription = await Subscription.findOne({ userId: id })

  var password = generator.generate({
    length: 10,
    numbers: true
  });

  let loginData = querystring.stringify({
    username: process.env.RMS_USERNAME,
    password: process.env.RMS_PASSWORD
  })

  let loginOptions = {
    host: process.env.RMS_URL,
    port: 5000,
    path: '/auth/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(loginData)
    }
  };


  try {
    const logRequest = http.request(loginOptions, function (response) {
      response.setEncoding('utf8');
      var token = ""
      response.on('data', function (chunk) {
        console.log("body: " + chunk);
        token += chunk
        const readyToken = token.slice(16, -2);

        let userData = querystring.stringify({
          _id: id,
          username: userEmail[0],
          password: password,
          role: "SUBSCRIPER"
        })

        let userOptions = {
          host: process.env.RMS_URL,
          port: 5000,
          path: '/auth/signup',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(userData),
            'Authorization': `Bearer ${readyToken}`
          }
        };

        const userRequest = http.request(userOptions, function (response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
            console.log("body: " + chunk);

          })
        })
        userRequest.write(userData);
        userRequest.end();


        let createData = querystring.stringify({
          _id: subscriberData._id,
          userId: id,
          companyName: subscriberData.companyName,
          businessType: subscriberData.businessType,
          numberOfEmployees: subscriberData.numberOfEmployees,
          businessNumber: subscriberData.businessNumber,
          address: subscriberData.address,
          country: subscriberData.country,
          city: subscriberData.city,
          zip: subscriberData.zipCode,
          storeName: subscriberData.companyName,
          subscription: subscription.planType,
          fullName: fullName,
        })

        let createOptions = {
          host: process.env.RMS_URL,
          port: 5000,
          path: '/store',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(createData),
            'Authorization': `Bearer ${readyToken}`
          }
        };

        const createRequest = http.request(createOptions, function (response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
            console.log("body: " + chunk);
          })
        })
        createRequest.write(createData);
        createRequest.end();
      })
    })

    logRequest.write(loginData);
    logRequest.end();
    return 
  } catch (error) {
    console.log(error);
  }

}


router.get('/plans', async (req, res) => {
  try {
    const plans = await Plans.find();
    return res.status(200).json({ plans });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error : get plans" })
  }

})
router.post('/register', async (req, res) => {
  const body = req.body;
  const subscriber = await Subscriber.findOne({ email: body.email.toLowerCase() });
  if (subscriber) {
    return res.status(401).send({ msg: "email already registered" });
  }
  const newSubscriber = new Subscriber({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
  });
  const data = await newSubscriber.save();
  console.log(data._id);
  const newUser = await new User({
    userId: data._id,
    onModel: "Subscriber",
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(body.password, salt, async (err, hash) => {
      newUser.password = hash;
      const user = await newUser.save();
      // res.send(data);
      console.log(data, user);
    });
  });
  const notification = new Notification({
    userId: data._id
  });
  await notification.save();
  const msg = {
    to: body.email, // Change to your recipient
    from: 'sherif.elshamaaa@gmail.com', // Change to your verified sender
    subject: 'Welcome to Supersonic solotions',
    html: WelcomeEmail,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  res.status(200).send({ msg: "register success" });

});

router.get('/notification', checkauth, async (req, res) => {
  const id = req.query.id
  try {
    const data = await Notification.findOne({ userId: id });
    if (!data) {
      return res.send({ msg: "notication not found" });
    }
    console.log(data);
    return res.json({ notification: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server Error : get notification setings" })
  }
})

router.put('/notification', checkauth, async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const data = await Notification.findOneAndUpdate({ userId: body.userId }, { $set: { ...body } }, { new: true });
    console.log(data);

    return res.status(200).json({ notification: data });
  } catch (error) {
    console.log(error.message);
    return res.status(404).send("Server Error : update notification failed")
  }
})

router.post('/emailsub', async (req, res) => {
  const body = req.body;
  try {
    const email = new EmailSubscription({ ...body })
    await email.save();
    res.status(200).send({ msg: "email subscription success" })
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: error })
  }
})

router.post('/contactus', async (req, res) => {
  const body = req.body;
  try {
    const data = new ContactUs({ ...body })
    await data.save();
    res.status(200).send({ msg: 'message received successfully' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error })
  }
})

router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) return res.redirect('/login');

      req.logIn(user, function (err) {
        if (err) {
          res.status(500).json(err);
          return next(err);
        }
        console.log(req.user);
        return res.json({ user: user, authenticated: true });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/profile', checkauth, (req, res) => {
  res.send({ user: req.user ? req.user : 'no user' });
});

router.get('/checkAuthentication', (req, res) => {
  const authenticated = typeof req.user !== 'undefined';
  if (!req.isAuthenticated()) {
    // if user not authenticated send it to client
    console.log(`not Logged in : ${authenticated}`);
    res.status(500).json({ msg: 'Authorization failed', authenticated });
  } else {
    const id = req.user._id;
    res.status(200).json({ id, authenticated }); // if user  authenticated send it to client with user object
  }
});

router.put('/update', checkauth, async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const subscriber = await Subscriber.findOneAndUpdate({ _id: body.id }, { $set: { phone: body.phone, email: body.email } }, { new: true });

    if (!body.oldPassword) return res.status(200).send("User saved successfully");;
    const user = await User.findOne({ userId: body.id });
    const isPassword = await bcrypt.compare(body.oldPassword, user.password)
    if (!isPassword) {
      return res.status(401).json({ msg: "Invalid password" });
    }
    user.password = await bcrypt.hash(body.password, 10);
    await user.save();
    console.log(user);
    res.status(200).send("User saved successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error : update Info")
  }
});

router.post('/subscriberdata', checkauth, async (req, res) => {
  const body = req.body;
  try {
    const data = await SubscriberData.findOne({ userId: body.userId });
    if (data) {
      return res.status(401).send({ msg: "company already registered" });
    }
    const newData = new SubscriberData({ ...body })
    await newData.save();
    console.log(newData);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server Error : submit company" })
  }
  console.log(req.body);
  res.status(200).json("ok");
})

router.get("/subscriberdata", checkauth, async (req, res) => {
  const id = req.query.id
  try {
    const data = await SubscriberData.findOne({ userId: id });
    if (!data) {
      return res.status(404).send({ msg: "no data found" })
    }
    console.log(data);
    return res.json({ info: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server Error : get company data failed" });
  }
})

router.get("/sub", checkauth, async (req, res) => {
  const id = req.query.id
  try {
    const data = await Subscription.findOne({ userId: id });
    if (!data) {
      return res.send({ msg: "sub not found" });
    }
    console.log(data);
    return res.json({ sub: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server Error : get subscription data failed" })
  }

})

router.delete("/sub", checkauth, async (req, res) => {
  const id = req.query.id
  try {
    const data = await Subscription.findOne({ stripeSubID: id });
    if (!data) {
      return res.status(404).send({ msg: "no subscription found" })
    }
    const deleted = await stripe.subscriptions.del(id);

    if (deleted.status === "canceled") {
      await Subscription.findOneAndDelete({ stripeSubID: id })
      return res.json({ status: "canceled" })
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server Error : cancel subscriptions" })
  }
})

router.delete("/subfree", checkauth, async (req, res) => {
  const id = req.query.id
  const data = await Subscription.findOne({_id: id})
  if(!data){
    return res.status(404).send({ msg: "no subscription found"})
  }
  try {
    await Subscription.findOneAndDelete({ _id: id })
    return res.json({ status: "canceled" })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server Error : cancel subscriptions" })
  }
})

router.get('/logout', (req, res) => {
  console.log('before', req.user);

  req.logout();
  console.log('logged out', req.user);
  res.status(200).json({ message: 'logged out', authenticated: false });
});

router.post('/sub', checkauth, async (req, res, next) => {
  const { email, payment_method, id } = req.body;

  try {
    const data = await Subscription.findOne({ email: email, planType: "PRO" })
    if (data) {
      return res.status(401).send({ msg: "company already have pro subscription" });
    }

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'price_1KI41uIi8THaABrOeM4yyCT3' }],
      expand: ['latest_invoice.payment_intent'],

    });

    const status = subscription['latest_invoice']['payment_intent']['status']
    const invoiceUrl = subscription['latest_invoice']['hosted_invoice_url']
    const invoiceId = subscription['latest_invoice']['id']
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
    const stripeId = subscription.id;

    await Subscription.findOneAndDelete({ userId: id })
    if (status !== 'requires_action') {
      const sub = {
        userId: id,
        stripeSubID: stripeId,
        planType: "PRO",
        price: 60,
        startDate: Date.now(),
        customersID: customer.id,
        email: email,
        invoiceUrl: invoiceUrl,
        invoiceId: invoiceId,
        status: status === "succeeded" ? true : false
      }
      const newSubscription = new Subscription({ ...sub })
      await newSubscription.save();
      const invoice = {
        userId: id,
        invoiceUrl: invoiceUrl,
        invoiceId: invoiceId,
        income: 60
      }
      const newInvoice = new Invoice({ ...invoice })
      await newInvoice.save();


      console.log("status: " + status);
      console.log("client_secret: " + client_secret);
      res.json({ 'client_secret': client_secret, 'status': status, 'subscription': newSubscription });
    } else {
      res.json({ client_secret, status });

    }


  } catch (error) {
    console.log(error);
    return res.status(501).json({ error: error })
  }
  next();
}, sendToRMS)

router.post('/freesub', checkauth, async (req, res, next) => {
  const { email } = req.body;
  try {
    const data = await Subscription.findOne({ email: email, planType: "free" })
    if (data) {
      return res.status(401).send({ msg: "company already subscriped" });
    }
    const subscriber = await Subscriber.findOne({ email: email });
    if (subscriber) {
      const data = {
        userId: subscriber._id,
        planType: "FREE",
        price: "0",
        startDate: Date.now(),
        email: email,
        status: true
      }
      const newSubscription = new Subscription({ ...data })
      await newSubscription.save();
      res.json({ 'subscription': newSubscription });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: error })
  }
  next();
}, sendToRMS)

router.post('/ticket', checkauth, async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const data = {
      userId: body.id,
      ticketType: body.ticketType,
      ticket: body.ticket
    }
    const newTicket = new Ticket({ ...data });
    await newTicket.save();
    res.status(200).json({ 'status': 'ticket submited' })
  } catch (error) {
    console.log(error);
    res.status(501).send({ msg: "Server Error : submit ticket" })
  }
})

router.post('/reset', checkauth, async (req, res) => {
  const { email } = req.body;
  try {
    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    // console.log(email);
    if (!subscriber) {
      return res.status(404).json({ msg: "No User found" });
    }
    const user = await User.findOne({ userId: subscriber._id })
    // const oldPass = user.password;
    // const stamp = new Date.now()
    const oldpass = user.oldPassword
    oldpass.push(user.password)
    await User.findOneAndUpdate(
      { userId: subscriber._id },
      { $set: { "oldPassword": oldpass } }
    )

    var randomstring = Math.random().toString(36).slice(-8);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(randomstring, salt, async (err, hash) => {
        await User.findOneAndUpdate(
          { userId: subscriber._id },
          { $set: { "password": hash } }
        )
      })
    })
    const msg = {
      to: subscriber.email, // Change to your recipient
      from: 'sherif.elshamaaa@gmail.com', // Change to your verified sender
      subject: 'Password reset',
      html: `<body>
                  <div style="text-align:center;">
                      <div>password reset succesfuly</div>
                      <div>your password: <spam>${randomstring}</spam></div>
                  </div>
                  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
            
                  <p style="font-size:12px; line-height:20px;">
                    <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
                      Unsubscribe
                    </a>
                    -
                    <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
                      Unsubscribe Preferences
                    </a>
                  </p>
                </div>
              </body>
      `,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })



    res.status(200).json({ msg: "password reset successfully" })
  } catch (error) {
    res.status(500).send({ msg: "Server Error : reset password" })
  }
})

router.post('/webhooks', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  }
  catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const customer = event['data']['object']['customer']
      console.log(`PaymentIntent was successful for customer:  ${customer}!`)
      break;
    }
    case 'customer.subscription.deleted': {
      const status = event['data']['object']['status']
      console.log("status: " + status);
      break;
    }
    default:
      // Unexpected event type
      console.log(event);
      return res.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
})





module.exports = router;