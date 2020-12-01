var timelineColumn = require("../model/timelineColumn.model");
var task = require("./../model/task.model")

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var project_id = req.body.project_id;
    var title = req.body.title;
    if (user_id && title && project_id) {
        new timelineColumn({
            user_id : user_id,
            title : title,
            project_id : project_id
        }).save()
            .then((result) => {
                res.send({ message: "Column created successfuly", status: true });
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
    if (user_id) {
        timelineColumn.find({ user_id: user_id, project_id : project_id })
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

exports.fetchwithTask = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    var final_result = [];
    if (user_id) {
        timelineColumn.find({ user_id: user_id, project_id : project_id })
            .then((result) => {
                if (result.length) {
                    var result1 = JSON.parse(JSON.stringify(result));
                    var templ = [];
                    for (let index = 0; index < result1.length; index++) {
                        templ.push(result1[index]._id.toString())
                        final_result.push({id : result1[index]._id.toString(),status : result1[index].title, arr : []});
                    }
                    task.find({timelineColumn_id : { $in : templ}})
                    .then((yess)=> {
                            yess.forEach(finalElement => {
                                for (let index = 0; index < final_result.length; index++) {
                                    if(final_result[index].id == finalElement.timelineColumn_id)
                                    final_result[index].arr.push({task_name : finalElement.task_name, taskCompletedate : finalElement.taskCompletedate, id : finalElement._id.toString(), status : finalElement.status, comments : finalElement.comments, attachments : finalElement.attachments.length, description : finalElement.description})
                                } 
                            });
                            res.send({ message: "Data found", status: true, data: final_result});
                    })
                    .catch((error)=>{
                            res.send({ message: "Data found", status: true, data: final_result});
                    })
                    console.log(" templ ",templ);
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
        if (req.body.title) {
            dynamicQuery.title = req.body.title;
        }
        timelineColumn.findByIdAndUpdate(column_id, { $set: dynamicQuery })
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
    var column_id = req.query.id;
    if (column_id) {
        timelineColumn.findByIdAndDelete(column_id)
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
        timelineColumn.findById(id)
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