const menuSchema=require("./Models/menu.js");
const ExpressError=require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const orderSchema=require("./Models/order.js");

module.exports.validatemenu=(req,res,next)=>{
    let {error}= menuSchema.validate(req.body.menu);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
  throw new ExpressError(400,errMsg);
  }else{
    next();
  }
  };

  module.exports.validateorder=(req,res,next)=>{
    let {error}= orderSchema.validate(req.body.order);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
  throw new ExpressError(400,errMsg);
  }else{
    next();
  }
  };
 
    module.exports.isLoggedin=(req,res,next)=>{
      console.log(req.path, "..", req.originalUrl);
        if(!req.isAuthenticated()){
            //console.log(req.user);
            req.session.redirectUrl=req.originalUrl;
            req.flash("error","you must be logged in!");
            res.redirect("/login");
          }
          next();
    }
   module.exports.saveRedirectUrl=(req,res,next)=>{
      if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
      }
      next();
    }
  
