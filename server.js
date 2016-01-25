"use strict";

require("./env.js");

var mongo = require('mongodb').MongoClient,
    express = require("express"),
    app = express(),
    routes = require("./app/routes.js");

mongo.connect(process.env.DB_CONNECT_STRING, function (err, db) {
  
  if (err) {
    throw new Error('Database failed to connect to ' + process.env.DB_CONNECT_STRING);
  } else {
    console.log('MongoDB successfully connected');
  }
  
  routes(app,db);
  
  var port = process.env.PORT || 8080;
  app.listen(port, function () {
    console.log('App running on port # ' + port);
  }); 
});