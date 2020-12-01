var task = require("../model/task.model");
var project = require("../model/project.model");
var fs = require('fs');
var config = require("./../../config.config");
var async = require("async");
var mongoose  = require("mongoose");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var project_id = req.body.project_id;
    var timelineColumn_id = req.body.timelineColumn_id;
    var task_name = req.body.task_name;
    var description = req.body.description;
    var status = req.body.status;
    var taskCompletedate = req.body.taskCompletedate;

    if (user_id && task_name && project_id && timelineColumn_id) {
        if (req.files) {
            var attachments = req.files.attachments;
            var saved_attachments = [];
            if (attachments.length) {
                var count = 0;
                async.eachSeries(attachments, (eachfile, next) => {
                    var filesName = new Date().toISOString() + eachfile.name;
                    eachfile.mv("./app/attachments/task/" + filesName, (error) => {
                        if (error) {
                            count++;
                            next();
                            if (attachments.length == count) {
                                new task({
                                    user_id: user_id,
                                    timelineColumn_id: timelineColumn_id,
                                    project_id: project_id,
                                    task_name: task_name,
                                    description: description,
                                    status: status,
                                    taskCompletedate: taskCompletedate,
                                    attachments: saved_attachments
                                }).save()
                                    .then((result) => {
                                        res.send({ message: "Task created successfuly", status: true });
                                    })
                                    .catch((error) => {
                                        res.send({ message: "Unable to create task", status: false });
                                    })
                            }
                        } else {
                            saved_attachments.push({ attachments_name: filesName });
                            count++;
                            next();
                            if (attachments.length == count) {
                                new task({
                                    user_id: user_id,
                                    timelineColumn_id: timelineColumn_id,
                                    project_id: project_id,
                                    task_name: task_name,
                                    description: description,
                                    status: status,
                                    taskCompletedate: taskCompletedate,
                                    attachments: saved_attachments
                                }).save()
                                    .then((result) => {
                                        res.send({ message: "Task created successfuly", status: true });
                                    })
                                    .catch((error) => {
                                        res.send({ message: "Unable to create task", status: false });
                                    })
                            }
                        }
                    })
                })
            } else {
                var filesName = new Date().toISOString() + attachments.name;
                attachments.mv("./app/attachments/task/" + filesName, (error) => {
                    if (error) {
                        res.send({ message: "Unable to save attachments", status: false, error: eroro.error })
                    } else {
                        saved_attachments.push({ attachments_name: filesName });
                        console.log();
                        new task({
                            user_id: user_id,
                            timelineColumn_id: timelineColumn_id,
                            project_id: project_id,
                            task_name: task_name,
                            description: description,
                            status: status,
                            taskCompletedate: taskCompletedate,
                            attachments: saved_attachments
                        }).save()
                            .then((result) => {
                                res.send({ message: "Task created successfuly", status: true });
                            })
                            .catch((error) => {
                                res.send({ message: "Unable to create task", status: false });
                            })
                    }
                })
            }
        } else {
            new task({
                user_id: user_id,
                timelineColumn_id: timelineColumn_id,
                project_id: project_id,
                task_name: task_name,
                description: description,
                status: status,
                taskCompletedate: taskCompletedate
            }).save()
                .then((result) => {
                    res.send({ message: "Task created successfuly", status: true });
                })
                .catch((error) => {
                    res.send({ message: "Unable to create task", status: false });
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
        if (req.query.project_id) {
            dynamicQuery.project_id = req.query.project_id;
        }
        task.find(dynamicQuery).populate([{
            path: "project_id",
            model: project,
            select: ['project_name']
        }]).sort({ status: 1 })
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
    var task_id = req.body.id;
    if (task_id) {
        var dynamicQuery = {};
        if (req.body.timelineColumn_id) {
            dynamicQuery.timelineColumn_id = req.body.timelineColumn_id;
        }
        if (req.body.task_name) {
            dynamicQuery.task_name = req.body.task_name;
        }
        if (req.body.description) {
            dynamicQuery.description = req.body.description;
        }
        if (req.body.status) {
            dynamicQuery.status = (req.body.status === "true");
        }
        if (req.body.taskCompletedate) {
            dynamicQuery.taskCompletedate = req.body.taskCompletedate;
        }
        task.findByIdAndUpdate(task_id, { $set: dynamicQuery })
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
    var task_id = req.query.id;
    if (task_id) {
        task.findByIdAndDelete(task_id)
            .then((result) => {
                res.send({ message: "Task deleted successfully", status: true });
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
        task.findById(id)
            .then((result) => {
                if (result !== "{}") {
                    var result1 = JSON.parse(JSON.stringify(result));
                    for (let index = 0; index < result1.attachments.length; index++) {
                        result1.attachments[index].attachments_name = config.url + ":" + config.port + "/attachments/task/" + result1.attachments[index].attachments_name
                    }
                    res.send({ message: "Data found", status: true, data: result1 });
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

exports.attach_attachments = (req, res, next) => {
    var task_id = req.body.id;
    if (task_id && req.files) {
        var attachments = req.files.attachments;
        if (attachments.length) {
            var saved_attachments = [];
            var count = 0;
            async.eachSeries(attachments, (eachfile, next) => {
                var filesName = new Date().toISOString() + eachfile.name;
                eachfile.mv("./app/attachments/task/" + filesName, (error) => {
                    if (error) {
                        count++;
                        next();
                        if (attachments.length == count) {
                            task.findByIdAndUpdate(task_id, { $addToSet: { attachments: saved_attachments} })
                                .then((result) => {
                                    console.log(" result ", result);
                                    res.send({ message: "Attachment addded successfully", status: true })
                                })
                                .catch((error) => {
                                    res.send({ message: "Unable add attachment", status: false });
                                })
                        }
                    } else {
                        saved_attachments.push({ attachments_name: filesName });
                        count++;
                        next();
                        if (attachments.length == count) {
                            task.findByIdAndUpdate(task_id, { $addToSet: { attachments: saved_attachments } })
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
            attachments.mv("./app/attachments/task/" + filesName, (error) => {
                if (error) {
                    res.send({ message: "Unable to save attachments", status: false, error: eroro.error })
                } else {
                    task.findByIdAndUpdate(task_id, { $addToSet: { attachments: { attachments_name: filesName } } })
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
    var task_id = req.query.id;
    var attachment_id = req.query.attachment_id;
    if (task_id && attachment_id) {
        task.findByIdAndUpdate(task_id,{$pull:{attachments : {_id :mongoose.Types.ObjectId(attachment_id)}}})
        .then((result)=>{
            for (let index = 0; index < result.attachments.length; index++) {
                const element =  result.attachments[index];
                if (element._id.toString() == attachment_id) {
                        console.log(" done ",element);
                        fs.unlink("./app/attachments/task/"+element.attachments_name,(error)=>{
                            console.log(" error ",error);
                        })
                }
            }
            res.send({message:"Attachments remove successfully", status : true});

        })
        .catch((error)=>{
            res.send({ message: "Unable to remove attachments", status: false });
        })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }   
}