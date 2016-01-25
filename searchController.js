"use strict";

//Controller API Object
function Controller (db) {
  
  var collection = db.collection("searches");
  
  this.newSearch = function(str){
    collection.insert({"timestamp":Date.now(),"value":str});
  };
    
  this.getSearches = function(callback){
    
    var searches = [];
    
    var cursor = db.collection("searches")
                    .find({},{_id:0,value:1})
                    .sort({timestamp:-1});
                    
    cursor.each(function(err, doc) {
      
      if (err) throw err;
      
      if (doc != null) {
         searches.push(doc.value);
      } else {
        callback(searches);
      }
      
    });
    
  };
  
}

module.exports = Controller;