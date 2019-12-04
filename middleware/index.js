var middlewareObj = {};
var User = require("../models/user");

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}