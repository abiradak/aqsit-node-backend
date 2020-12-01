var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");

var Proposal = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User , nullable : true},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project , nullable : true},
    logo : {type : Boolean, default : false},
    company_details : {type : Boolean, default : false},
    invoice_no : {type : String, default : null},
    date : {type : Date, default : null},
    gst_details : {type : Boolean, default : false},
    designorinspiration : {type : Boolean, default : false},
    product : {type : Boolean, default : false},
    comment : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("Proposal",Proposal);