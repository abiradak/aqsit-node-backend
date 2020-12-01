module.exports = (app,http)=>{
    var spendCategories = require("../controller/spendCategories.controller");

    app.post("/api/spendCategories/spendCategories",spendCategories.create);

    app.get("/api/spendCategories/fetchbycategoeryforproject",spendCategories.fetchbycategoeryforproject);

    app.get("/api/spendCategories/spendCategories",spendCategories.fetch);

    app.delete("/api/spendCategories/spendCategories",spendCategories.delete);
    
    app.put("/api/spendCategories/spendCategories",spendCategories.update);

    app.get("/api/spendCategories/spendCategoriesAccordingId",spendCategories.fetchById);
}