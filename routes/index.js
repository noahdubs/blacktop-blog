var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Post = require("../models/post");

// nothing is behind these routes

// index route - ask user to log in or register
router.get("/", (req, res)=>{
    res.render('landing');
});

// home route
router.get("/home", (req, res)=>{
    Post.find({}, (err, posts)=>{
        if(err){
            console.log(err);
        } else {
            res.render("home", {posts: posts});
        }
    });
});

// Auth routes
// ==============
router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username, email: req.body.email, name: req.body.name, bio:req.body.bio});
    if(!req.body.picture){
        newUser.picture = "data:image/jpeg;base64,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"
    } else {
        newUser.picture = req.body.picture
    }
    User.register(newUser, req.body.password, (err, user)=>{
        if(err) {
            console.log(err);
        }
        passport.authenticate("local")(req, res, ()=>{
            // redirect to user profile
            res.redirect(`/${user.username}`)
        });
    });
});


// show login form
router.get("/login", (req, res)=>{
    res.render("login");
});

// Check is user is legit, logs them in and redirects them
router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}),(req, res)=>{
    res.redirect("/"+req.body.username);
});


// logout
router.get("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});


module.exports = router;