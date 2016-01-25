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
  
  var controller = new (require("./searchController.js"))(db);
  
  app.use("/",express.static("client"));
  
  app.get("/recent-searches",function(req,res){
    controller.getSearches(function(data){
      res.json(data);
    })
  });
  
  app.get("/search",function(req,res){
    var searchString = req.query.q,
        page = req.query.offset;
    
    var imgur = require("./imgur.js");
    imgur.search(searchString,function(result){
      res.end(result);
    });
    
    controller.newSearch(searchString);
  });
  
  var port = process.env.PORT || 8080;
  app.listen(port, function () {
    console.log('App running on port # ' + port);
  }); 
});