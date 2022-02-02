const express = require('express');
const Admin = require('../schema/Admin')
const User = require('../schema/User');
const Subscriber = require('../schema/Subscriber');
const SubscriberData = require('../schema/SubscriberData');
const Subscription = require('../schema/Subscription');
const Notification = require('../schema/Notification');
const EmailSubscription = require('../schema/EmailSubscription')
const ContactUs = require('../schema/ContactUs');
const Ticket = require('../schema/Ticket');
const passport = require('passport');
const bcrypt = require('bcrypt');


const router = express.Router();

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

router.post('/login', (req, res, next) => {
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
  }
});


router.get('/checkAuthentication', (req, res) => {
  const authenticated = typeof req.user !== 'undefined';
  if (!req.isAuthenticated()) {
    // if user not authenticated send it to client
    console.log(`not Logged in : ${authenticated}`);
    res.status(500).json({ msg: 'not logged in', authenticated });
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

router.put('/update', async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    if (!body.oldPassword) return res.status(200).send("User saved successfully");;
    const user = await User.findOne({ userId: body.id });
    const isPassword = await bcrypt.compare(body.oldPassword, user.password)
    if (!isPassword) {
      return res.status(401).json({msg: "Invalid password"});
    }
    user.password = await bcrypt.hash(body.password, 10);
    await user.save();
    console.log(user);
    res.status(200).send("User saved successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({msg:"Server Error : update Info"})
  }
});

module.exports = router;