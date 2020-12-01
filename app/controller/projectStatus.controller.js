var projectStatus = require("../model/projectStatus.model");
var project = require("../model/project.model");

exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var title = req.body.title;
    var project_id = req.body.project_id;
    if (user_id && title && project_id) {
        new projectStatus({
            user_id : user_id,
            title : title,
            project_id : project_id
        }).save()
            .then((result) => {
                res.send({ message: "Project status created successfuly", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to data", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    if (user_id && project_id) {
        projectStatus.find({ user_id: user_id, project_id : project_id}).populate([{
            path: 'project_id',
            model: project,
            select : ['projectStatus_id']
        }])
            .then((result) => {
                if (result.length) {
                    result = JSON.parse(JSON.stringify(result));
                    for (let index = 0; index < result.length; index++) {
                            if (result[index].project_id) {
                                result[index].assign = (result[index]._id.toString() === result[index].project_id.projectStatus_id.toString());
                            }
                    }
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
        if (req.body.title) {
            dynamicQuery.title = req.body.title;
        }
        projectStatus.findByIdAndUpdate(id, { $set: dynamicQuery })
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
        projectStatus.findByIdAndDelete(id)
            .then((result) => {
                    res.send({ message: "Project status deleted successfully", status: true });
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
        projectStatus.findById(id)
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