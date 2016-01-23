"use strict";

var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;
    
//app.use("/",express.static("client"));

app.use("/",express.static("client"));

app.get("/search/:str",function(req,res){
  var searchString = req.params.str,
      page = req.query.offset;
      
  console.log(searchString + " : " + page);
});

app.listen(port, function () {
  console.log('Running on port # ' + port);
});