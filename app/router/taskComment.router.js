
module.exports = (app,http)=>{
    var taskComment = require("../controller/taskComment.controller");

    app.post("/api/taskComment/taskComment",taskComment.create);

    app.get("/api/taskComment/taskComment",taskComment.fetch);

    app.delete("/api/taskComment/taskComment",taskComment.delete);
    
    app.put("/api/taskComment/taskComment",taskComment.update);

    app.get("/api/taskComment/taskCommentById",taskComment.fetchById);
}