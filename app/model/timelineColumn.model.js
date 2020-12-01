var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");

var timelineColumn = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    title : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("timelineColumn",timelineColumn);