var mongoose = require("mongoose");

var DesignStyle = mongoose.Schema({
    name : {type : String},
    image : {type : String}
}) 
module.exports = mongoose.model("DesignStyle",DesignStyle);
