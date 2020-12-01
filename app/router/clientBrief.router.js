
module.exports = (app,http)=>{
    var projectStatus = require("../controller/clientBrief.controller");

    app.post("/api/ClientBrief/ClientBrief",projectStatus.create);

    app.get("/api/ClientBrief/ClientBrief",projectStatus.fetch);

    app.get("/api/DesignStyle/DesignStyle",projectStatus.DesignStylefetch);

    app.delete("/api/ClientBrief/ClientBrief",projectStatus.delete);
    
    app.put("/api/ClientBrief/ClientBrief",projectStatus.update);

    app.get("/api/ClientBrief/projectStatusById",projectStatus.fetchById);

    app.get("/api/ClientBriefQuestions/ClientBriefQuestions",projectStatus.ClientBriefQuestions);

}