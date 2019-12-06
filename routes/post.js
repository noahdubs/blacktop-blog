var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Post = require("../models/post");
var middleware = require("../middleware");

//every route starts with "/:username(username of person)/post"

// form for new post, get
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    User.find({username:req.params.username}, (err, foundUser)=>{
        if(err) {
            console.log(err);
        } else{
            userOne = foundUser[0];
            res.render("post/new", {user: userOne});
        }
    });
});

// create post under logged in user
router.post("/", middleware.isLoggedIn, (req, res)=>{
    User.find({username:req.params.username}, (err, user)=>{
        if(err){
            console.log(err);
        } else {
            Post.create(req.body.post, (err, post)=>{
                if(err){
                    console.log(err);
                } else {
                    user = user[0];
                    console.log(post);
                    //add username and id to post
                    post.author.id = user._id;
                    post.author.username = user.username;
                    post.author.picture = user.picture;
                    post.save();
                    // connect new comment to user
                    user.posts.push(post);
                    user.save();
                    var newRoute = "/" + user.username + "/post/" + post._id
                    res.redirect(newRoute);
                }
            });
        }
    });
});

// shows individual post
router.get("/:id", (req, res)=>{
    Post.findById(req.params.id).populate("comments").exec((err, foundPost)=>{
        if(err){
            console.log(err);
        } else {
            //render show template of selected post
            res.render("post/show", {post:foundPost});
        }
    });
});

// update post form 
router.get("/:id/edit", middleware.checkPostOwner, (req, res)=>{
    Post.findById(req.params.id, (err, foundPost)=>{
        if(err) {
            console.log(err);
        } else {
            res.render("post/edit", {post:foundPost, username:req.params.username});
        }
    });
});

// update post
router.get("/:id", middleware.checkPostOwner, (req, res)=>{
    Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost)=>{
        if(err) {
            console.log(err);
        } else {
            redt = "/" + req.params.username + "/post/" + req.params.id;
            res.redirect(redt);
        }
    })
})

// delete post, delete
router.delete("/:id", middleware.checkPostOwner, (req, res)=>{
    // find post and delete
    Post.findByIdAndDelete(req.params.id, (err)=>{
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;

