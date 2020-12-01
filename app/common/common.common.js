const { reject } = require("async");
var config = require("../../config.config");
var msg91 = require("msg91")(
  config.sms.apiKey,
  config.sms.senderId,
  config.sms.smsType
);

function genrateOtp(){
  var otp = Math.floor(1000 + Math.random()*900000)
  return otp
}
exports.genrateOtp = genrateOtp;

sendingsmsOtp = (message, mobileNo) => {
  return new Promise((resolve, reject) => {
    msg91.send(mobileNo, message, function (error, response) {
      console.log("response", response);
      console.log("error", error);
      if (error) {
        reject("unable to send OTP");
      } else {
        resolve("OTP send on registed mobile ");
      }
    });
  });
};
exports.sendingsmsOtp = sendingsmsOtp;
