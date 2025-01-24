const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../Models/user.js");
const {saveRedirectUrl}=require("../middleware.js");
const usercontrollers=require("../controllers/user.js");

router.get("/Register",usercontrollers.registerform);

router.post("/Register", usercontrollers.register);

router.get("/login",usercontrollers.loginform );

router.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", { failureRedirect: "/login" ,failureFlash:true}),
  usercontrollers.login
);

router.get("/logout",usercontrollers.logout);
module.exports = router;
