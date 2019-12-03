var express = require("express");
var router = express.Router();

// index route - shows posts, get
router.get("/", (req, res)=>{
    res.render('landing')
});

module.exports = router;