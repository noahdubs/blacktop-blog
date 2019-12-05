var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

// show one user and their posts, get :id
router.get("/:username", ignoreFavicon, (req, res)=>{
    // Find user from request
    User.find({username:req.params.username}).populate("posts").exec((err, foundUser)=>{
        if(err){
            console.log(err);
        } else {
            //render user profile template
            var userOne = foundUser[0];
            userInfo = {
                name : userOne.name,
                picture: userOne.picure,
                username: userOne.username,
                posts: userOne.posts,
                userid: userOne._id
            }
            res.render("user/show", userInfo);
        }
    });
    
});

// edit profile, get
router.get("/:username/edit", (req, res)=>{
    User.findByUsername(req.params.username, (err, foundUser)=>{
        if(err) {
            console.log(err);
        } else {
            res.render("user/edit", {user: foundUser});
        }
    });
});

// update profile, post
router.put("/:username", (req, res)=>{
    User.find({username:req.params.username}, (err, foundUser)=>{
        if(err) {
            console.log(err)
        } else {
            var userInfo = foundUser[0];
            console.log(userInfo._id);
            var bodyUser = req.body.user;
            User.findByIdAndUpdate(userInfo._id, bodyUser, (err, userFound)=>{
                if(err) {
                    console.log(err);
                } else {
                    res.redirect("/" + bodyUser.username);
                }
            });
        }
    });
});

// delete profile, delete
router.delete("/:username", (req, res)=>{
    console.log(req.params);
    User.find({username:req.params.username}, (err, foundUser)=>{
        if(err) {
            console.log(err)
        } else {
            var userInfo = foundUser[0];
            User.findByIdAndDelete(userInfo._id, (err)=>{
                if(err) {
                    console.log(err);
                    res.redirect("/");
                } else {
                    res.redirect("/login");
                }
            });
        }
    });
})

// middleware for favicon
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }

module.exports = router;