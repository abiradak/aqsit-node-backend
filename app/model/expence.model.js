var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");
var spendCategories = require("./spendCategories.model");


var expence = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    amount : {type : Number, default : 0},
    expence_name : {type : String, default : null},
    expence_date : {type : Date, default : null},
    hash_tag : {type : String, default : null},
    categoery_id : {type : mongoose.Schema.Types.ObjectId , refer : spendCategories},
    
},{
    timestamps : true
});

module.exports = mongoose.model("expence",expence);
