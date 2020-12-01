var mongoose = require("mongoose");
var User = require("./user.model");

var OTP = mongoose.Schema({
    otp : {type : String , require : true },
    userId : {type : mongoose.Schema.Types.ObjectId, refer : User}
},{
    timestamps: true
});

module.exports = mongoose.model("OTP",OTP); 