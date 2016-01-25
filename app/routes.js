"use strict";

var express = require("express");

module.exports = function(app,db){
  var SearchController = require("./searchController.js");
  var controller = new SearchController(db);
  
  app.use("/",express.static("client"));
  
  app.get("/recent-searches",function(req,res){
    controller.getSearches(function(data){
      res.json(data);
    });
  });
  
  app.get("/search",function(req,res){
    
    var searchString = req.query.q.replace(" ","%20"),
        page = req.query.offset;
    
    var imgur = require("./imgur.js");
    imgur.search(searchString,function(result){
      res.end(result);
    });
    
    controller.newSearch(req.query.q);
  });
}

