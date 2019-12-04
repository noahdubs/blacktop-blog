var middlewareObj = {};
var User = require("../models/user");

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

// middlewareObj.checkUser = (req, res, next)=>{
//     User.find({username:req.pararms.username}, (err, foundUser)=>{
//         if(err){
//             console.log("error");
//             console.log(err);
//         } else {
//             console.log(foundUser);
//         }
//     });
//     if(req.isAuthenticated()){
        
//         User.findById(req.params.id, (err, foundUser)=>{
//             if(err) {
//                 res.redirect("back");
//             } else {
//                 if(foundUser.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     res.redirect("back");
//                 } 
//             }
//         }); 
//     } else {
//         res.redirect("back");
//     }
// }

module.exports = middlewareObj;