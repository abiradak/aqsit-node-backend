var estimateJobs = require("../model/estimateJobs.model");
var estimate = require("../model/estimate.model");
var jobs = require("../model/jobs.model");
var config = require("./../..//config.config");
var async = require("async");


exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var estimate_id = req.body.estimate_id;
    var categoery_id = req.body.categoery_id;
    var job_title = req.body.job_title;
    var job_description = req.body.job_description;
    var room_id = req.body.room_id;
    var rate = req.body.rate;
    var measurement = req.body.measurement;
    var unit = req.body.unit;
    var comission = req.body.comission;
    var comission_unit = req.body.comission_unit;

    if (user_id && estimate_id && categoery_id && job_title && job_description && room_id && rate && measurement && unit) {
        new estimateJobs({
            user_id: user_id,
            categoery_id: categoery_id,
            estimate_id : estimate_id,
            job_title: job_title,
            job_description: job_description,
            room_id: room_id,
            rate: rate,
            measurement: measurement,
            unit: unit,
            comission: comission,
            comission_unit : comission_unit
        }).save()
            .then((result) => {
                res.send({ message: "Estimate job created successfuly", status: true });
            })
            .catch((error) => {
                console.log(" error ",error);
                res.send({ message: "Unable to create Estimate job", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    var categoery_id = req.query.categoery_id;
    var estimate_id = req.query.estimate_id;

    var dynamicQuery = {};
    if (user_id && categoery_id && estimate_id) {
        dynamicQuery.user_id = user_id;
        dynamicQuery.estimate_id = estimate_id;
        dynamicQuery.categoery_id = categoery_id;
    
        estimateJobs.find(dynamicQuery)
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
    var estimatejob_id = req.body.id;
    if (estimatejob_id) {
        var dynamicQuery = {};
        if (req.body.categoery) {
            dynamicQuery.categoery = req.body.categoery;
        }
        if (req.body.rate) {
            dynamicQuery.rate = req.body.rate;
        }
        if (req.body.measurement) {
            dynamicQuery.measurement = req.body.measurement;
        }
        if (req.body.unit) {
            dynamicQuery.unit = req.body.unit;
        }
        if (req.body.comission) {
            dynamicQuery.comission = req.body.comission;
        }
        if (req.body.job_title) {
            dynamicQuery.job_title = req.body.job_title;
        }
        if (req.body.job_description) {
            dynamicQuery.job_description = req.body.job_description;
        }
        if (req.body.comission_unit) {
            dynamicQuery.comission_unit = req.body.comission_unit;
        }
        if (req.body.room_id) {
            dynamicQuery.room_id = req.body.room_id;
        }

        
        estimateJobs.findByIdAndUpdate(estimatejob_id, { $set: dynamicQuery })
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
    var estimatejob_id = req.query.id;
    if (estimatejob_id) {
        estimateJobs.findByIdAndDelete(estimatejob_id)
            .then((result) => {
                    res.send({ message: "Estimate job deleted successfully", status: true });
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
        estimateJobs.findById(id)
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
