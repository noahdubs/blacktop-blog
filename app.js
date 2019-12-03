var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// requiring routes
var postRoute = require("./routes/post"),
    userRoute = require("./routes/user"),
    indexRoute = require("./routes/index");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

mongoose.connect("mongodb://localhost:27017/alive", {useNewUrlParser: true, useUnifiedTopology: true});


app.use("/", indexRoute);
app.use("/:id", userRoute);
app.use("/:post_id", postRoute);

app.listen(3000, (req, res)=>{
    console.log("starting on port 3000");
});