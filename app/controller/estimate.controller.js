var estimate = require("../model/estimate.model");
var jobcategoery = require("../model/jobsCategoery.mode");
var estimateJobs = require("../model/estimateJobs.model");
var mongoose = require("mongoose")

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;

    if (user_id && project_id) {
        estimate.find({ user_id: user_id, project_id: project_id }).populate([ {
            path: "jobcategoery_details.jobcategoery_id",
            model: jobcategoery
        }])
            .then((result) => {
                if (result.length) {
                    estimateJobs.find({user_id: user_id, estimate_id : result[0]._id.toString()})
                    .then((estimatejob)=>{
                        var result1 = JSON.parse(JSON.stringify(result[0]));
                        var estimatejob1 = JSON.parse(JSON.stringify(estimatejob));
                        for (let i = 0; i < result1.jobcategoery_details.length; i++) {
                                for (let j = 0; j < estimatejob1.length; j++) {
                                    if(result1.jobcategoery_details[i].jobcategoery_id && result1.jobcategoery_details[i].jobcategoery_id._id.toString() == estimatejob1[j].categoery_id.toString()){
                                        result1.jobcategoery_details[i].amount = result1.jobcategoery_details[i].amount + (estimatejob1[j].rate * estimatejob1[j].measurement)
                                    }
                                }    
                        }
                        res.send({ message: "Data found", status: true, data: result1 });
                    })
                    .catch((err)=>{
                        res.send({ message: "Data found", status: true, data: result[0] });
                    })

                } else {
                    new estimate({
                        user_id: user_id,
                        project_id: project_id,
                    }).save()
                        .then((insertd_result) => {
                            res.send({ message: "Data found", status: true, data: insertd_result });
                        })
                        .catch((err) => {
                            res.send({ message: "Data not found", status: true, data: result, err });
                        })
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
    var estimate_id = req.body.id;
    if (estimate_id) {
        var dynamicQuery = {};

        if (req.body.rooms) {
            dynamicQuery.rooms = req.body.rooms;
        }
        if (req.body.jobcategoery_details) {
            dynamicQuery.jobcategoery_details = req.body.jobcategoery_details;
        }
        if (req.body.price) {
            dynamicQuery.price = req.body.price;
        }
        if (req.body.unit) {
            dynamicQuery.unit = req.body.unit;
        }
        if (req.body.comission) {
            dynamicQuery.comission = req.body.comission;
        }
        if (req.body.measurement) {
            dynamicQuery.measurement = req.body.measurement;
        }
        if (req.body.includeGST_price) {
            dynamicQuery.includeGST_price = (req.body.includeGST_price == "true");
        }
        estimate.findByIdAndUpdate(estimate_id, { $set: dynamicQuery })
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
    var estimate_id = req.query.id;
    if (estimate_id) {
        estimate.findByIdAndDelete(estimate_id)
            .then((result) => {
                res.send({ message: "estimate deleted successfully", status: true });
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
        estimate.findById(id)
            .then((result) => {
                if (result !== "{}") {
                    res.send({ message: "Data found", status: true, data: result });
                } else {
                    res.send({ message: "Data not found", status: true, data: result });
                }
            })
            .catch((error) => {
                res.send({ message: "Unable fetch data", status: false });
            })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.assignJobsCategoery = (req, res, next) => {
    console.log(" req.body ",req.body);
    var estimate_id = req.body.id
    var jobcategoery_id = req.body.jobcategoery_id
    if (jobcategoery_id && estimate_id) {
        console.log(jobcategoery_id," ============== ",estimate_id);
        estimate.findByIdAndUpdate(estimate_id, { $addToSet: { jobcategoery_details: { jobcategoery_id: jobcategoery_id } } })
            .then((result) => {
                console.log(" result ", result);
                res.send({ message: "Job categoery assign  successfully", status: true })
            })
            .catch((error) => {
                console.log(" ================= ",error);
                res.send({ message: "Unable to assign jobs", status: false });
            })
    }
    else {
        res.status(400).send({ message: "Invalid Data", status: false })
    }
}

exports.removeJobsCategoery = (req, res, next) => {
    var jobcategoery_id = req.query.jobcategoery_id;
    var estimate_id = req.query.id;
    if (jobcategoery_id && estimate_id) {
        estimate.findByIdAndUpdate(estimate_id, { $pull: { jobcategoery_details: { jobcategoery_id: jobcategoery_id} } })
            .then((result) => {
                console.log("result", result)
                res.send({ message: "Job categoery remove successfully", status: true })
            })
            .catch((error) => {
                console.log(" remove error ",error);
                res.send({ message: "Unable to remove jobs", status: false });
            })
    }
    else {
        res.status(400).send({ message: "Invalid Data", status: false })
    }
}

