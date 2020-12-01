module.exports = (app,http)=>{
    var task = require("../controller/task.controller");

    app.post("/api/task/task",task.create);

    app.get("/api/task/task",task.fetch);

    app.delete("/api/task/task",task.delete);
    
    app.put("/api/task/task",task.update);

    app.put("/api/task/taskattachments",task.attach_attachments);
    
    app.delete("/api/task/taskattachments",task.delete_attachments);

    app.get("/api/task/taskById",task.fetchById);
}