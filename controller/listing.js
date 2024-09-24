const Listing = require("../Models/Listing.js");

module.exports.index = async (req, res) => {

      const data = await Listing.find({});
      res.render("../views/Listings/index.ejs", { data });

};

// Do the same for other async functions.

  module.exports.renderNew = (req, res) => {
    res.render("Listings/new.ejs");
  }


  module.exports.specific = async (req, res) => {
    const { id } = req.params;
    // nested populate ki sarre listing mein reviews aaye aur  har ek review ke liye path mein author aajaye

    const curr_list = await Listing.findById(id).populate({path: "reviews", populate:
      {
        path:"author",
      },
  }).populate("owner");



    if(!curr_list)
    {
       req.flash("error", "Requested Listing Does Not Exist!");
      return  res.redirect("/Listings");
    }
    res.render("Listings/show.ejs", { curr_list });
  }




  module.exports.posting = async (req, res) => {
  
    let url = req.file.path;
    let filename = req.file.filename;

    const lst = new Listing(req.body.Listing);
    // new listing ka owner ki id using passport req.user
    lst.owner = req.user._id;
    
    lst.image = {url, filename};
    await lst.save();

    req.flash("success","NEW LISTING CREATED!");
    return  res.redirect("/Listings");
    
  }

  module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/edit.ejs", { listing });
  }

  module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.Listing }, { new: true, runValidators: true });

    if(!updatedListing)
      {
         req.flash("error", "Requested Listing Does Not Exist!");
         return res.redirect("/Listings");
      }

       if(typeof req.file !== "undefined")
       {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url,filename};
        await updatedListing.save();
       }
 
   
    req.flash("success","EDITED LISTING!");
    return res.redirect(`/Listings/${id}`);
  }

  module.exports.deleteListing = async (req, res) => {

    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","DELETED LISTING!");
    return res.redirect("/Listings");

  }