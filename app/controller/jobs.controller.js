var jobs = require("../model/jobs.model");
var jobsCategoery = require("../model/jobsCategoery.mode");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var description = req.body.description;
    var categoery_id = req.body.categoery_id;
    var title = req.body.title;
    if (user_id && title && categoery_id) {
        new jobs({
            user_id : user_id,
            description : description,
            categoery_id : categoery_id,
            title : title
        }).save()
            .then((result) => {
                res.send({ message: "jobs created successfuly", status: true });
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
    var categoery_id = req.query.categoery_id;
    var dynamicQuery = { user_id: user_id};
    if (user_id) {
            if (categoery_id) {
                dynamicQuery.categoery_id = categoery_id;
            }
        jobs.find(dynamicQuery).sort({_id:-1}).populate([{path : "categoery_id", model :jobsCategoery, select :["categoery"]}])
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
    var jobs_id = req.body.id;
    if (jobs_id) {
        var dynamicQuery = {};
        if (req.body.description) {
            dynamicQuery.description = req.body.description;
        }
        if (req.body.title) {
            dynamicQuery.title = req.body.title;
        }
        if (req.body.categoery_id) {
            dynamicQuery.categoery_id = req.body.categoery_id;
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
        jobs.findByIdAndUpdate(jobs_id, { $set: dynamicQuery })
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
    var jobs_id = req.query.id;
    if (jobs_id) {
        jobs.findByIdAndDelete(jobs_id)
            .then((result) => {
                    res.send({ message: "jobs deleted successfully", status: true });
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
        jobs.findById(id).populate([{path : "categoery_id", model :jobsCategoery, select :["categoery"]}])
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

exports.fetchForEstimate = (req,res,next)=>{
    var user_id = req.query.user_id;
    if (user_id) {
        jobsCategoery.find({$or : [{ user_id: user_id },{user_id : null}]})
            .then((result) => {
                if (result.length) {
                    var result1 = JSON.parse(JSON.stringify(result))
                    for (let index = 0; index < result1.length; index++) {
                        result1[index].jobs = [];
                    }
                    console.log(" result1 ",result1);

                jobs.find({ user_id: user_id })
                    .then((result12) => {
                        var result16 = JSON.parse(JSON.stringify(result12))
                        for (let index = 0; index < result1.length; index++) {
                            for (let index1 = 0; index1 < result16.length; index1++) {
                                    if (result1[index]._id.toString() == result16[index1].categoery_id.toString()) {
                                        result1[index].jobs.push(result16[index1]);    
                                    }
                            }                       
                        }                       

                        if (result.length) {
                            res.send({ message: "Data found", status: true, data: result1 });
                        } else {
                            res.send({ message: "Data found", status: true, data: result1 });
                        }
                    })
                    .catch((error) => {
                        res.send({ message: "Unable fetch data", status: false, data: result1 });
                    })
                } else {
                    res.send({ message: "Data not found", status: false, data: result1 });
                }
            })
            .catch((error) => {
                res.send({ message: "Unable fetch data", status: false });
            })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}