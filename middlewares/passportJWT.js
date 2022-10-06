const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/userModel");
const config = require("../config");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
  const strategy = new Strategy(options, async (payload, done) => {
    const user = await User.findById(payload.id);
    // console.log("find User in passport  middleware");

    if (!user) return done(new Error("User Not Found"), null);

    return done(null, user);
  });
  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", { session: false });
    },
  };
};
