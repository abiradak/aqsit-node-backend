var expence = require("../model/expence.model");
var spendCategories = require("../model/spendCategories.model");
var project = require("../model/project.model");
var mongoose = require("mongoose");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var project_id = req.body.project_id;
    var amount = req.body.amount;
    var expence_name = req.body.expence_name;
    var expence_date = req.body.expence_date;
    var hash_tag = req.body.hash_tag;
    var categoery_id = req.body.categoery_id;
    if (user_id && amount && project_id && expence_name && expence_date && categoery_id) {
        new expence({
            user_id : user_id,
            project_id : project_id,
            amount : amount,
            expence_name : expence_name,
            expence_date : expence_date,
            categoery_id : categoery_id,
            hash_tag : hash_tag
        }).save()
            .then((result) => {
                res.send({ message: "expence created successfuly", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to create column", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    if (user_id && project_id) {
        expence.find({ user_id: user_id, project_id : project_id }).sort({_id:-1}).populate([{path : 'categoery_id',model : spendCategories,select : ['categoery']}])
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

exports.fetchfordashboard = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    if (user_id && project_id) {
        expence.find({ user_id: user_id, project_id : project_id }).populate([{path : 'project_id',model : project,select : ['project_name']},{path : 'categoery_id',model : spendCategories,select : ['categoery']}]).sort({_id:-1})
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
    var column_id = req.body.id;
    if (column_id) {
        var dynamicQuery = {};
        if (req.body.amount) {
            dynamicQuery.amount = req.body.amount;
        }
        if (req.body.expence_name) {
            dynamicQuery.expence_name = req.body.expence_name;
        }
        if (req.body.expence_date) {
            dynamicQuery.expence_date = req.body.expence_date;
        }
        if (req.body.expence_date) {
            dynamicQuery.expence_date = req.body.expence_date;
        }
        if (req.body.categoery_id) {
            dynamicQuery.categoery_id = req.body.categoery_id;
        }
        if (req.body.hash_tag) {
            dynamicQuery.hash_tag = req.body.hash_tag;
        }
        expence.findByIdAndUpdate(column_id, { $set: dynamicQuery })
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
    var expence_id = req.query.id;
    if (expence_id) {
        expence.findByIdAndDelete(expence_id)
            .then((result) => {
                    res.send({ message: "expence deleted successfully", status: true });
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
        expence.findById(id)
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
