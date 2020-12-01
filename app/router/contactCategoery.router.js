module.exports = (app,http)=>{
    var contactCategoery = require("../controller/contactCategoery.controller");

    app.post("/api/contactCategoery/contactCategoery",contactCategoery.create);

    app.get("/api/contactCategoery/contactCategoery",contactCategoery.fetch);

    app.delete("/api/contactCategoery/contactCategoery",contactCategoery.delete);
    
    app.put("/api/contactCategoery/contactCategoery",contactCategoery.update);

    app.get("/api/contactCategoery/contactCategoeryAccordingId",contactCategoery.fetchById);
}