var express = require("express");
var router = express.Router();

// index route - shows posts, get
router.get("/", (req, res)=>{
    res.render("posts/index");
});
// form for new post, get

// create - add new post, post route

// show one post, get

// delete post, delete

module.exports = router;

