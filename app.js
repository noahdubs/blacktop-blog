var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    LocalStrategy = require("passport-local"),
    passport = require("passport"),
    User = require("./models/user"),
    methodOverride = require("method-override");
    favicon = require("favicon");
    flash = require("connect-flash");
    seeds = require("./seeds");

// requiring routes
var postRoute = require("./routes/post"),
    userRoute = require("./routes/user"),
    indexRoute = require("./routes/index"),
    commentRoute = require("./routes/comments");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true, useUnifiedTopology: true});
// seeds();
//passport config
app.use(require("express-session")({
    secret: "wow look at this secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoute);
app.use("/", userRoute);
app.use("/:username/post", postRoute);
app.use("/:username/post/:id/comments", commentRoute);


app.listen(3000, (req, res)=>{
    console.log("starting on port 3000");
});