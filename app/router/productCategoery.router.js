module.exports = (app,http)=>{
    var productCategoery = require("../controller/productCategoery.controller");

    app.post("/api/productCategoery/productCategoery",productCategoery.create);

    app.get("/api/productCategoery/productCategoery",productCategoery.fetch);

    app.delete("/api/productCategoery/productCategoery",productCategoery.delete);
    
    app.put("/api/productCategoery/productCategoery",productCategoery.update);

    app.get("/api/productCategoery/productCategoeryAccordingId",productCategoery.fetchById);
}