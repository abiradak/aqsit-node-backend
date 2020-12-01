module.exports = (app,http)=>{
    var Project = require("../controller/project.controller");

    app.post("/api/projectCreate/addProductsCreate",Project.create);

    app.get("/api/projectCreate/addProductsCreate",Project.fetch);

    
    app.delete("/api/projectCreate/addProductsCreate",Project.delete);
    
    app.put("/api/projectCreate/addProductsCreate",Project.update);

    app.get("/api/projectCreate/fetchProjectById",Project.fetchById);
}