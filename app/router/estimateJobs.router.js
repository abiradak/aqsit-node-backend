module.exports = (app,http)=>{
    var estimateJobs = require("../controller/estimateJobs.controller");

    app.post("/api/estimateJobs/estimateJobs",estimateJobs.create);

    app.get("/api/estimateJobs/estimateJobs",estimateJobs.fetch);

    app.delete("/api/estimateJobs/estimateJobs",estimateJobs.delete);
    
    app.put("/api/estimateJobs/estimateJobs",estimateJobs.update);

    app.get("/api/estimateJobs/estimateJobsAccordingId",estimateJobs.fetchById);
}