module.exports = (app, http) => {
  var company = require("../controller/company.controller");

  // app.post("/api/company/company", company.create);
  app.get("/api/company/company", company.fetch);
  app.put("/api/company/company", company.update);
  app.delete("/api/company/company", company.delete);
  app.get("/api/company/companyByid", company.fetchById);
};
 