const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const envConfig = require('../db/config');
const { logger, errorLogger } = require('../logger/logger')
const UsersDao = require('../models/daos/Users.dao');
const { formatUserForDB } = require('../utils/users.utils');

const User = new UsersDao();



const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
// Passport Local Strategy

// sign up
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const userItem = {
      firstname: req.body.firstname,
      //lastname: req.body.lastname,
      //birthdate: req.body.birthdate,
      email: username,
      password: createHash(password)
    };
    const newUser = formatUserForDB(userItem);
    const user = await User.createUser(newUser);
    logger.trace("User registration successfull");
    return done(null, user);
  }
  catch (error) {
    return done(error);
  }
}));

// sign in
passport.use('signin', new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.getByEmail(username);
    if (isValidPassword(user, password)) {
      return done(null, user);
    }

  }
  catch (error) {
    errorLogger.error("Error signing in...");
    return done(error);
  }
}))

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id);
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  const user = await User.getById(id);
  done(null, user);
})

module.exports = passport;