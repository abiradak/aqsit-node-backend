module.exports = (app,http)=>{
    var estimate = require("../controller/estimate.controller");

    app.get("/api/estimate/estimate",estimate.fetch);
    
    app.put("/api/estimate/estimate",estimate.update);
    
    app.get("/api/estimate/estimateAccordingId",estimate.fetchById);
    
    app.post("/api/estimate/assignJobsCategoery",estimate.assignJobsCategoery);
    
    app.delete("/api/estimate/removeJobsCategoery",estimate.removeJobsCategoery);
    
    app.delete("/api/estimate/estimate",estimate.delete);

}