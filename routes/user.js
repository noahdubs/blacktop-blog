var express = require("express");
var router = express.Router();

// show one user and their posts, get :id
router.get("/:id", (req, res)=>{
    res.send("user profile");
});

// show followers, get

// show following, get

// show interactions, get

// edit profile, get

// update profile, post

// delete profile, delete

module.exports = router;