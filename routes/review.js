const express =  require("express")
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const {ReviewSchema} = require("../schema.js");
const { appendFileSync } = require("fs");
const Review = require("../Models/Review.js");
const Listing = require("../Models/Listing");
const  {isLoggedIn,isAuthor} = require("../authen.js");
const reviewController = require("../controller/review.js");

const router = express.Router({mergeParams:true})



const validatereview = (req, res, next) => {
    let { error } = ReviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else return next();
  };
  

  router.post("/", isLoggedIn, validatereview, wrapAsync(reviewController.giveReview));

  router.delete("/:reviewId",isLoggedIn, isAuthor,wrapAsync(reviewController.destroyReview));
  
module.exports = router;