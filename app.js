  // so that credentials cannot access by others:

if(process.env.NODE_ENV != "production")
{
  require("dotenv").config();

}


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const dburl = process.env.ATLASDB_URL;



mongoose.connect(dburl)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));



const app = express();
const Listing = require("./Models/Listing");
const Review = require("./Models/Review.js");
const User = require("./Models/User.js");
const { log } = require("console");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));


// routers
const  lis_g = require("./routes/listing.js");
const rev_g = require("./routes/review.js");
const user_g = require("./routes/user.js");

// Cookies-e_sessions & flash
const cp = require("cookie-parser");
const exp_session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");

const store = MongoStore.create(
  {
    mongoUrl: dburl,
    crypto:
    {
       secret:process.env.SECRET,
    },
    touchAfter: 24*3600,

  });

  store.on("error", (err)=>
  {
     console.log("ERROR IN MONGO SESSION STORE",err);
  })


const sessionOptions = 
{
   store: store,
   secret: process.env.SECRET,
   resave:false,
   saveUninitialized:true,
   cookie:
   {
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true,
   }
}

app.use(exp_session(sessionOptions));
app.use(flash());

 // before sessions ALWAYS 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



  // ERROR MIDDLEWARE REQUIRE
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");

// SERVER SIDE VALIDATION REQUIRE
const {ListingSchema,ReviewSchema} = require("./schema.js");
const { appendFileSync } = require("fs");


const validatelisting = (req, res, next) => {
  let { error } = ListingSchema.validate(req.body);
  if (error) {
      throw new ExpressError(400, error);
  } else return next();
};

const validatereview = (req, res, next) => {
  let { error } = ReviewSchema.validate(req.body);
  if (error) {
      throw new ExpressError(400, error);
  } else return next(); 
};





  app.use((req,res,next)=>
  {
       res.locals.currUser =  req.user;
       res.locals.success = req.flash("success");
       res.locals.error = req.flash("error");
       return next();
  });


 // Listing/Review/User Model

 app.use("/Listings",lis_g);
 app.use("/Listings/:id/Reviews",rev_g);
 app.use("/",user_g);

     // Specific Listing Category

     app.get("/Rooms", async (req, res) => { 
      try {
          const data = await Listing.find({ category: "Rooms" });
          res.render("category/Once.ejs", { data });
      } catch (error) {
        throw new  ExpressError(404,"Page Not Found!");
      }
  });

app.get("/Mountains", async (req, res) => { 
    try {
        const data = await Listing.find({ category: "Mountains" });
        res.render("category/Once.ejs", { data });
    } catch (error) {
      throw new  ExpressError(404,"Page Not Found!");
    }
});
  
 
app.get("/Beaches", async (req, res) => { 
  try {
      const data = await Listing.find({ category: "Beaches" });
      res.render("category/Once.ejs", { data });
  } catch (error) {
    throw new  ExpressError(404,"Page Not Found!");
  }
});



   //Privacy/terms

  app.get("/privacy", (req,res)=>
  {
     res.render("information/privacy.ejs");
  });

  app.get("/terms", (req,res)=>
    {
       res.render("information/terms.ejs");
    });



// ERROR HANDLERS MIDDLEWARES:-

app.all("*", (req, res, next) => {
  throw new  ExpressError(404,"Page Not Found!");
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("includes/error", { message });
});



app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

