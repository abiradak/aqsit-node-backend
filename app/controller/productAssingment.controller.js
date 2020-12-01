var product = require("../model/product.model");
var project = require("../model/project.model");
var productAssingment = require("../model/productAssingment.model");
var config = require("../../config.config");

exports.create = (req, res, next) => {
  var user_id = req.body.user_id;
  var product_id = req.body.product_id;
  var project_id = req.body.project_id;
  if (user_id && project_id && product_id) {
    productAssingment
      .update(
        {
          user_id: user_id,
          product_id: product_id,
          project_id: project_id,
        },
        {
          $set: {
            user_id: user_id,
            product_id: product_id,
            project_id: project_id,
          },
        },
        { upsert: true }
      )
      .then((result) => {
        res.send({ message: "product ussign successfuly", status: true });
      })
      .catch((error) => {
        res.send({ message: "Unable to create product", status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.fetch = (req, res, next) => {
  var dynamicQuery = {};
  var user_id = req.query.user_id;
  if (user_id) {
    dynamicQuery.user_id = user_id;
    if (req.query.project_id) {
      dynamicQuery.project_id = req.query.project_id;
    }

    productAssingment
      .find(dynamicQuery)
      .populate([
        {
          path: "product_id",
          model: product,
        },
        {
          path: "project_id",
          model: project,
        },
      ])
      .then((result1) => {
        if (result1.length) {
          var result = JSON.parse(JSON.stringify(result1));
          for (let index = 0; index < result.length; index++) {
            for (
              let index1 = 0;
              index1 < result[index].product_id.images.length;
              index1++
            ) {
              if (result[index].product_id.images[index1]) {
                result[index].product_id.images[index1].images_name =
                  config.url +
                  ":" +
                  config.port +
                  "/attachments/product/" +
                  result[index].product_id.images[index1].images_name;
              }
            }
          }
          res.send({ message: "Data found", status: true, data: result });
        } else {
          res.send({ message: "Data not found", status: false, data: result });
        }
      })
      .catch((error) => {
        console.log(" error ",error);
        res.send({ message: "Unable fetch data", status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};

exports.delete = (req, res, next) => {
  var product_id = req.query.id;
  if (product_id) {
    productAssingment
      .findByIdAndDelete(product_id)
      .then((result) => {
        res.send({
          message: "Assign product remove successfully",
          status: true,
        });
      })
      .catch((error) => {
        res.send({ message: "Unable to delete message", status: false });
      });
  } else {
    res.status(400).send({ message: "Invalid data", status: false });
  }
};
