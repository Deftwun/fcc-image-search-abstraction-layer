"use strict";

module.exports = search;

function search(searchString,callback,opt){
  
  if (!opt){
    opt = {
      time:"all",
      sort:"top",
      page:"0",
    }
  }
  
  else {
    opt.time = opt.time | "all";
    opt.sort = opt.sort | "top";
    opt.page = opt.page | "0";
  }
  
  require("./env.js");
  
  var https = require("https");
  
  var options = {
    host: 'api.imgur.com',
    path: ["3/gallery/search",opt.sort,opt.time,opt.page+"?="+searchString].join("/"),
    headers: {"Authorization" : "Client-ID " + process.env.CLIENT_ID}
  };  
  
  var callback = function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      callback(str);
    });
  };
  
  var req = https.request(options, callback);
  req.end();  
}