const passport = require("passport");
//for passwords
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const UserModel = require("../models/user-model");

// Save the user's ID (called when user logs in)
passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);
});

// Retrieve the user's info from the DB with the ID
passport.deserializeUser((userId, next) => {
  UserModel.findById(userId, (err, userFromDb) => {
    if (err) {
      next(err);
      return;
    }

    next(null, userFromDb);
  });
});

// username & password login strategy - called in angular side, these names
//loginUsername and loginPassword
passport.use(
  new LocalStrategy(
    // loginUsername and loginPassword are fields that we use to check if our login works
    {
      usernameField: "loginUsername", // sent through AJAX from Angular
      passwordField: "loginPassword" // sent through AJAX from Angular
    },
    (theUsername, thePassword, next) => {
      UserModel.findOne({ username: theUsername }, (err, userFromDb) => {
        if (err) {
          next(err);
          return;
        }

        //if username doesn't exist in databse, it's incorrect
        if (userFromDb === null) {
          next(null, false, { message: "Incorrect username." });
          return;
        }
        //if password doesn't match username in database
        if (
          bcrypt.compareSync(thePassword, userFromDb.encryptedPassword) ===
          false
        ) {
          next(null, false, { message: "Incorrect password." });
          return;
        }
//if correct, we get user from database
        next(null, userFromDb);
      });
    }
  )
);
