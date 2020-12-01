module.exports = (app,http)=>{
    var income = require("../controller/income.controller");

    app.post("/api/income/income",income.create);

    app.get("/api/income/income",income.fetch);
    
    app.get("/api/income/incomefordashboard",income.fetchfordashboard);

    app.delete("/api/income/income",income.delete);
    
    app.put("/api/income/income",income.update);

    app.get("/api/income/incomeAccording",income.fetchById);
}