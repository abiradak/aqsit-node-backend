module.exports = (app,http)=>{
    var timelineColumn = require("../controller/timelineColumn.controller");

    app.post("/api/timelineColumn/timelineColumn",timelineColumn.create);

    app.get("/api/timelineColumn/timelineColumn",timelineColumn.fetch);

    app.get("/api/timelineColumn/fetchwithTask",timelineColumn.fetchwithTask);

    app.delete("/api/timelineColumn/timelineColumn",timelineColumn.delete);
    
    app.put("/api/timelineColumn/timelineColumn",timelineColumn.update);

    app.get("/api/timelineColumn/timelineColumnById",timelineColumn.fetchById);
}