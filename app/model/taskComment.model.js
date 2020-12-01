var mongoose = require("mongoose");
var User = require("./user.model");
var task = require("./task.model");

var taskComment = mongoose.Schema({
    task_id : {type : mongoose.Schema.Types.ObjectId , refer : task},
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    comment : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("taskComment",taskComment);