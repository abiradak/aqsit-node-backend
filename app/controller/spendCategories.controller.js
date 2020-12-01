var spendCategories = require("../model/spendCategories.model");
var config = require("./../../config.config");
var mongoose = require("mongoose");
var expence = require("../model/expence.model");


exports.create = (req, res, next) => {
    var project_id = req.body.project_id;
    var user_id = req.body.user_id;
    var categoery = req.body.categoery;
    if (user_id && categoery && project_id ) {
        new spendCategories({
            user_id: user_id,
            categoery: categoery,
            project_id : project_id
        }).save()
            .then((result) => {
                res.send({ message: "Categoery created successfuly", status: true });
            })
            .catch((error) => {
                res.send({ message: "Unable to create categoery", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.fetch = (req, res, next) => {
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    if (user_id && project_id) {
        spendCategories.find({$or : [{ user_id: user_id, project_id: project_id },{user_id : null, project_id:project_id}]}).sort({_id : 1})
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
    var categoery_id = req.body.id;
    if (categoery_id) {
        var dynamicQuery = {};
        if (req.body.categoery) {
            dynamicQuery.categoery = req.body.categoery;
        }
        spendCategories.findByIdAndUpdate(categoery_id, { $set: dynamicQuery })
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
    var categoery_id = req.query.id;
    if (categoery_id) {
        spendCategories.findByIdAndDelete(categoery_id)
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
        spendCategories.findById(id)
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

exports.fetchbycategoeryforproject = (req,res,next)=>{
    var user_id = req.query.user_id;
    var project_id = req.query.project_id;
    var final_result = [];
    if (user_id && project_id) {
        spendCategories.find({user_id : user_id, project_id : project_id})
        .then((ressult)=>{
            expence.aggregate([{$match : {user_id :mongoose.Types.ObjectId(user_id), project_id : mongoose.Types.ObjectId(project_id) }},{$group : { _id : "$categoery_id", total_expence : { $sum : "$amount"},cout : {$sum : 1}}}])
            .then((result) => {
                    var ressult1 = JSON.parse(JSON.stringify(ressult));
                    var result1 = JSON.parse(JSON.stringify(result));
                    for (let index = 0; index < ressult1.length; index++) {
                        var total_amout = 0;
                        var total_count = 0;
                        for (let j = 0; j < result1.length; j++) {
                                if ( ressult1[index]._id.toString() == result1[j]._id.toString()) {
                                    total_amout = result1[j].total_expence;
                                    total_count = result1[j].cout;
                                }
                        }
                        final_result.push({cout : total_count,total : total_amout, categoery :  ressult1[index].categoery , id : ressult1[index]._id})
                    }
                    if (final_result.length) {
                        res.send({ message: "Data found", status: true, data: final_result});
                    } else {
                        res.send({ message: "Data not found", status: false, data: final_result });
                    }
            })
            .catch((error) => {
                    res.send({ message: "Data not found", status: false, data: result });
            })
        })
        .catch((error)=>{
            res.send({ message: "Unable fetch data", status: false });
        })
    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }

}