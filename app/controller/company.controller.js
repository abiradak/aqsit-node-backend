var mongoose = require("mongoose");
var Company = require("../model/company.model");

// exports.create = function (req, res) {
//   var companyName = req.body.companyName;
//   var gstNumber = req.body.gstNumber;
//   var email = req.body.email;
//   var phoneNumber = req.body.phoneNumber;
//   var address = req.body.address;
//   var user_id = req.body.user_id;

//   if (companyName && gstNumber && email && phoneNumber && address && user_id) {
//     var company = new Company({
//       user_id: user_id,
//       companyName: companyName,
//       gstNumber: gstNumber,
//       email: email,
//       phoneNumber: phoneNumber,
//       address: address,
//     });
//     company
//       .save()
//       .then((result) => {
//         res.send({ message: "company added", status: true });
//       })
//       .catch((error) => {
//         res.send({ message: "unable to add company", status: false, error });
//       });
//   } else {
//     res.status(400).send({ message: "Invalid data", status: false });
//   }
// };

exports.fetch = function (req, res) {
  console.log(" req.query.user_id ");
  if (req.query.user_id) {
    Company.find({ user_id: req.query.user_id })
      .then((result) => {
        if (result.length) {

          res.send({ message: "Data found", status: true, data: result[0] });
        } else {
          new Company({
            user_id: req.query.user_id
          }).save()
            .then((result1) => {
              res.send({ message: "company added", status: true, data: result1 });
            })
            .catch((error) => {
              res.send({ message: "unable to add company", status: false, error });
            });
        }
      })
      .catch((error) => {
        res.send({ message: "unable to fetch the data", status: false, data: {} });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false, data: {} });
  }
};

exports.fetchById = function (req, res) {
  if (req.query.id) {
    Company.findById(req.query.id)
      .then((result) => {
        res.send({ message: "data fetched", status: true, result });
      })
      .catch((error) => {
        res.send({ message: "unable to fetch the data" });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.update = function (req, res) {
  var id = req.body.id;
  if (id) {
    var dynamicQuery = {};
    if (req.body.companyName) dynamicQuery.companyName = req.body.companyName;
    if (req.body.gstNumber) dynamicQuery.gstNumber = req.body.gstNumber;
    if (req.body.email) dynamicQuery.email = req.body.email;
    if (req.body.phoneNumber) dynamicQuery.phoneNumber = req.body.phoneNumber;
    if (req.body.address) dynamicQuery.address = req.body.address;
    if (req.files && req.files.icon) {
      var icon = req.files.icon;
      var filesName = new Date().toISOString() + icon.name;
      dynamicQuery.icon = filesName
      eachfile.mv("./app/attachments/companyicon/" + filesName, (error) => {

        Company.findByIdAndUpdate(id, { $set: dynamicQuery })
          .then((result) => {
            res.send({ message: "Data update", status: true });
          })
          .catch((error) => {
            res.send({ message: "unable to delete company", status: false, error });
          });
      });
    } else {
      Company.findByIdAndUpdate(id, { $set: dynamicQuery })
        .then((result) => {
          res.send({ message: "Data update", status: true });
        })
        .catch((error) => {
          res.send({ message: "unable to delete company", status: false, error });
        });
    }
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.delete = function (req, res) {
  if (req.body.id) {
    Company.findByIdAndDelete(req.body.id)
      .then((result) => {
        res.send({ message: "Data deleted", status: true });
      })
      .catch((error) => {
        res.send({ message: "unable to delete company", status: false, error });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};
