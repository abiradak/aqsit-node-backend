var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var config = require("./config.config");
var mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
var fs = require("fs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

mongoose.connect(config.databaseUrl, (error, result) => {
  if (error) {
    console.error(" database connectivity ", error);
  } else {
    console.log(" database connect successfully");
  }
});

if (!fs.existsSync("./app/attachments/")) {
  fs.mkdirSync("./app/attachments/");
  fs.mkdirSync("./app/attachments/task");
  fs.mkdirSync("./app/attachments/product");
  fs.mkdirSync("./app/attachments/companyicon");
} else {
  if (!fs.existsSync("./app/attachments/product"))
    fs.mkdirSync("./app/attachments/product");
    
  if (!fs.existsSync("./app/attachments/companyicon"))
    fs.mkdirSync("./app/attachments/companyicon");
}
if (!fs.existsSync("./app/pdf")) fs.mkdirSync("./app/pdf");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(
  fileUpload({
    limits: { fileSize: 200 * 1024 * 1024 },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "app")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

require("./app/router/user.router")(app);
require("./app/router/project.router")(app);
require("./app/router/contactCategoery.router")(app);
require("./app/router/productCategoery.router")(app);
require("./app/router/client.router")(app);
require("./app/router/projectStatus.router")(app);
require("./app/router/clientBrief.router")(app);
//not live yet
require("./app/router/timelineColumn.router")(app);
require("./app/router/task.router")(app);
require("./app/router/taskComment.router")(app);
require("./app/router/income.router")(app);
require("./app/router/spendCategories.router")(app);
require("./app/router/expence.router")(app);
require("./app/router/jobs.router")(app);
require("./app/router/jobsCategoery.router")(app);
require("./app/router/product.router")(app);
// require("./app/router/rooms.router")(app);
require("./app/router/estimate.router")(app);
require("./app/router/productAssingment.router")(app);
require("./app/router/proposal.router")(app);
require("./app/router/company.router")(app);
require("./app/router/estimateJobs.router")(app);
// require("./app/router/transaction.router")(app);
// require("./app/router/otp.router")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

app.listen(config.port, (req, res) => {
  console.log(" server start at " + config.port);
});
