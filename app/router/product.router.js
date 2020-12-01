module.exports = (app,http)=>{
    var product = require("../controller/product.controller");

    app.post("/api/product/product",product.create);

    app.get("/api/product/product",product.fetch);

    app.delete("/api/product/product",product.delete);
    
    app.put("/api/product/product",product.update);

    app.put("/api/product/productattachments",product.attach_attachments);
    
    app.delete("/api/product/productattachments",product.delete_attachments);

    app.get("/api/product/productById",product.fetchById);
}