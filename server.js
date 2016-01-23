"use strict";

require("./env.js");

var http = require("http");

var query = "what",
    span = "all", //day,week,month,year,all
    sort = "top", //top,viral,time
    page = "0";
    
var options = {
  host: 'api.imgur.com',
  path: ["3/gallery/search",sort,span,page + "?q=" + query].join("/"),
  headers: {"Authorization" : "Client-ID " + process.env.CLIENT_ID}
};

var callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
req.end();
