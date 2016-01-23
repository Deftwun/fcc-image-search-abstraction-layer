"use strict";

//require("./env.js");

module.exports = {
  search : function (searchString,callback,opt){
    
    if (!opt) opt={};
    opt.time = opt.time || "all";
    opt.sort = opt.sort || "top";
    opt.page = opt.page || "0";
    
    var https = require("https");
    
    var options = {
      protocol:"https:",
      host: 'api.imgur.com',
      path: ["3/gallery/search",opt.sort,opt.time,opt.page+"?="+searchString].join("/"),
      headers: {"Authorization" : "Client-ID " + process.env.CLIENT_ID}
    };  
    
    var req = https.request(options, function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function () {
        callback(str);
      });
    });
    
    req.end();  
  }
};
