var proposal = require("../model/proposal.model");
// var config = require("./../..//config.config");
// var async = require("async");
var pdf = require("dynamic-html-pdf");
var phantomjs = require("phantomjs");
// exports.create = (req, res, next) => {
//     var user_id = req.body.user_id;
//     var categoery = req.body.categoery;
//     if (user_id && categoery) {
//         new jobsCategoery({
//             user_id: user_id,
//             categoery: categoery
//         }).save()
//             .then((result) => {
//                 res.send({ message: "Categoery created successfuly", status: true });
//             })
//             .catch((error) => {
//                 res.send({ message: "Unable to create categoery", status: false });
//             })

//     } else {
//         res.status(400).send({ message: "Invalid data", status: false });
//     }
// }

exports.fetch = (req, res, next) => {
    var project_id = req.query.project_id;
    var user_id = req.query.user_id;
    if (user_id && project_id) {
        proposal.find({ user_id: user_id, project_id: project_id})
            .then((result) => {
                if (result.length) {
                    res.send({ message: "Data found", status: true, data: result[0] });
                } else {
                    new proposal({
                        user_id: user_id,
                        project_id: project_id
                    }).save()
                    .then((result1) => {
                        res.send({ message: "data found", status: true, data : result1 });
                    })
                    .catch((error) => {
                        res.send({ message: "Unable to create proposal", status: false, data :{} });
                    })
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
    var proposal_id = req.body.id;
    if (proposal_id) {
        var dynamicQuery = {};
        if (req.body.logo) {
            dynamicQuery.logo = (req.body.logo == "true");
        }
        if (req.body.company_details) {
            dynamicQuery.company_details = (req.body.company_details == "true");
        }
        if (req.body.invoice_no) {
            dynamicQuery.invoice_no = req.body.invoice_no;
        }
        if (req.body.date) {
            dynamicQuery.date = new Date(req.body.date);
        }
        if (req.body.gst_details) {
            dynamicQuery.gst_details = (req.body.gst_details == "true");
        }
        if (req.body.designorinspiration) {
            dynamicQuery.designorinspiration = (req.body.designorinspiration == "true");
        }
        if (req.body.product) {
            dynamicQuery.product = (req.body.product == "true");
        }
        if (req.body.comment) {
            dynamicQuery.comment = req.body.comment;
        }
        proposal.findByIdAndUpdate(proposal_id, { $set: dynamicQuery })
            .then((result) => {
                res.send({ message: "Data update successfully", status: true });
            })
            .catch((error) => {
                console.log(" error ", error);
                res.send({ message: "Unable to update", status: false });
            })

    } else {
        res.status(400).send({ message: "Invalid data", status: false });
    }
}

exports.delete = (req, res, next)=>{
    var proposal_id = req.query.id;
    if (proposal_id) {
        proposal.findByIdAndDelete(proposal_id)
            .then((result) => {
                    res.send({ message: "Proposal deleted successfully", status: true });
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
        proposal.findById(id)
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

// var html = `
// <html>
// <body>
// <h1>hiii </h1>
// </body>
// </html>
// `
// var html = `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <title>PDF File</title>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
//     <link rel="stylesheet" type="text/css" href="http://localhost:8001/pdf-assets/css/style.css">
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
//     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
// </head>

// <body>

//     <div class="container">
//         <div class="row">
//             <div class="col">
//                 <img src="http://localhost:8001/pdf-assets/images/banner.svg" class="img-hw">
//                 <div class="col-text1">
//                     <h6 class="tag-text">RENDVATION FOR:
//                      <p class="para-name">Mrs. Kavita Singh</p>
//                     </h6>

//                     <h6 class="tag-text1">RENDVATION FOR:
//                      <p class="para-name">Mrs. Kavita Singh</p>
//                     </h6>

//                 </div>

//             </div>
//             <div class="col">
//                 <img src="http://localhost:8001/pdf-assets/images/logo.svg" class="logo-img">
//                 <h2 class="design-text">DESIGN</h2>
//                 <h3 class="proposal-text">PROPOSAL</h3>

//                 <hr class="hr-line">

//                 <p class="para-text">Date:18.21.2019</p>
//             </div>
//         </div>
//     </div>

// </body>

// </html>
// `;

var html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <title>PDF File</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="assets/css/style.css"> -->


    <style type="text/css">
        .container{
    /*padding: 0px;*/
    padding-left: 0px;
        height: 100vh;
}
.row{
    /*height: 100vh;*/
}
img.img-hw {
    width: 36vh;
    height: 77vh;
}
.logo-img{
    margin-top: 30px;
}
.design-text{
    font-style: normal;
    font-weight: 400;
    font-size: 35px;
    line-height: 53px;
    color: #000000;
    margin-left: -60px;
    margin-top: 100px;
}
.proposal-text{
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 41px;
    color: #000000;
    margin-left: -8vh;
    margin-top: -16px;
}
.para-text{
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    color: #000000;
    width: 48px;
        margin-top: -10px;
}
.hr-line{
    width: 61px;
    height: 2px;
    left: 489px;
    top: 295px;
    background: #000000;
}
.tag-text{
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 18px;
    color: #000000;
    margin-bottom: 0px;
}

.para-name{
    font-size: 10px;
    font-weight: 600;
}
.col-text1{
        display: flex;
            padding-left: 30px;
}

    </style>
    
</head>

<body>

    <div class="container">
        <div class="row" style="display: flex;">
            <div class="col">
                <img src="http://localhost:8001/pdf-assets/images/banner.svg" class="img-hw">
                <div class="col-text1">
                    <h6 class="tag-text">RENDVATION FOR:
                     <p class="para-name">Mrs. Kavita Singh</p>
                    </h6>
                    
                    <h6 class="tag-text1">RENDVATION FOR:
                     <p class="para-name">Mrs. Kavita Singh</p>
                    </h6>

                </div>
                
            </div>
            <div class="col" style="margin-left: 15px;">
                <img src="http://localhost:8001/pdf-assets/images/logo.svg" class="logo-img">
                <h2 class="design-text">DESIGN</h2>
                <h3 class="proposal-text">PROPOSAL</h3>

                <hr class="hr-line">

                <p class="para-text">Date:18.21.2019</p>
            </div>
        </div>
    </div>

</body>

</html>
`;
function pdfGenerationPdfkit(params, testdata) {
    return new Promise((resolve, reject) => {
        var options = {
            phantomPath: phantomjs.path,
            format: "A3",
            orientation: "portrait",
            border: "10mm",
        };
        var document = {
            type: "file",
            template: html,
            context: {
                users: [],
            },
            path: "./app/pdf/demo.pdf",
        };
        // {
        //     testdata : testdata[0],
        //     data : params
        // }
        pdf
            .create(document, options)
            .then((ressulr) => {
                console.log(" ressulr ", ressulr);
                resolve({
                    message: "PDF Generated successfully",
                    error: null,
                    status: true,
                });
            })
            .catch((error) => {
                console.log(" error ", error);

                reject({
                    message: "Unable to genererate2 ",
                    error: error,
                    status: false,
                });
            });
    });
}
// pdfGenerationPdfkit()
//   .then((resluts) => {
//     console.log(" resluts ", resluts);
//   })
//   .catch((error) => {
//     console.log(" error ", error);
//   });
