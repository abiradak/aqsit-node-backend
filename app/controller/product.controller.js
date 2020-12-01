var product = require("../model/product.model");
var productCategoery = require("../model/productCategoery.model");
var client = require("../model/client.model");
var fs = require('fs');
var config = require("./../../config.config");
var async = require("async");
var mongoose  = require("mongoose");


exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var productCategoery_id = req.body.productCategoery_id;
    var product_name = req.body.product_name;
    if (user_id && product_name && productCategoery_id) {
        if (req.files) {
            var attachments = req.files.attachments;
            var saved_attachments = [];
            if (attachments.length) {
                var count = 0;
                async.eachSeries(attachments, (eachfile, next) => {
                    var filesName = new Date().toISOString() + eachfile.name;
                    eachfile.mv("./app/attachments/product/" + filesName, (error) => {
                        if (error) {
                            count++;
                            next();
                            if (attachments.length == count) {
                                new product({
                                    user_id: user_id,
                                    productCategoery_id: productCategoery_id,
                                    product_name: product_name,
                                    images: saved_attachments
                                }).save()
                                    .then((result) => {
                                        res.send({ message: "product created successfuly", status: true });
                                    })
                                    .catch((error) => {
                                        res.send({ message: "Unable to create product", status: false });
                                    })
                            }
                        } else {
                            saved_attachments.push({ images_name: filesName });
                            count++;
                            next();
                            if (attachments.length == count) {
                                new product({
                                    user_id: user_id,
                                    productCategoery_id: productCategoery_id,
                                    product_name: product_name,
                                    images: saved_attachments
                                }).save()
                                    .then((result) => {
                                        res.send({ message: "product created successfuly", status: true });
                                    })
                                    .catch((error) => {
                                        res.send({ message: "Unable to create product", status: false });
                                    })
                            }
                        }
                    })
                })
            } else {
                var filesName = new Date().toISOString() + attachments.name;
                attachments.mv("./app/attachments/product/" + filesName, (error) => {
                    if (error) {
                        res.send({ message: "Unable to save attachments", status: false, error: eroro.error })
                    } else {
                        saved_attachments.push({ images_name: filesName });
                        console.log();
                        new product({
                            user_id: user_id,
                            productCategoery_id: productCategoery_id,
                            product_name: product_name,
                            images: saved_attachments
                        }).save()
                            .then((result) => {
                                res.send({ message: "product created successfuly", status: true });
                            })
                            .catch((error) => {
                                res.send({ message: "Unable to create product", status: false });
                            })
                    }
                })
            }
        } else {
            new product({
                user_id: user_id,
                productCategoery_id: productCategoery_id,
                product_name: product_name,
            }).save()
                .then((result) => {
                    res.send({ message: "product created successfuly", status: true });
                })
                .catch((error) => {
                    res.send({ message: "Unable to create product", status: false });
                })
        }
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var dynamicQuery = {};
    var user_id = req.query.user_id;
    dynamicQuery.user_id = user_id;
    if (user_id) {
        if (req.query.productCategoery_id) {
            dynamicQuery.productCategoery_id = req.query.productCategoery_id;
        }
        product.find(dynamicQuery).populate([{
            path: "productCategoery_id",
            model: productCategoery
        },{
            path: "client_id",
            model: client
        }]).sort({ status: 1 })
            .then((result1) => {
                if (result1.length) {
                    var result = JSON.parse(JSON.stringify(result1))
                    for (let index = 0; index < result.length; index++) {
                        for (let index1 = 0; index1 < result[index].images.length; index1++) {
                                if (result[index].images[index1]) {
                                    result[index].images[index1].images_name =  config.url + ":" + config.port + "/attachments/product/" + result[index].images[index1].images_name;
                                }
                        }
                    }
                    res.send({ message: "Data found", status: true, data: result });
                } else {
                    res.send({ message: "Data not found", status: false, data: result });
                }
            })
            .catch((error) => {
                res.send({ message: "Unable fetch data", status: false });
            })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.update = (req, res, next) => {
    var product_id = req.body.id;
    if (product_id) {
        var dynamicQuery = {};
        if (req.body.productCategoery_id) {
            dynamicQuery.productCategoery_id = req.body.productCategoery_id;
        }
        if (req.body.product_name) {
            dynamicQuery.product_name = req.body.product_name;
        }
        if (req.body.description) {
            dynamicQuery.description = req.body.description;
        }
        if (req.body.client_id) {
            dynamicQuery.client_id = req.body.client_id;
        }
        if (req.body.price) {
            dynamicQuery.price = req.body.price;
        }
        
        product.findByIdAndUpdate(product_id, { $set: dynamicQuery })
            .then((result) => {
                res.send({ message: "Data update successfully", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to update", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.delete = (req, res, next) => {
    var product_id = req.query.id;
    if (product_id) {
        product.findByIdAndDelete(product_id)
            .then((result) => {
                res.send({ message: "product deleted successfully", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to delete message", status: false });
            })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetchById = (req, res, next) => {
    var id = req.query.id;
    if (id) {
        console.log("  id ",id );
        product.findById(id).populate([{
            path: "productCategoery_id",
            model: productCategoery
        },{
            path: "client_id",
            model: client
        }]).then((result1) => {
                if (result1 !== "{}") {
                    var result = JSON.parse(JSON.stringify(result1))
                    for (let index = 0; index < result.images.length; index++) {
                        result.images[index].images_name = config.url + ":" + config.port + "/attachments/product/" + result.images[index].images_name
                    }
                    res.send({ message: "Data found", status: true, data: result });
                } else {
                    res.send({ message: "Data not found", status: false, data: result });
                }
            })
            .catch((error) => {
                console.log(" error ",error);
                res.send({ message: "Unable fetch data", status: false });
            })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.attach_attachments = (req, res, next) => {
    var product_id = req.body.id;
    if (product_id && req.files) {
        var attachments = req.files.attachments;
        if (attachments.length) {
            var saved_attachments = [];
            var count = 0;
            async.eachSeries(attachments, (eachfile, next) => {
                var filesName = new Date().toISOString() + eachfile.name;
                eachfile.mv("./app/attachments/product/" + filesName, (error) => {
                    if (error) {
                        count++;
                        next();
                        if (attachments.length == count) {
                            product.findByIdAndUpdate(product_id, { $addToSet: { images: saved_attachments} })
                                .then((result) => {
                                    console.log(" result ", result);
                                    res.send({ message: "Attachment addded successfully", status: true })
                                })
                                .catch((error) => {
                                    res.send({ message: "Unable add attachment", status: false });
                                })
                        }
                    } else {
                        saved_attachments.push({ images_name: filesName });
                        count++;
                        next();
                        if (attachments.length == count) {
                            product.findByIdAndUpdate(product_id, { $addToSet: { images: saved_attachments } })
                                .then((result) => {
                                    res.send({ message: "Attachment addded successfully", status: true })
                                })
                                .catch((error) => {
                                    res.send({ message: "Unable add attachment", status: false });
                                })
                        }
                    }
                })

            })
        } else {
            var filesName = new Date().toISOString() + attachments.name;
            attachments.mv("./app/attachments/product/" + filesName, (error) => {
                if (error) {
                    res.send({ message: "Unable to save attachments", status: false, error: eroro.error })
                } else {
                    product.findByIdAndUpdate(product_id, { $addToSet: { attachments: { images: filesName } } })
                        .then((result) => {
                            console.log(" result ", result);
                            res.send({ message: "Attachment addded successfully", status: true })
                        })
                        .catch((error) => {
                            res.send({ message: "Unable add attachment", status: false });
                        })
                }
            })
        }
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.delete_attachments = (req, res, next) => {
    var product_id = req.query.id;
    var attachment_id = req.query.attachment_id;
    if (product_id && attachment_id) {
        product.findByIdAndUpdate(product_id,{$pull:{images : {_id :mongoose.Types.ObjectId(attachment_id)}}})
        .then((result)=>{
            console.log(" result ",result);
            for (let index = 0; index < result.images.length; index++) {
                const element =  result.images[index];
                if (element._id.toString() == attachment_id) {
                        console.log(" done ",element);
                        fs.unlink("./app/attachments/product/"+element.images_name,(error)=>{
                            console.log(" error ",error);
                        })
                }
            }
            res.send({message:"Attachments remove successfully", status : true});

        })
        .catch((error)=>{ 
            console.log(" error ",error);
            res.send({ message: "Unable to remove attachments", status: false });
        })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }   
}