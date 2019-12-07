var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var commentSchema = new mongoose.Schema({
    text: String, 
    author: {
       id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        name: String,
        picture: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);