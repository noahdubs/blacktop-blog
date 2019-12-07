var middlewareObj = {};
var User = require("../models/user");
var Comment = require("../models/comments");
var Post = require("../models/post");

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwner = (req, res, next)=>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comm_id, (err, foundComment)=>{
            if(err) {
               req.flash("error", "something went wrong");
               res.redirect("back"); 
            } else {
                console.log(foundComment);
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkPostOwner = (req, res, next)=>{
    if(req.isAuthenticated()){
        Post.findById(req.params.id, (err, foundPost)=>{
            if(err) {
                req.flash("error", "something went wrong");
                res.redirect("back");
            } else {
                if(foundPost.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permisson to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        User.find({username:req.params.username}, (err, foundUser)=>{
            if(err) {
                req.flash("error", "something went wrong");
                res.redirect("back");
            } else {
                var user = foundUser[0];
                if(user._id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;