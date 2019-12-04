var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user")
var Post = require("../models/post")

//every route starts with "/:username(username of person)/post"

// form for new post, get
router.get("/new", (req, res)=>{
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
router.post("/", (req, res)=>{
    User.find({username:req.params.username}, (err, user)=>{
        if(err){
            console.log(err);
        } else {
            userOne = user[0];
            Post.create(req.body.post, (err, post)=>{
                if(err){
                    console.log(err);
                } else {
                    //add username and id to post
                    post.author.id = userOne._id;
                    post.author.username = userOne.username;
                    post.save();
                    // connect new comment to user
                    userOne.posts.push(post);
                    userOne.save();
                    var newRoute = "/" + userOne.username + "/post/" + post._id
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
router.delete("/:id", (req, res)=>{
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

