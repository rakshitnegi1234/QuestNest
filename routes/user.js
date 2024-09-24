const express =  require("express")
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const {UserSchema} = require("../schema.js");
const { appendFileSync } = require("fs");
const User = require("../Models/User.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../authen.js");
const userController = require("../controller/user.js");

const router = express.Router()



router
.route("/signup")
.get(userController.getSignup)
.post( wrapAsync(userController.signup));



router
.route("/login")
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect: "/login",failureFlash:true,}), wrapAsync(userController.login))
.get(userController.getLogin);


router.get("/logout",userController.logout);
          
     
module.exports =router;


