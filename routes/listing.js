const express =  require("express")
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const {ListingSchema} = require("../schema.js");
const { appendFileSync } = require("fs");
const Listing = require("../Models/Listing");
const  {isLoggedIn,isOwner} = require("../authen.js");
const listingController = require("../controller/listing.js");
const {storage} = require("../cloudConfig.js");

// Multer for managing multi- form data:

const  multer = require("multer");
const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 } // 4MB limit
});


//router 
const router = express.Router()


const validatelisting = (req, res, next) => {
  let { error } = ListingSchema.validate(req.body);
  if (error) {
      throw new ExpressError(400, error);
  } else return next();
};

  //REST CRUD ROUTES APIS
   // using multer middleware to upload the file in the destination

  router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single("Listing[image]"),validatelisting,wrapAsync(listingController.posting));

  

  router.get("/new", isLoggedIn,listingController.renderNew);
  
  router
  .route("/:id")
  .get(wrapAsync(listingController.specific))
  .put(isLoggedIn,upload.single("Listing[image]"),validatelisting, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner,wrapAsync(listingController.deleteListing));


  router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editListing));
  
  
  

  
  
  module.exports = router;