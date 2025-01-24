const express = require("express");
const router = express.Router();
const Menu = require("../Models/menu");
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validatemenu,isLoggedin} = require("../middleware.js");
const multer = require("multer");
const storage = require("../cloudConfig.js");
const upload = multer(storage);
const menucontrollers=require("../controllers/menu.js")
//index route
router.get(
  "/",
  wrapasync(menucontrollers.index)
);

//new route
router.get("/new", isLoggedin,menucontrollers.newform);

router.post(
  "/new",isLoggedin,
  upload.single("menu[image]"),
  validatemenu,
  wrapasync(menucontrollers.newmenu)
);


router.get("/:id",wrapasync( menucontrollers.show));


//edit route
router.get(
  "/:id/edit",isLoggedin,
  wrapasync(menucontrollers.editform)
);

router.put(
  "/:id",isLoggedin,
  upload.single("menu[image]"),
  validatemenu,
  wrapasync(menucontrollers.edit)
);

//delete route
router.delete(
  "/:id",isLoggedin,
  wrapasync(menucontrollers.delete)
);

module.exports = router;
