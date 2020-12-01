var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");
var product = require("./product.model");

var productAssingment = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    product_id : {type : mongoose.Schema.Types.ObjectId , refer : product},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project}
},{
    timestamps : true
});

module.exports = mongoose.model("productAssingment",productAssingment);