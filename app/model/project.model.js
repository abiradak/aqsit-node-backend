var mongoose = require("mongoose");
var User = require("./user.model");
var client = require("./client.model");
var projectStatus = require("./projectStatus.model");

var project = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_name : {type : String},
    project_image : {type : String},
    client_id : {type : mongoose.Schema.Types.ObjectId , refer : client, default: null},
    projectStatus_id : {type : mongoose.Schema.Types.ObjectId , refer : projectStatus, default: null}
},{
    timestamps : true
});

module.exports = mongoose.model("project",project);