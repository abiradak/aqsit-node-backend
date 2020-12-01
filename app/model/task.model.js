var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");
var timelineColumn = require("./timelineColumn.model");

var task = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    timelineColumn_id : {type : mongoose.Schema.Types.ObjectId , refer : timelineColumn},
    task_name : {type : String, default : null},
    description : {type : String, default : null},
    taskCompletedate : {type : Date, default : null},
    status : {type : Boolean, default : false},
    comments : {type : Number, default : 0},
    attachments : [{
        attachments_name : {type : String}
    }]
    
},{
    timestamps : true
});

module.exports = mongoose.model("task",task);