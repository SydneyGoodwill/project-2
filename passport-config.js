const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./models");
const passport = require("passport");
const authenticateUser = async (email, password, done) => {
  const user = await getUserByEmail(email);
  if (user === null) {
    return done(null, false, { message: "No user with that email" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      user.loggedIn = true;
      user.save({ fields: ["loggedIn"] });
      return done(null, user);
    }
    return done(null, false, { message: "password incorrect" });
  } catch (e) {
    return done(e);
  }
};
passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  return done(null, getUserById(id));
});
async function getUserByEmail(email) {
  return await db.User.findOne({ where: { email } });
}
async function getUserById(id) {
  return await db.User.findOne({ where: { id } });
}

module.exports = passport;
