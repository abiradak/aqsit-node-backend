module.exports = (app,http)=>{
    var proposal = require("../controller/proposal.controller");

    // app.post("/api/proposal/proposal",proposal.create);

    app.get("/api/proposal/proposal",proposal.fetch);

    app.delete("/api/proposal/proposal",proposal.delete);
    
    app.put("/api/proposal/proposal",proposal.update);

    app.get("/api/proposal/proposalAccordingId",proposal.fetchById);

}