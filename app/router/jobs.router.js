module.exports = (app,http)=>{
    var jobs = require("../controller/jobs.controller");

    app.post("/api/jobs/jobs",jobs.create);

    app.get("/api/jobs/jobs",jobs.fetch);

    app.delete("/api/jobs/jobs",jobs.delete);
    
    app.put("/api/jobs/jobs",jobs.update);

    app.get("/api/jobs/jobsAccordingId",jobs.fetchById);

    app.get("/api/job/fetchForEstimate",jobs.fetchForEstimate);
}