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

// About page route
router.get("/about", (req, res)=>{
    res.render("about");
});

// Auth routes
// ==============
router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username, email: req.body.email, name: req.body.name, picture: req.body.picture, bio:req.body.bio});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err) {
            console.log(err);
        }
        passport.authenticate("local")(req, res, ()=>{
            // redirect to user profile
            res.redirect("/" + user.username);
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