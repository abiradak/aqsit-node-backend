var client = require("../model/client.model");
var contactCategoery = require("../model/contactCategoery.model");
var jobs = require("../model/jobs.model");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var client_name = req.body.client_name;
    var email = req.body.email;
    var mobile_no = req.body.mobile_no;
    var categoery_id = req.body.categoery_id;
    if (user_id && client_name) {
        new client({
            user_id : user_id,
            categoery_id : categoery_id,
            client_name : client_name,
            email : email,
            mobile_no : mobile_no
        }).save() 
            .then((result) => {
                res.send({ message: "Client created successfuly", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to create client", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    if (user_id) {
        client.find({ user_id: user_id }).populate([{path : "categoery_id",model: contactCategoery,select:["categoery"]}])
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
    var id = req.body.id;
    if (id) {
        var dynamicQuery = {};
        if (req.body.categoery_id) {
            dynamicQuery.categoery_id = req.body.categoery_id;
        }
        if (req.body.client_name) {
            dynamicQuery.client_name = req.body.client_name;
        }
        if (req.body.email) {
            dynamicQuery.email = req.body.email;
        }
        if (req.body.address) {
            dynamicQuery.address = req.body.address;
        }
        if (req.body.mobile_no) {
            dynamicQuery.mobile_no = req.body.mobile_no;
        }
        if (req.body.job) {
            dynamicQuery.job = req.body.job;
        }

        client.findByIdAndUpdate(id, { $set: dynamicQuery })
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
    var id = req.query.id;
    if (id) {
        client.findByIdAndDelete(id)
            .then((result) => {
                    res.send({ message: "Client deleted successfully", status: true });
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
        client.findById(id).populate([{path:"job.jobs_id",model :jobs, select:["title"]},{path : "categoery_id",model: contactCategoery,select:["categoery"]}])
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