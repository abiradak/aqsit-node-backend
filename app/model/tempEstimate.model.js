var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");
var jobcategoery = require("./jobsCategoery.mode");
var estimateJobs = require("./estimateJobs.model");
var rooms = require("./rooms.model");
// var client = require("./client.model");


// client_id : {type : mongoose.Schema.Types.ObjectId , refer : client},

var tempEstimate = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project},
    rooms : [{
        number_of_rooms : { type : Number},
        rooms_id: {type : mongoose.Schema.Types.ObjectId , refer : rooms}
    }],
    job_details : [{
        jobcategoery_details : {
            type : mongoose.Schema.Types.ObjectId , refer : jobcategoery
        },
        jobs_details : [{
              jobs_details : {type : mongoose.Schema.Types.ObjectId , refer : estimateJobs}
        }]
    }],
    price : {type : Number, default : 0},
    unit : {type : String, default : null},
    comission : {type : Number, default : 0},
    includeGST_price : {type : Number, default : 0}
},{
    timestamps : true
});

module.exports = mongoose.model("tempEstimate",tempEstimate);
