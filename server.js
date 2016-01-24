"use strict";

require("./env.js");

var mongo = require('mongodb').MongoClient,
    express = require("express"),
    app = express();

mongo.connect(process.env.DB_CONNECT_STRING, function (err, db) {
  
  if (err) {
    throw new Error('Database failed to connect to ' + process.env.DB_CONNECT_STRING);
  } else {
    console.log('MongoDB successfully connected');
  }
  
  app.use("/",express.static("client"));
  
  app.get("/search",function(req,res){
    var searchString = req.query.q,
        page = req.query.offset;
    
    var imgur = require("./imgur.js");
    imgur.search(searchString,function(result){
      res.end(result);
    });
    
    var searchController = require("./searchController.js");
    searchController.addSearch(searchString)
  });
  
  var port = process.env.PORT || 8080;
  app.listen(port, function () {
    console.log('App running on port # ' + port);
  }); 
});