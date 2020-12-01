var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");
var DesignStyle = require("./designStyle.model")

var clientBrief = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    expectation_of_project : {type : String, default : null},
    budget : {type : String, default : null},
    project_image : {type : mongoose.Schema.Types.ObjectId , refer : DesignStyle},
    timeline : {type : String, default : null},
    question_Answer :[{
        question : {type : String, default : null},
        answer : {type : String, default : null}
    }]
},{
    timestamps : true
});

module.exports = mongoose.model("clientBrief",clientBrief);
