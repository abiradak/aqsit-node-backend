module.exports = (app) => {
  var user = require("../controller/user.controller");

  app.post("/api/user/registration", user.create);

  app.get("/User", user.fetch);

  app.put("/User", user.update);

  app.post("/api/user/login", user.login);

  app.delete("/User", user.delete);

  app.post("/user/resendOTP", user.resendOTP);

  app.post("/user/verificationsOTP", user.verificationsOTP);

  app.post("/user/OTPForForgetPass", user.otpForForgetPass);

  app.post("/user/verifyOtpForgetPass", user.verifyOtpForgetPass);
};
