var taskComment = require("../model/taskComment.model");
var User = require("../model/user.model");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var comment = req.body.comment;
    var task_id = req.body.task_id;
    if (user_id && comment && task_id) {
        new taskComment({
            user_id : user_id,
            comment : comment,
            task_id : task_id
        }).save()
            .then((result) => {
                res.send({ message: "Comment created successfuly", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to data", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var task_id = req.query.task_id;
    var user_id = req.query.user_id;
    if (task_id && user_id) {
        taskComment.find({user_id : user_id,task_id : task_id}).populate([{
            path: 'user_id',
            model: User,
            select : ['name']
        }])
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
        if (req.body.comment) {
            dynamicQuery.comment = req.body.comment;
        }
        taskComment.findByIdAndUpdate(id, { $set: dynamicQuery })
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
        taskComment.findByIdAndDelete(id)
            .then((result) => {
                    res.send({ message: "Comment deleted successfully", status: true });
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
        taskComment.findById(id)
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