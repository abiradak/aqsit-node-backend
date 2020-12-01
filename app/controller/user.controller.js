var User = require("../model/user.model");
var OTP = require("../model/otp.model");
var OTPController = require("./otp.controller");
var config = require("../../config.config");
var common = require("./../common/common.common");

exports.create = (req, res, next) => {
  if (req.body.name && req.body.email && req.body.mobileNo && req.body.password) {
    var user = new User({
      name: req.body.name,
      email: req.body.email.replace(/ /g, ""),
      mobileNo: req.body.mobileNo.replace(/ /g, ""),
      password: req.body.password,
    });
    user
      .save()
      .then((result) => {
        var message = "Registration successfully done";
        var otp = common.genrateOtp();
        var otpMessage =
          otp +
          " is your Aqsit One Time Password(OTP).For security reasons , do not share this OTP with anyone.";
        new OTP({
          otp: otp,
          userId: result._id
        }).save().then((otpresult) => {
          common
            .sendingsmsOtp(otpMessage, req.body.mobileNo.replace(/ /g, ""))
            .then(() => {
              res.send({
                message: "Registration successfully done, and OTP sent at registered mobile number",
                status: true,
                _id: otpresult._id,
              });
            })
            .catch((error) => {
              res.send({
                message: "Registration successfully done ,OTP has send on registred mobile number" + error,
                status: false,
                error: error
              });
            });
        })
      })
      .catch((error) => {
        console.log(" error ", error);
        if (error.code) {
          res.send({ message: "User already exist", status: false });
        } else {
          res.send({
            message: "Unable to registrations" + error.errmsg,
            status: false,
          });
        }
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.resendOTP = (req, res, next) => {
  if (req.body.id) {
    OTP.findById(req.body.id).populate([{ path: "userId", model: User }])
      .then((resultdata) => {
        console.log(" resultdata ",resultdata);
        if (resultdata) {
          var otp = common.genrateOtp()
          var otpMessage = otp + " is your Aqsit One Time Password(OTP).For security reasons , do not share this OTP with anyone."
          new OTP({
            otp: otp,
            userId: resultdata.userId._id
          }).save().then((otpresult) => {            
            common
            .sendingsmsOtp(otpMessage, resultdata.userId.mobileNo)
            .then((otpresultp) => {
              res.send({
                message: "OTP send successfully",
                status: true,
                _id: otpresult._id,
              });
            })
            .catch((error) => {
              res.send({
                message: "unable to send OTP" + error,
                _id: otpresult._id,
                status: true,
                error: error
              });
            });
          })
           
        } else {
          res.send({ message: "Invalid OTP ID", status: false });
        }
      })
      .catch((error) => {
        res.send({ message: "Invalid OTP ID", status: false, error });
      });
  } else {
    res.send({message: "Invalid data ",status: false });
  }
};

exports.verificationsOTP = (req, res, next) => {
  console.log(" req. body ",req.body);
  if (req.body.otpId && req.body.otp) {
    OTP.findById(req.body.otpId)
      .then((result) => {
        if (result) {
          console.log(" ======== ",result);
          if (result.otp == req.body.otp) {
            User.findByIdAndUpdate(result.userId, { $set: { authenticate: true } })
              .then((result1) => {
                console.log(" result1 ",result1);
                res.send({ message: "OTP verification successful", status: true, userId: result.userId, role: result1.role })
              })
              .catch((error) => {
                res.send({
                  message: "Unable to update OTP" + error.errmsg,
                  status: false,
                });
              });
          } else {
            res.send({ message: "OTP does not match", status: false });
          }
        } else {
          res.send({ message: "Invalid OTP", status: false });
        }
      })
      .catch((error) => {
        res.send({ message: "Invalid otpId" + error, status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.otpForForgetPass = (req, res, next) => {
  if (req.query.userId) {
    var otp = common.genrateOtp();
    // OTP.findOneAndUpdate({ userId: req.query.userId }, { $set: { otp: otp } })

    // .populate([{ path: userId, model: User }])
    // .populate("userId").
    OTP.findById(req.body.userId)
      .populate([{ path: userId, model: User }])
      .then((result) => {
        console.log("result", result);
        // var otpMessage =
        //   otp +
        //   " is your Aqsit One Time Password(OTP).For security reasons , do not share this OTP with anyone.";
        // common
        //   .sendingsmsOtp(otpMessage, req.query.mobileNo)
        //   .then(() => {
        //     res.send({
        //       message: "OTP send successfully",
        //       status: true,
        //       _id: otpresult._id,
        //     });
        //   })
        //   .catch((error) => {
        //     res.send({
        //       message: "unable to send OTP" + error,
        //       status: false,
        //       error: error,
        //     });
      })
      .catch((error) => {
        res.send({
          message: "OTP not found on this userId",
          status: false,
          error: error,
        });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.verifyOtpForgetPass = (req, res, next) => {
  var password = req.body.password;
  if (req.query.otpId && req.body.otp && req.body.password) {
    OTP.findOne({ _id: req.query.otpId })
      .then((result) => {
        console.log("result", result);
        if (result.otp == req.body.otp) {
          User.findOneAndUpdate(
            { _id: req.query.userId },
            { $set: { password: password } }
          )
            .then((resPass) => {
              res.send({
                message: "Password updated you can login now with new password",
                status: true,
              });
            })
            .catch((error) => {
              res.send({
                message: "User Not found",
                status: false,
                error: error,
              });
            });
        } else {
          res.send({
            message: "Please enter correct OTP",
            status: false,
          });
        }
      })
      .catch((error) => {
        res.send({
          message: "OTP not found on this userId",
          status: false,
          error: error,
        });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.update = (req, res, next) => {
  if (req.body.userId) {
    var dynaicQuery = {};
    if (req.body.authenticate) {
      dynaicQuery.authenticate = req.body.authenticate === "true";
    }
    if (req.body.name) {
      dynaicQuery.name = req.body.name;
    }
    if (req.body.password) {
      dynaicQuery.password = req.body.password;
    }
    if (req.body.email) {
      dynaicQuery.email = req.body.email;
    }

    User.findByIdAndUpdate(req.body.userId, { $set: dynaicQuery })
      .then((result) => {
        res.send({
          message: "Data update successfully",
          status: true,
          _id: result._id,
        });
      })
      .catch((error) => {
        res.send({
          message: "Unable to update " + error.errmsg,
          status: false,
        });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.fetch = (req, res, next) => {
  if (req.query.userId) {
    User.findById(req.query.userId)
      .then((result) => {
        if (!result) {
          res.send({ message: "Data not found", status: false, data: result });
        } else {
          res.send({ message: "Data found", status: true, data: result });
        }
      })
      .catch((error) => {
        res.send({ message: "Invalid data " + error, status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.delete = (req, res, next) => {
  if (req.query.userId) {
    User.findByIdAndRemove(req.query.userId)
      .then((result) => {
        res.send({ message: "Delete successfully", status: true });
      })
      .catch((error) => {
        res.send({ message: "Unable to delete " + error, status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.login = (req, res, next) => {
  if (req.body.username && req.body.password) {
    User.find({
      mobileNo: req.body.username.replace(/ /g, ""),
      password: req.body.password,
    })
      .then((result) => {
        console.log(" result ",result);
        if (result.length) {
          if (result[0].authenticate) {
            res.send({ message: "login successfull", status: true, _id: result[0]._id,role: result[0].role,authenticate: result[0].authenticate,});
          } else {
            var otp = common.genrateOtp();
            var otpMessage =
              otp +
              " is your Aqsit One Time Password(OTP).For security reasons , do not share this OTP with anyone.";
            new OTP({
              otp: otp,
              userId: result[0]._id
            }).save().then((otpresult) => {
              common
                .sendingsmsOtp(otpMessage, result[0].mobileNo)
                .then(() => {
                  res.send({message: "OTP send successfully",status: true,authenticate: result[0].authenticate,_id: otpresult._id});
                })
                .catch((error) => {
                  res.send({
                    message: "unable to send OTP" + error,
                    authenticate: result[0].authenticate,
                    status: true,
                    error: error
                  });
                });
            })
              .catch((error) => {
                res.send({
                  message: "Something went wrong, Unable to send OTP",
                  authenticate: result[0].authenticate,
                  status: true,
                  error: error
                });
              });
          }
        } else {
          res.send({ message: "Username or password invalid", status: false });
        }
      }) 
      .catch((err) => {
        res.send({ message: "Username or password invalid", status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

adminCredential = () => {
  User.update(
    { mobileNo: config.username },
    {
      $set: {
        mobileNo: config.username,
        password: config.password,
        role: "admin",
      },
    },
    { upsert: true },
    (error, result) => {
      if (error) {
        console.error(" Unable to  save admin credential");
      } else {
        console.log(" admin credential done ");
      }
    }
  );

  User.update(
    { mobileNo: "8698687989" },
    { $set: { mobileNo: "8698687989", password: "user", role: "user" } },
    { upsert: true },
    (error, result) => {
      if (error) {
        console.error(" Unable to  save admin credential");
      } else {
        console.log(" admin credential done ", result);
      }
    }
  );
};
// adminCredential()
