var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Post = require("../models/post");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//everything starts with /:username/post/:id/comment

// new comment form
router.get("/new", middleware.isLoggedIn,  (req, res)=>{
    //find post by id
    Post.findById(req.params.id, (err, post)=>{
        if(err){
            console.log(err);
        } else {
            res.render("post/show", {comment: comment});
        }
    });
});

// post route
router.post("/", middleware.isLoggedIn, (req, res)=>{
    // lookup post by id
    Post.findById(req.params.id, (err, post)=>{
        if(err){
            console.log(err);
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, comment)=>{
                if(err) {
                    console.log(err);
                } else{
                    // add username and id to comment
                    comment.author._id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect comment to post
                    post.comments.push(comment);
                    console.log(post);
                    post.save();
                    res.redirect("/home");
                }
            });
        }
    });
});

// edit get route
router.get("/:comm_id/edit", middleware.checkCommentOwner, (req, res)=>{
    Comment.findById(req.params.comm_id, (err, foundComment)=>{
        if(err) {
            console.log(err);
        } else{
            res.render("comments/edit", {user:req.params.username, post_id: req.params.id, comm_id: req.params.comm_id, comment: foundComment});
        }
    });
});

// update comment
router.put("/:comm_id", middleware.checkCommentOwner, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comm_id, req.body.comment, (err, updatedComment)=>{
        if(err) {
            console.log(err);
        } else {
            redt = "/" + req.params.username + "/post/" + req.params.id;
            res.redirect(redt);
        }
    });
});

// delete comment
router.delete("/:comm_id", middleware.checkCommentOwner, (req, res)=>{
    Comment.findByIdAndDelete(req.params.comm_id, (err)=>{
        if(err) {
            console.log(err);
        } else {
            res.redirect("back");
        }
    });
});

module.exports = router;