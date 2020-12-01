module.exports = (app) =>{
    var Transactions = require("../controller/transaction.controller");
    
    app.get("/MakeTransaction",Transactions.paymentStart);

    app.post("/paymentDone",Transactions.paymentDone);

}
