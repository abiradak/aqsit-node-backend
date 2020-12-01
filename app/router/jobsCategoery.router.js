module.exports = (app,http)=>{
    var jobsCategoery = require("../controller/jobCategoery.controller");

    app.post("/api/jobsCategoery/jobsCategoery",jobsCategoery.create);

    app.get("/api/jobsCategoery/jobsCategoery",jobsCategoery.fetch);

    app.delete("/api/jobsCategoery/jobsCategoery",jobsCategoery.delete);
    
    app.put("/api/jobsCategoery/jobsCategoery",jobsCategoery.update);
    
    app.get("/api/jobsCategoery/jobsCategoeryAccordingId",jobsCategoery.fetchById);

    app.get("/api/jobsCategoery/fetchforEstimate",jobsCategoery.fetchforEstimate);

}