var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");

var projectStatus = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    title : {type : String, default : null},
    assign : {type : Boolean, default : false},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project}
},{
    timestamps : true
});

module.exports = mongoose.model("projectStatus",projectStatus);