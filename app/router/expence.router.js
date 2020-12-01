module.exports = (app,http)=>{
    var expence = require("../controller/expence.controller");

    app.post("/api/expence/expence",expence.create);

    app.get("/api/expence/expence",expence.fetch);
    
    app.get("/api/expence/expencefordashboard",expence.fetchfordashboard);

    app.delete("/api/expence/expence",expence.delete);
    
    app.put("/api/expence/expence",expence.update);

    app.get("/api/expence/expenceAccordingid",expence.fetchById);
}