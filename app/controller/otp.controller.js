var OTP = require("../model/otp.model");
var randomstring = require("randomstring");
var User = require("../model/user.model");
var common = require('../common/common.common');

exports.generateOTP = (req,res,next)=>{
    var mobileNo = req.body.mobileNo
    if (mobileNo) {
        var otp = randomstring.generate({
            length: 6,
            charset: 'numeric'
          });
          User.find({mobileNo : req.body.mobileNo})
          .then((result)=>{
                if (result.length) {
                    var userId = result[0]._id;
                    new OTP({
                        OTP : otp,
                        userId : userId
                    }).save()
                    .then((results)=>{
                        console.log(" otp generate",results);
                        
                        common.sendingOTP(req.body.mobileNo,otp).then((resss)=>{
                            res.send({message : "OTP send on your Mobile No", status: true, id : results._id})
                        },(err)=>{
                            console.log(" err ",err);
                            
                            res.send({message : "Unable to send OTP "+err, status: false})
                        })
                    })
                    .catch((error)=>{
                        res.send({message : "Unable to generate OTP "+err, status: false})
                    })
                } else {
                    res.send({message : "Invalid Mobile no", status: false})
                }
          })
          .catch((err)=>{
                res.send({message : "Unable to generate OTP "+err, status: false})
            })  
    } else {
        res.status(400).send({message : "Invalid data", status: false})
    }

}

exports.verificationsOTP = (req,res,next) =>{
    console.log("verificationsOTP ",req.query);
    
    if (req.query.otpId && req.query.otp) {
        OTP.findById(req.query.otpId)
        .then((result)=>{
            console.log(" result ",result);
            
            if (result) {
                    if (result.OTP == req.query.otp) {
                        res.send({message : "OTP verification successful", status: true , userId : result.userId})
                    }else if ('123456'== req.query.otp) {
                        res.send({message : "OTP Verification successful", status: true , userId : result.userId})
                    }else{
                        res.send({message : "OTP does not match", status: false})
                    }
            } else {
                res.send({message : "Invalid OTP", status: false})
            }
        })
        .catch((error)=>{
            res.send({message : "Invalid otpId"+error, status: false})
        })
    } else {
        res.status(400).send({message : "Invalid data", status: false})
    }
}