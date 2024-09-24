const Review = require("../Models/Review.js");
const Listing = require("../Models/Listing.js");

module.exports.giveReview = async(req,res)=>
    {
         let {id} = req.params;
         let listing =   await Listing.findById(id);
         let newReview = new Review(req.body.Review);

          newReview.author = req.user._id;   
          listing.reviews.push(newReview);

          await newReview.save();
          await listing.save();
          req.flash("success","NEW REVIEW CREATED!");
        
          res.redirect(`/Listings/${id}`);
    }

    module.exports.destroyReview =async (req, res) => {
        const { id, reviewId } = req.params; 
        let data = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true, runValidators: true });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","REVIEW DELETED!");
        res.redirect(`/Listings/${id}`);
    }
