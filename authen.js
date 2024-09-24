const Listing = require("./Models/Listing.js");
const Review = require("./Models/Review.js");

const isLoggedIn = (req,res,next)=>
{
   
    if(!req.isAuthenticated())
    {
        const match = req.originalUrl.match(/\/Listings\/([a-f0-9]{24})/);
        if (match) {
            res.locals.rate_id = match[1]; // This captures the ID
        }
       
        
         req.session.redirectUrl = req.originalUrl;
         
         if(req.session.redirectUrl == `/Listings/${res.locals.rate_id}/Reviews`) 
         {
            req.session.redirectUrl = `/Listings/${res.locals.rate_id}`;
         }

         req.flash("error", "Used must be logged in");
         return res.redirect("/login");
    }
    return next();
}

const saveRedirectUrl = (req,res,next)=>
{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;
    
    }
    return next();
  
};

const isOwner = async (req,res,next)=>
{
    let {id} = req.params;

    let listing = await  Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id))
    {
       req.flash("error","You Are Not The Owner");
       return res.redirect(`/Listings/${id}`);
    }
   return  next();
}

const isAuthor = async (req,res,next)=>
{
    let {id,reviewId} = req.params;

    let review = await  Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id))
    {
       req.flash("error","You Are Not the Author Of This Review");
       return res.redirect(`/Listings/${id}`);
    }
   return  next();
     
     

}

module.exports = {isLoggedIn,saveRedirectUrl,isOwner,isAuthor};