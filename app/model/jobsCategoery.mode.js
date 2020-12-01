var mongoose = require("mongoose");
var User = require("./user.model");

var jobsCategoery = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User , nullable : true},
    categoery : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("jobsCategoery",jobsCategoery);