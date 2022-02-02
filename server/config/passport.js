const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Subscriber = require('../schema/Subscriber')
const User = require('../schema/User')
const Admin = require('../schema/Admin')

// done(err, false)

module.exports = function (passport) {
  // 1. Implement Startegy
  passport.use('local',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        console.log(email, password);
        const subscriber = await Subscriber.findOne({ email: email });
        if (!subscriber) {
          done("NO user found", false);
        } else {
          const user = await User.findOne({ userId: subscriber._id })
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (isMatched) {
              done(null, subscriber);
            } else {
              done("wrong password", false);
            }
          });
        }
      }
    )
  );


  passport.use('admin-local',
    new LocalStrategy(
      { usernameField: 'userName' },
      async (userName, password, done) => {
        console.log(userName, password);
        const admin = await Admin.findOne({ userName: userName });
        if (!admin) {
          done("no user found", false);
        } else {
          const user = await User.findOne({ userId: admin._id })
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (isMatched) {
              done(null, admin);
            } else {
              done("wrong password", false);
            }
          });
        }
      }
    )
  );


  // 2. Serialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 3. Deserialze User
  passport.deserializeUser(async (id, done) => {
    let user = await Admin.findById(id);
    if (!user) {
      user = await Subscriber.findById(id);
    }
    done(null, user);
  });
};