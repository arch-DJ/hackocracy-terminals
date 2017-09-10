const _ = require("lodash");
const mongoose = require("mongoose");
//var {Query} = require("./../models/query");
var Query = mongoose.model('Query');
var {User}=require("./../models/user");
var {ObjectId} = require("mongodb");
var insertQuery = function(req,callback){
//	console.log(req.body);
	var queryInsert = new Query({
    userid : req.user._id,
	  query : req.body.query,
	  heading : req.body.heading,
	  tags : req.body.tags,
	  address :{address1: req.body.address1,
	  address2 : req.body.address2,
	  country : req.body.country,
	  city : req.body.city,
	  district: req.body.district,
	  state : req.body.state,
	  pincode : req.body.pincode,
	  wardNo : req.body.wardNo
	  }
	  
	});
//	console.log(req.body.country);
	queryInsert.save().then((e)=>{
	  console.log("Date inserted to the query collection");
	  callback({"res":true})
	},(err)=>{
	  console.log(err);
    callback({"res":false})
	});
};


// To put list of all the queries on the feeds page
var getAllElements = function(req,callback){
  Query.find().then((query)=>{
    if(query){
      console.log(query.createdAt);
    callback({"data":query});
   }
  },(err)=>{
    console.log("No query found");
    //callback({"data":null});
  });
}

// To put list of the queries posted by an user
var getElementById = function(req,callback){
   var x = new ObjectId(req.params.mid);
   console.log(typeof(x));
   Query.find({"_id": req.params.qid},(err,result)=>{
     if(err)
      throw err
     else{
       
     }
   }).populate("userid").exec(function(err,results){
     if(err)
        throw err
     else{
      console.log("@@@@@@@@@@@@@@@@@@@@@@@")
       console.log(results);
        callback({"data":results}) 
     }})
   };

var getElementByUserId = function(req,callback){
   var x = new ObjectId(req.params.mid);
   console.log(typeof(x));
   Query.find({"userid": req.user.id},(err,result)=>{
     if(err)
      throw err
     else{
       
     }
   }).populate("userid").exec(function(err,results){
     if(err)
        throw err
     else{
      console.log("@@@@@@@@@@@@@@@@@@@@@@@")
       console.log(results);
        callback({"data":results}) 
     }})
   };

// Get list of query via a particular tags
var getElementByTags = function(req,callback){
  Query.find({"tags":req.params.tags}).then((query)=>{   // How to handle a tags when its a array
    callback({"data":query});
  },(err)=>{
    //callback({"data":null});
  });
};

// For searching a particular headings
var getElementByHeading = function(req,callback){
  Query.find({"heading":req.params.heading}).then((query)=>{
    callback({"data":query})
  },(err)=>{
    console.log("some error occurred");
  });
  
};

// Get the elements by the date created
var getElementbyDate=function(req,callback){
  Query.find({"createdAt":req.params.date}).then((query)=>{
    callback({"data":query})
   },(err)=>{
     callback({"data":null});
     console.log("Some error occurred");
   });
  };

// API to to sort the message in the decreasing order of the createdDate
var sortByCreatedDate = function(req,callback){
  Query.find({}).sort('-createdAt').then((query)=>{
    callback({"data":query});
  },(err)=>{
    callback({"data":null});
    console.log("some error occurred");
  });
};
// API to sort the message according to the decreasing order of the modifiedDate
var sortByUpdatedDate = function(req,callback){
  Query.find({}).sort('-updatedAt').then((query)=>{
    callback({"data":query});
  },(err)=>{
    callback({"data":null});
    console.log("some error occurred");
  });
};


// The following functions would be called form the calling functions

module.exports = {
 insertQuery,
 getAllElements,
 getElementByHeading,
// getElementByQuery,
 getElementByTags,
 getElementById,
 getElementByUserId,
 getElementbyDate,
 sortByCreatedDate,
 sortByUpdatedDate
};

//1. How to save into the database when its a array of string like in tags
// 2 . How to save the address related thing in the database as its also an array
//3. Do we need to provide a function about listing about the address
