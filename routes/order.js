const express = require("express");
const router = express.Router();
const Order = require("../Models/order");
const passport = require("passport");
const { validateorder, isLoggedin } = require("../middleware");
const wrapasync = require("../utils/wrapasync");
const orderControllers=require("../controllers/order");



router.get("/allOrder",orderControllers.allorder);

//new
router.get("/order",orderControllers.orderform );
router.post(
  "/order",
  isLoggedin,
  validateorder,
  wrapasync(orderControllers.order )
);
module.exports = router;
