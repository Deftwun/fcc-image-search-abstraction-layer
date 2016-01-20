var express = require("express");
var app = express();
"use strict";

var port = process.env.PORT || 8080;

app.use("/",express.static("client"));

app.listen(port, function () {
console.log('url-shortener running on port ' + port);
});
  
