const _ = require("lodash");

var {Query} = require("./../models/query");


// Controller to insert the query in the Query Database
var insertQuery = function(req){
    var body = _.pick(req.body,['query','tags','heading','address']);//Do Id needs to be considered here?
    var queryInsert = new Query{
      query : req.body.query,
      userid : req.user._id
    }
    queryInsert.save().then((e)=>{
        console.log("Data inserted");
    },(err)={
       console.log("Data not inserted "); 
    });
};

// To put list of the queries posted by an user
var getElementByUserId = function(req,callback){
  Query.find({"userid":req.userid}).then((query)=>{
    callback({"data":query});
  },(err)=>{
    callback({"date":null});
  });  
};
// Get list of query via a particular tags
var getElementByTags = function(req,callback){
  Query.find({"tags":req.tags}).then((query))=>{   // How to handle a tags when its a array
    callback({"data":query});
  },(err)=>{
    callback("data":null);
  }
};

// For searching a particular query
var getElementByQuery = function(req,callback){
 Query.find({"query":req.query}).then((query)=>{
   callback({"data":query});
 ),(err)=>{
    callback{("data":null});  
 }); 
};

var getElementByHeading = function(req,callback){
  Query.find({"heading":req.heading}).then((query)=>{
    if(!query)
    {
      return  callback({"data":null})
    }
    callback({"data":query})
  },(err)=>{
    console.log("some error occurred");
  });
  
};

var getElementByAddress = function(req,callback){
  Query.find("address":req.address)
}

// The following functions would be called form the calling functions

module.exports = {
 getElementByHeading,
 getElementByQuery,
 getElementByTags,
 getElementByUserId 
};

//1. How to save into the database when its a array of string like in tags
// 2 . How to save the address related thing in the database as its also an array
//3. Do we need to provide a function about listing about the address
