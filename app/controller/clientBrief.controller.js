var clientBrief = require("../model/clientBrief.model");
var DesignStyle = require("../model/designStyle.model");
var config = require('./../../config.config');
var async = require("async");

exports.create = (req, res, next) => {
    console.log(" req.body ",req.body);
    var user_id = req.body.user_id;
    var project_id = req.body.project_id;
    var expectation_of_project = req.body.expectation_of_project;
    var budget = req.body.budget;
    var project_image = req.body.project_image;
    var timeline = req.body.timeline;
    var question_Answer = req.body.question_Answer;
    if (user_id && project_id && expectation_of_project && budget && project_image && timeline && question_Answer) {
        new clientBrief({
            user_id : user_id,
            project_id : project_id,
            expectation_of_project : expectation_of_project,
            budget : budget,
            project_image : project_image,
            timeline : timeline,
            question_Answer : question_Answer
        }).save()
            .then((result) => {
                console.log(" result ",result);
                res.send({ message: "Client Brief created successfuly", status: true });
            })
            .catch((error) => {
                console.log(" error ",error);
                res.send({ message: "Unable to create", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    if (user_id && project_id) {
        clientBrief.find({ user_id: user_id, project_id : project_id}).populate({path : "project_image",model : DesignStyle})
            .then((result) => {
                console.log(" result ",result);
                if (result.length) {
                    var result1 = JSON.parse(JSON.stringify(result));
                    for (let index = 0; index < result1.length; index++) {
                            if (result1[index].project_image) {
                                result1[index].project_image.image = config.url + ":" + config.port + "/DesignStyle/" + result1[index].project_image.image;        
                            }
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

exports.update = (req, res, next) => {
    var id = req.body.id;
    if (id) {
        var dynamicQuery = {};
        if (req.body.expectation_of_project) {
            dynamicQuery.expectation_of_project = req.body.expectation_of_project;
        }
        if (req.body.budget) {
            dynamicQuery.budget = req.body.budget;
        }
        if (req.body.project_image) {
            dynamicQuery.project_image = req.body.project_image;
        }
        if (req.body.timeline) {
            dynamicQuery.timeline = req.body.timeline;
        }
        if (req.body.question_Answer) {
            dynamicQuery.question_Answer = req.body.question_Answer;
        }
        clientBrief.findByIdAndUpdate(id, { $set: dynamicQuery })
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
        clientBrief.findByIdAndDelete(id)
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
        clientBrief.findById(id).populate({path : "project_image",model : DesignStyle})
            .then((result) => {
                if (result !== "{}") {
                    var result1 = JSON.parse(JSON.stringify(result));
                    result1.project_image.image = config.url + ":" + config.port + "/DesignStyle/" + result1.project_image.image;        
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

exports.DesignStylefetch = (req, res, next)=>{
    DesignStyle.find()
    .then((result)=>{
        var result1 = JSON.parse(JSON.stringify(result));
        for (let index = 0; index < result1.length; index++) {
                result1[index].image = config.url + ":" + config.port + "/DesignStyle/" + result1[index].image;        
        }
        res.send({message : "Design style found", status : true, result: result1})
    })
    .catch((err)=>{
        res.send({message : "unable to fetch design style ", status : false})
    })
}
function DesignStyleAssignments() {
    async.eachSeries(config.DesignStyle,(eachdesign,next)=>{
        DesignStyle.update({name : eachdesign.name},{$set : {name : eachdesign.name,image : eachdesign.image}},{upsert : true},(error,result)=>{
                // if (error) {
                //     console.log(" not done");
                // } else {
                //     console.log(" done",result);
                // }
                next();
        })
    })
}
DesignStyleAssignments();
exports.ClientBriefQuestions = (req,res,next)=>{
    res.send({message:"Client Brief suggested questions", status : true , data : config.ClientBriefQuestions})
}