const express = require('express');
const Admin = require('../schema/Admin')
const User = require('../schema/User');
const Subscriber = require('../schema/Subscriber');
const SubscriberData = require('../schema/SubscriberData');
const Subscription = require('../schema/Subscription');
const Notification = require('../schema/Notification');
const Invoice = require('../schema/Invoice')
const Plans = require('../schema/Plans');
const ContactUs = require('../schema/ContactUs');
const Ticket = require('../schema/Ticket');
const passport = require('passport');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail')



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

router.post('/register', async (req, res) => {
  const body = req.body;
  const admin = await Admin.findOne({ userName: body.userName });
  if (admin) {
    return res.status(401).send({ msg: "userName already registered" });
  }
  const newAdmin = new Admin({
    firstName: body.firstName,
    lastName: body.lastName,
    userName: body.userName,
  });
  const data = await newAdmin.save();
  console.log(data._id);
  const newUser = await new User({
    userId: data._id,
    onModel: "Admin",
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(body.password, salt, async (err, hash) => {
      newUser.password = hash;
      const user = await newUser.save();
      // res.send(data);
      console.log(data, user);
    });
  });

  res.status(200).send({ msg: "admin register success" });

});

router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('admin-local', function (err, user, info) {
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
    return res.json({ error: err.message });
  }
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


router.get('/logout', (req, res) => {
  console.log('before', req.user);

  req.logout();
  console.log('logged out', req.user);
  res.status(200).json({ message: 'logged out', authenticated: false });
});

router.put('/update', checkauth, async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
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
    return res.status(500).json({ msg: "Server Error : update Info" })
  }
});

router.get('/getInfo', checkauth, async (req, res) => {
  try {
    const subscriber = await Subscriber.find();
    const subscriberData = await SubscriberData.find();
    const subscription = await Subscription.find();
    const contactUs = await ContactUs.find();
    const ticket = await Ticket.find();
    const invoice = await Invoice.find();
    const plans = await Plans.find();
    console.log({ subscriber, subscriberData, subscription, contactUs, ticket, invoice, plans });
    return res.status(200).json({ subscriber, subscriberData, subscription, contactUs, ticket, invoice, plans });

  } catch (error) {
    console.log(error);
    return res.status(501).json({ error: error })
  }
})
router.put('/editplan', checkauth, async (req, res) => {
  const body = req.body
  try {
    const plan = await Plans.findOneAndUpdate({ _id: body.id }, { $set: { price: body.price, date: Date.now() } }, { new: true });
    res.status(200).json({ plan })
  } catch (error) {
    return res.status(500).json({ msg: 'server error: edit plan' })
  }
})

router.put('/closeticket', checkauth, async (req, res) => {
  const body = req.body;
  try {
    const ticket = await Ticket.findOneAndUpdate({ _id: body.id }, { $set: { reply: body.text, ticketDate: Date.now(), status: "closed" } }, { new: true })
    const subscriber = await Subscriber.findOne({ _id: ticket.userId })

    const msg = {
      to: subscriber.email, // Change to your recipient
      from: 'sherif.elshamaaa@gmail.com', // Change to your verified sender
      subject: `SuperSonic solotions, Ticket id: ${ticket._id}`,
      html: ticket.reply,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    res.status(200).json({ ticket })
  } catch (error) {
    return res.status(500).json({ msg: 'server error: close ticket' })
  }
})

router.post('/sendemail', checkauth, async (req, res) => {
  const body = req.body
  try {
    const email = await ContactUs.findOneAndUpdate({ _id: body.id }, { $set: { reply: body.text, updateDate: Date.now(), replyState: true } })

    const msg = {
      to: email.email, // Change to your recipient
      from: 'sherif.elshamaaa@gmail.com', // Change to your verified sender
      subject: 'SuperSonic solotions',
      html: email.reply,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
        return error
      })
    res.status(200).json({ email })
  } catch (error) {
    return res.status(500).json({ msg: 'server error: send email' })
  }
})

router.delete('/closeaccount', checkauth, async (req, res) => {
  const id = req.query.id
  try {
    const subscriber = await Subscriber.findOneAndDelete({ _id: id })
    const user = await User.findOneAndDelete({ userId: id })
    const subData = await SubscriberData.findOneAndDelete({ userId: id })
    const sub = await Subscription.findOneAndDelete({ userId: id })
    const noti = await Notification.findOneAndDelete({ userId: id })
    const tick = await Ticket.deleteMany({ userId: id })

    res.status(200).json({ subscriber })
  } catch (error) {
    return res.status(500).json({ msg: 'server error: delete account' })

  }
})

module.exports = router;