var project = require("../model/project.model");
var timelineColumn = require("../model/timelineColumn.model");
var projectStatus = require("../model/projectStatus.model");
var clientBrief = require("../model/clientBrief.model");
var client = require("../model/client.model");
var config = require("../../config.config");
var fs = require("fs");
var DesignStyle = require("./../model/designStyle.model");
var spendCategories = require("../model/spendCategories.model");
var estimate = require("../model/estimate.model");
var async = require("async"); 



exports.create = (req, res, next) => {
    var user_id = req.body.user_id;
    var project_name = req.body.project_name;
    var project_image = req.body.project_image;
    if (user_id && project_name && project_image) {
        console.log(" body ", req.body);
        new project({
            user_id: user_id,
            project_name: project_name,
            project_image: project_image
        }).save()
            .then((result) => {
                console.log(" result ", result._id);
                res.send({ message: "Project created", status: true });
                defaultstatus(user_id, result._id);
                createEstimate(user_id, result._id);
            })
            .catch((error) => {
                console.log(" error ", error);
                res.send({ message: "Unable to data", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    if (user_id) {
        project.find({ user_id: user_id }).populate([{
            path: 'projectStatus_id',
            model: projectStatus,
            select: ["title"]
        }])
            .then((result) => {
                if (result.length) {
                    var isCreated = JSON.parse(JSON.stringify(result));
                    clientBrief.find({ user_id: user_id})
                    .then((result1)=>{
                        var isCreated1 = JSON.parse(JSON.stringify(result1));
                        for (let i = 0; i < isCreated.length; i++) {
                            if (isCreated[i].projectStatus_id) {
                                isCreated[i].design = isCreated[i].projectStatus_id.title
                            } else {
                                isCreated[i].design = null;
                            }
                            isCreated[i].budget = null;
                            isCreated[i].timeline = null;

                            for (let j = 0; j < isCreated1.length; j++) {
                                const element1 = isCreated1[j];
                                if (element1.project_id.toString() == isCreated[i]._id.toString()) {
                                    if (element1.timeline) {
                                        isCreated[i].timeline = element1.timeline;
                                    } 
                                    if (element1.budget) {
                                        isCreated[i].budget = element1.budget;
                                    } 
                                }
                            }
                        }

                        res.send({ message: "Data found", status: true, data: isCreated });

                    }).catch((error)=>{
                        res.send({ message: "Data found", status: true, data: isCreated });
                    })
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
    var project_id = req.body.project_id;
    if (project_id) {
        var dynamicQuery = {};
        if (req.body.project_name) {
            dynamicQuery.project_name = req.body.project_name;
        }
        if (req.body.project_image) {
            dynamicQuery.project_image = req.body.project_image;
        }
        if (req.body.client_id) {
            dynamicQuery.client_id = req.body.client_id;
        }
        if (req.body.projectStatus_id) {
            dynamicQuery.projectStatus_id = req.body.projectStatus_id;
        }
        project.findByIdAndUpdate(project_id, { $set: dynamicQuery })
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
    var project_id = req.query.project_id;
    if (project_id) {
        project.findByIdAndDelete(project_id)
        .then((result)=>{
            res.send({message:"Project deleted successfully", status:true})
        })  
        .catch((error)=>{
                res.send({message:"Unable to delete project", status:false,error:error})
        })
    }else{
        res.status(400).send({message:"Invalid Data", status:false})
    }

}

exports.fetchById = (req, res, next) => {
    var project_id = req.query.id;
    if (project_id) {
        project.findById(project_id).populate([{
            path: 'projectStatus_id',
            model: projectStatus,
            select: ["title"]
        }, { 
            path: 'client_id',
            model: client,
            select: ["client_name"]
        }])
        .then((result) => {
            if (result !== "{}") {
                var result12 = JSON.parse(JSON.stringify(result));
                result12.clientBrief = null;
                clientBrief.find({ project_id : project_id},{project_image :1}).populate({path : "project_image",model : DesignStyle})
                .then((result11) => {
                    if (result11.length) {
                        var result111 = JSON.parse(JSON.stringify(result11));
                        for (let index = 0; index < result111.length; index++) {
                                if (result111[index].project_image) {
                                    result111[index].project_image.image = config.url + ":" + config.port + "/DesignStyle/" + result111[index].project_image.image;        
                                }
                        }
                        result12.clientBrief = result111[0];
                        res.send({ message: "Data found", status: true, data: result12 });
                    } else {
                        res.send({ message: "Data found", status: true, data: result12 });
                    }
                })
                .catch((error) => {
                    res.send({ message: "Data found", status: true, data: result12 });
                })
            } else {
                res.send({ message: "Data not found", status: false, data: result });
            }
        })
        .catch((error) => {
            console.log(" error ",error);
            res.send({ message: "Unable fetch data", status: false });
        })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}
function defaultstatusAssign(user_id, project_id, title, index) {
    new projectStatus({
        user_id: user_id,
        title: title,
        project_id: project_id
    }).save()
        .then((result) => {
            if (index == 0) {
                project.findByIdAndUpdate(project_id, { $set: { projectStatus_id: result._id } })
                    .then((result) => {
                        console.log(" done ");
                    })
                    .catch((error) => {
                    })
            }
        })
        .catch((error) => {
        })
}

function spendCategoriesAssignments(project_id, user_id) {
    async.eachSeries(config.SpendCategories,(eachdesign,next)=>{
        spendCategories.update({user_id: user_id,categoery : eachdesign.categoery, project_id: project_id},{$set : {user_id:user_id,categoery : eachdesign.categoery, project_id: project_id}},{upsert : true},(error,result)=>{
                if (error) {
                    console.log(" spendCategories not done");
                } else {
                    console.log("  spendCategories done",result);
                }
                next();
        })
    })
}

function timelineColumnAssignmnets(project_id, user_id) {
    async.eachSeries(config.Column,(eachdesign,next)=>{
        console.log(" eachdesign ",eachdesign);
        timelineColumn.update({user_id: user_id,title : eachdesign.title, project_id: project_id},{$set : {user_id:user_id,title : eachdesign.title, project_id: project_id}},{upsert : true},(error,result)=>{
                // if (error) {
                //     // console.log(" spendCategories not done");
                // } else {
                //     // console.log("  spendCategories done",result);
                // }
                next();
        })
    })
}
function defaultstatus(user_id, project_id) {
    spendCategoriesAssignments(project_id, user_id);
    timelineColumnAssignmnets(project_id, user_id);
    var projectStatusdefault = config.ProjectStates;
    for (let index = 0; index < projectStatusdefault.length; index++) {
        const element = projectStatusdefault[index];
        defaultstatusAssign(user_id, project_id, element, index);
    }
}

function createEstimate(user_id, project_id) {
    new estimate({
        user_id : user_id,
        project_id : project_id
    }).save()
    .then(()=>{

    })
    .catch(()=>{

    })
}