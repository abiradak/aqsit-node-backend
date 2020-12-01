const checksum_lib = require('./../paymentFiles/checksum');
const qs = require('querystring');
var config = require("../../config.config");
var PaytmConfig = config.PaytmConfig;
var User = require("./../model/user.model");
var Chat = require("./../model/chat.model");
var Transaction = require("./../model/transaction.model");
var common = require("./../common/mail.common");


exports.paymentStart = (req, res, next) => {
    console.log(" paymentStart ",req.query);
    
    var userID = req.query.userID;
    var messageId = req.query.messageId;
    if (userID && messageId) {
        User.findById(userID)
            .then((result) => {
                if (result !== null) {
                    Chat.findById(messageId)
                    .then((result2) => {
                            if (result2) {       
                                new Transaction({
                                    userId : userID,
                                    messageId : messageId,
                                    amount : config.price,
                                }).save()
                                .then((result33)=>{
                                    var params = {};                                    
                                    params['MID'] = PaytmConfig.mid;
                                    params['WEBSITE'] = PaytmConfig.website;
                                    params['CHANNEL_ID'] = 'WEB';
                                    params['INDUSTRY_TYPE_ID'] = 'Retail';
                                    params['ORDER_ID'] = result33._id.toString();
                                    params['CUST_ID'] = userID;
                                    params['TXN_AMOUNT'] = config.price;
                                    params['CALLBACK_URL'] = config.url + ":" + config.port + '/paymentDone';
                                    params['EMAIL'] = result.email;
                                    params['MOBILE_NO'] = result.mobileNo;
                                    console.log(" params ",params);
                                    
                                    checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {
                                        // var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
                                        var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
                                        var form_fields = "";
                                        for (var x in params) {
                                            form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
                                        }
                                        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
                                        res.writeHead(200, { 'Content-Type': 'text/html' });
                                        res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
                                        res.end();
                                    });
                                })
                                .catch((err)=>{
                                    res.status(400).send({ message: "Unable to process payment", status: false })
                                })
                            } else {
                                res.status(400).send({ message: "Invalide test data", status: false })
                            }
                        })
                    .catch((error) => {
                        res.status(400).send({ message: "Invalide test data", status: false })
                    })
                } else {
                    res.status(400).send({ message: "Invalide user data", status: false })
                }
            })
            .catch((error) => {
                res.status(400).send({ message: "Invalide user data", status: false })
            })
    } else {
        res.status(400).send({ message: "Invalide data", status: false })
    }
}

exports.paymentDone = (req, res, next) => {
    console.log(" req ",req.body);
    var transactionDetails = req.body;
    var ORDERID = transactionDetails.ORDERID;
    var transactionId = transactionDetails.TXNID;
    var BANKTXNID = transactionDetails.BANKTXNID;
    var transactionStatus = transactionDetails.STATUS;
    var datess = new Date();

    Transaction.findByIdAndUpdate(ORDERID,{$set : {transactionId : transactionId, transactionStatus : transactionStatus , BANKTXNID : BANKTXNID}},(error,result)=>{
        if(error){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var string = "ORDERID = "+ORDERID+" <br> TXNID = "+transactionId+"<br> transactionStatus = "+transactionStatus;
            res.write('<h1> please send the screen short to admin <br>'+string);
            res.end();
        }else{
            var status = transactionStatus.replace("TXN_",'');
            // var paid = false;
            if (status == "SUCCESS") {
                console.log(" result ",result);
                Chat.findByIdAndUpdate(result.messageId,{$set : {paid : true} }).populate({path:'userId',model:User})
                .then((reuss)=>{
                    if (reuss.userId && reuss.userId.name) {
                        var tempate = `
                                Dear ${reuss.userId.name},
                                <p>
                                thank you for using Adios App.
                                we have received payment for Rs 100 that you submitted on ${datess.getDate()}-${datess.getMonth()}-${datess.getFullYear()}. The payment has been authorized and approved.

                                thank you for your Trust

                                Best regards,

                                Adios Team
                                </p>
                            `
                        sendingMail(reuss.userId.email,tempate,"Thank you for your payment ")
                        
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<h1> Transaction is '+status+'</h1>');
                    res.end();
                })
                .catch((error)=>{
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<h1> Transaction is '+status+'</h1>');
                    res.end();
                })
            }else{
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1> Transaction is '+status+'</h1>');
                res.end();
            }
        }
    })
}