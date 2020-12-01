var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");
var jobcategoery = require("./jobsCategoery.mode");
var estimateJobs = require("./estimateJobs.model");
// var client = require("./client.model");

var estimate = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    rooms : [{
        number_of_rooms : { type : Number},
        rooms_name: {type : String }
    }],
    jobcategoery_details : [{
        jobcategoery_id : {
            type : mongoose.Schema.Types.ObjectId , refer : jobcategoery
        },
        amount : {type : Number, default : 0}
    }],
    price : {type : Number, default : 0},
    unit : {type : String, default : null},
    comission : {type : Number, default : 0},
    measurement : {type : Number, default : 0},
    includeGST_price : {type : Boolean, default : false}
},{
    timestamps : true
});

module.exports = mongoose.model("estimate",estimate);
