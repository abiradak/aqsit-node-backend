var mongoose = require("mongoose");
var User = require("./user.model");
var jobsCategoery = require("./jobsCategoery.mode");


var jobs = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    categoery_id : {type : mongoose.Schema.Types.ObjectId , refer : jobsCategoery},
    title : {type : String, default : null},
    description : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("jobs",jobs);
