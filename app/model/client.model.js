var mongoose = require("mongoose");
var User = require("./user.model");
var contactCategoery = require("./contactCategoery.model");
var jobs = require("./jobs.model");

var client = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    client_name : {type : String, default : null},
    email : {type : String, default : null},
    address : {type : String, default : null},
    mobile_no : {type : String, default : null},
    categoery_id : {type : mongoose.Schema.Types.ObjectId , refer : contactCategoery, default : null},
    job : [{
        jobs_id : {type : mongoose.Schema.Types.ObjectId , refer : jobs, default : null},
        price : {type : Number, default : null}
    }]

},{
    timestamps : true
});

module.exports = mongoose.model("client",client);