
module.exports = (app,http)=>{
    var productAssingment = require("../controller/productAssingment.controller");

    app.post("/api/productAssingment/productAssingment",productAssingment.create);

    app.get("/api/productAssingment/productAssingment",productAssingment.fetch);

    app.delete("/api/productAssingment/productAssingment",productAssingment.delete);
    
}