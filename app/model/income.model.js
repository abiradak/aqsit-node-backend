var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");


var income = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    amount : {type : Number, default : 0},
    income_name : {type : String, default : null},
    incomedate : {type : Date, default : null}    
},{
    timestamps : true
});

module.exports = mongoose.model("income",income);
