const User = require("../Models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
module.exports.registerform = (req, res) => {
  res.render("users/register.ejs");
};

module.exports.register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new User({
      email,
      username,
    });
    const registereduser = await User.register(newuser, password);
    console.log(registereduser);

    req.login(registereduser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "welcome to the app");
        res.redirect("/menu");
      }
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/Register");
  }
};

module.exports.loginform = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "you logged in successfully");
  let redirectUrl = res.locals.redirectUrl || "/menu";
  res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
  req.logout((err) => {
    if (err) {
      console.log("Logout error:", err);
      return next(err);
    }
    console.log("Logout successful");
    req.flash("success", "You are logged out successfully!");
    res.redirect("/menu");
  });  
}
