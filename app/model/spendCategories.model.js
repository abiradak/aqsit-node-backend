var mongoose = require("mongoose");
var User = require("./user.model");
var project = require("./project.model");

var spendCategories = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId , refer : User , nullable : true},
    project_id : {type : mongoose.Schema.Types.ObjectId , refer : project , nullable : true},
    categoery : {type : String, default : null}
},{
    timestamps : true
});

module.exports = mongoose.model("spendCategories",spendCategories);