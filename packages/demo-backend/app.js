var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { initialize } = require("express-openapi");
var swaggerUi = require("swagger-ui-express");

var indexRouter = require('./routes/index');

var app = express();

app.listen(3031);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// OpenAPI routes
initialize({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/paths",
});

// OpenAPI UI
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3031/api-docs",
    },
  })
);

console.log("App running on port http://localhost:3031");
console.log(
  "OpenAPI documentation available in http://localhost:3031/api-documentation"
);

module.exports = app;
