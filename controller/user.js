const User = require("../Models/User.js");


module.exports.getSignup = (req,res)=>
    {
         res.render("../views/user/signup.ejs");
    }

module.exports.signup = async (req,res)=>
    {
          let {username,email,password} = req.body;

          try
          {
              const newUser =  new User({username,email});
              const newUserRegistered =await  User.register(newUser,password);
              
              req.login(newUserRegistered,(err)=>
              {
                    if(err) return next(err);
                    req.flash("success", `Welcome ${username} Inside QuestNest`);
                    res.redirect("/Listings");
              });

          }
          catch(err)
          {
              req.flash("error",err.message);
              res.redirect("/signup");
          }
    }


module.exports.getLogin =(req,res)=>
    {
         res.render("../views/user/login.ejs");
    }


    module.exports.login = async (req,res)=>
        {
            
             let {username} = req.body;
        
             req.flash("success",`Welcome Back ${username}`);
   
             // empty haii kyuki  user login hua haii to req.session  ki info ko delete kardega
            // res.redirect(req.session.redirectUrl);
            // we will store in locals
           
        
            let redirectUrl = (res.locals.redirectUrl || "/Listings");
        
           // if(redirectUrl == "/Listings/:id/Reviews") return res.redirect("/Listings/:id");
          
            return res.redirect(redirectUrl);
         
   
        }

        
module.exports.logout = (req,res,next)=>{
    let username = req.user.username;

    req.logout((err)=>
    { 
         if(err) return next(err);
         req.flash("success",`${username} Successfully Logged Out`);
         res.redirect("/Listings");
         return next();
    });
   
}

