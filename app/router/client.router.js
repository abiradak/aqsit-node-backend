module.exports = (app,http)=>{
    var client = require("../controller/client.controller");

    app.post("/api/client/client",client.create);

    app.get("/api/client/client",client.fetch);

    app.delete("/api/client/client",client.delete);
    
    app.put("/api/client/client",client.update);

    app.get("/api/client/clientFetchById",client.fetchById);
}