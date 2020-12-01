module.exports = (app) =>{
    var OTP = require("../controller/otp.controller");

    app.post("/OTP",OTP.generateOTP);

    app.get("/OTP",OTP.verificationsOTP);

}