var mongoose = require("mongoose");

var User = mongoose.Schema({
        name : {type : String, default : null},
        email : {type : String , require : true},
        mobileNo : {type : String, require : true, unique : true},
        password : {type : String , require : true},
        authenticate : {type : Boolean , default : false},
        deviceId : {type : String , default : null},
        deviceType : {type : String , default : null},
        role : {type : String , default : "user"}
},{
    timestamps: true
});

module.exports = mongoose.model("User",User);