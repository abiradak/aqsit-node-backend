var mongoose = require("mongoose");
var User = require("./user.model");

var productCategoery = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User},
    categoery : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("productCategoery",productCategoery);