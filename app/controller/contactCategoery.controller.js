var contactCategoery = require("../model/contactCategoery.model");
var config = require("./../..//config.config");
var async = require("async");


exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var categoery = req.body.categoery;
    if (user_id && categoery) {
        new contactCategoery({
            user_id: user_id,
            categoery: categoery
        }).save()
            .then((result) => {
                res.send({ message: "Categoery created successfuly", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to create categoery", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    if (user_id) {
        contactCategoery.find({$or : [{ user_id: user_id },{user_id : null}]})
            .then((result) => {
                if (result.length) {
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
    var categoery_id = req.body.id;
    if (categoery_id) {
        var dynamicQuery = {};
        if (req.body.categoery) {
            dynamicQuery.categoery = req.body.categoery;
        }
        contactCategoery.findByIdAndUpdate(categoery_id, { $set: dynamicQuery })
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

exports.delete = (req, res, next)=>{
    var categoery_id = req.query.id;
    if (categoery_id) {
        contactCategoery.findByIdAndDelete(categoery_id)
            .then((result) => {
                    res.send({ message: "Categoery deleted successfully", status: true });
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
        contactCategoery.findById(id)
            .then((result) => {
                if (result !== "{}") {
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

function ContactCategoeryAssignments() {
    async.eachSeries(config.ContactCategoery,(eachdesign,next)=>{
        contactCategoery.update({categoery : eachdesign.categoery},{$set : {categoery : eachdesign.categoery}},{upsert : true},(error,result)=>{
                // if (error) {
                //     console.log(" not done");
                // } else {
                //     console.log(" done",result);
                // }
                next();
        })
    })
}
ContactCategoeryAssignments();