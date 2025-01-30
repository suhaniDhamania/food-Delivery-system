
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
console.log(process.env.SECRET);

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const userRouter = require("./routes/user");
const menuRouter = require("./routes/menu");
const orderRouter=require("./routes/order.js")
const User = require("./Models/user");
const Menu = require("./Models/menu");
const ejsMate = require('ejs-mate');
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ExpressError = require("./utils/ExpressError.js");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const session = require("express-session");
const MongoStore = require('connect-mongo');

const store=MongoStore.create({
  mongoUrl:DBUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("error in mongo session store")
});
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    store,
  })
);
const flash = require("connect-flash");
app.use(flash());
const passport = require("passport");
const LocalStrategy = require("passport-local");


app.set("view engine", "ejs");

const DBUrl=process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DBUrl);
}

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



app.use("/", userRouter);

app.use("/menu",menuRouter);

app.use("/",orderRouter);



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
  });
  
  app.use((err, req, res, next) => {
    let { StatusCode = 500, message = "something went wrong" } = err;
    res.status(StatusCode).render("error.ejs", { message });
  });

app.listen(5000, () => {
  console.log("listening port to 5000");
});
