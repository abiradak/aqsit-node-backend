var mongoose = require("mongoose");
var User = require("./user.model");
var jobsCategoery = require("./jobsCategoery.mode");
var estimate = require("./estimate.model");


var estimateJobs = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    estimate_id : {type : mongoose.Schema.Types.ObjectId , refer : estimate},
    categoery_id : {type : mongoose.Schema.Types.ObjectId , refer : jobsCategoery},
    job_title : {type : String},
    job_description : {type : String},
    room_id : {type : String},
    rate : {type : Number, default : 0},
    measurement : {type : Number, default : 0},
    unit : {type : String, default : 'Sqft'},
    comission : {type : Number, default : 0},
    comission_unit : {type : String, default : 'Sqft'}, 

},{
    timestamps : true
});

module.exports = mongoose.model("estimateJobs",estimateJobs);
