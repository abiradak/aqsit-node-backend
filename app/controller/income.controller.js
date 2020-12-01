var income = require("../model/income.model");
var project = require("../model/project.model");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var project_id = req.body.project_id;
    var amount = req.body.amount;
    var income_name = req.body.income_name;
    var incomedate = req.body.incomedate;
    if (user_id && amount && project_id && income_name && incomedate) {
        new income({
            user_id : user_id,
            project_id : project_id,
            amount : amount,
            income_name : income_name,
            incomedate : incomedate
        }).save()
            .then((result) => {
                res.send({ message: "Income created successfuly", status: true });
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
        income.find({ user_id: user_id, project_id : project_id }).sort({_id:-1})
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
    if (user_id) {
        income.find({ user_id: user_id, project_id : project_id }).populate([{path : 'project_id',model : project,select : ['project_name']}]).sort({_id:-1})
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
        if (req.body.income_name) {
            dynamicQuery.income_name = req.body.income_name;
        }
        if (req.body.incomedate) {
            dynamicQuery.incomedate = req.body.incomedate;
        }
        income.findByIdAndUpdate(column_id, { $set: dynamicQuery })
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
    var income_id = req.query.id;
    if (income_id) {
        income.findByIdAndDelete(income_id)
            .then((result) => {
                    res.send({ message: "Income deleted successfully", status: true });
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
        income.findById(id)
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