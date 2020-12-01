
module.exports = (app,http)=>{
    var projectStatus = require("../controller/projectStatus.controller");

    app.post("/api/projectStatus/projectStatus",projectStatus.create);

    app.get("/api/projectStatus/projectStatus",projectStatus.fetch);

    app.delete("/api/projectStatus/projectStatus",projectStatus.delete);
    
    app.put("/api/projectStatus/projectStatus",projectStatus.update);

    app.get("/api/projectStatus/projectStatusById",projectStatus.fetchById);
}