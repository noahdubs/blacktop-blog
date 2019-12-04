var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user")
var Post = require("../models/post")

//every route starts with "/:username(username of person)/post"

// form for new post, get
router.get("/new", (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        if(err) {
            console.log(err);
        } else{
            res.render("post/new", {user: user});
        }
    });
});

// create comment under logged in user
router.post("/", (req, res)=>{
    User.findById(req.user._id, (err, user)=>{
        if(err){
            console.log(err);
        } else {
            Post.create(req.body.post, (err, post)=>{
                if(err){
                    console.log(err);
                } else {
                    //add username and id to post
                    post.author.id = req.user._id;
                    post.author.username = req.user.username;
                    post.save();
                    // connect new comment to user
                    user.posts.push(post);
                    user.save();
                    var newRoute = "/" + req.user.username + "/post/" + post._id
                    res.redirect(newRoute);
                }
            });
        }
    });
});

// shows individual post
router.get("/:id", (req, res)=>{
    Post.findById(req.params.id, (err, foundPost)=>{
        if(err){
            console.log(err);
        } else {
            //render show template of selected post
            res.render("post/show", {post:foundPost});
        }
    });
});

// delete post, delete
router.delete("/:post_id", (req, res)=>{
    // find post and delete
    Post.findByIdAndDelete(req.params.post_id, (err)=>{
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/home");
        }
    });
});

module.exports = router;

