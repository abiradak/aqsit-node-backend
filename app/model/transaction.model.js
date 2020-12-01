var mongoose = require("mongoose");
var User = require("./user.model");
var Chat = require("./chat.model")

var Transaction = mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, refer : User},
    messageId : {type : mongoose.Schema.Types.ObjectId, refer : Chat},
    amount : {type : String, require : true},
    transactionId : {type : String},
    transactionStatus : {type : String, default : 'process'},
    BANKTXNID : {type : String}
},{
    timestamps : true
});

module.exports = mongoose.model("Transaction",Transaction);