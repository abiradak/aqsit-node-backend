const mongoose = require("mongoose");
Schema = mongoose.Schema;
var User = require("./user.model");

var Company = new Schema(
  {
    user_id : { type: mongoose.Schema.Types.ObjectId, refer: User },
    companyName : { type : String, default : null},
    gstNumber : { type: String, default : null},
    email : { type: String, default : null},
    phoneNumber : { type: String, default : null},
    address : { type: String, default : null}, 
    icon : { type: String, default : null},
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Company", Company);

// {"user_id":"5f3f20dfa6abf9073436e8e5","companyName":"hgjh","gstNumber":"s","email":"fs","phoneNumber":"fs","address":"sdf"}