var mongoose = require("mongoose");
var User = require("./user.model");
var productCategoery = require("./productCategoery.model");
var client = require("./client.model");

var product = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    productCategoery_id : {type : mongoose.Schema.Types.ObjectId , refer : productCategoery},
    client_id : {type : mongoose.Schema.Types.ObjectId , refer : client, default : null},
    product_name : {type : String, default : null},
    description : {type : String, default : null},
    price : {type : Number, default : null},
    images : [{
        images_name : {type : String}
    }]
    
},{
    timestamps : true
});

module.exports = mongoose.model("product",product);