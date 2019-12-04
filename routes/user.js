var express = require("express");
var router = express.Router();
var User = require("../models/user");

// show one user and their posts, get :id
router.get("/:username", (req, res)=>{
    // Find user from request
    console.log(req.query);
    var user = req.params.username;
    User.findOne({username: user}).populate("posts").exec((err, foundUser)=>{
        if(err){
            console.log(err);
        } else {
            //render user profile template
            res.render("user/show", {user:foundUser});
        }
    });
});

// edit profile, get
router.get(":/username/edit", (req, res)=>{
    User.findByUsername(req.params.username, (err, foundUser)=>{
        if(err) {
            console.log(err);
        } else {
            res.render("user/edit", {user: foundUser});
        }
    });
});

// update profile, post

// delete profile, delete

module.exports = router;