const mongoose = require("mongoose");
//var {Query} = require("./../models/query");
require('../models/adminpost');
var AdminPost = mongoose.model('AdminPost');

// API to save the messages in the database
var saveMessage = function(req){
     var saveQuery = new AdminPost({
        heading : req.body.heading,
        message : req.body.message,
        tags : req.body.tags,
        ministry : req.body.ministry
     });
     saveQuery.save().then((query)=>{
       console.log("Data inserted to the AdminDatabase");
     },(err)=>{
       console.log("Data not inserted");
     })

};

// API to find the all the messages posted by the admins
var getAllElements = function(req,callback){
  AdminPost.find().then((result)=>{
        if(!result){
        return  callback({"data":null});
        }
        callback({"data":result});
  },(err)=>{
    callback({"data":null});
    console.log("No result found and error found sorry");
      });
    
};

// API to find the message according to the user for using it in the dashboard
var getElementByUserId = function(req,callback){
  AdminPost.find({"userid": req.params.id}).then((result)=>{
    if(!result){
      return callback({"data":null})
    }
    callback({"data":result});
    },(err)=>{
      callback({"data":null});
      console.log("Error found in finding the data");
    });
};

// API to find the message according to the tags for using 
var getElementByTags = function(req,callback){
  AdminPost.find({"tags":req.params.tags}).then((query)=>{   
    if(!query){
      return callback({"data":null});
    }
    callback({"data":query});
  },(err)=>{
    callback({"data":null});
  });
};

// API  to find message according to the headings
var getElementByHeading = function(req,callback){
  AdminPost.find({"heading":req.params.heading}).then((query)=>{
    if(!query)
    {
      return  callback({"data":null})
    }
    callback({"data":query})
  },(err)=>{
    console.log("some error occurred");
  });
};

// API to find the message according to the date createdDate

var getElementbyDate=function(req,callback){
  AdminPost.find({"createdAt":req.params.date}).then((query)=>{
    if(!query){
      return callback({"data":null});
    }
    callback({"data":query})
  },(err)=>{
    callback({"data":null});
    console.log("Some error occurred");
  });
};

//API to find the message according to the ministry
var getElementByMinistry=function(req,callback){
  AdminPost.find({"ministry":req.params.ministry}).then((query)=>{
   if(!query){
     return callback({"data":null});
   }
   callback({"data":query});
  },(err)=>{
    callback({"data":null});
    console.log("Some error occurred");
  });
};


module.exports = {
    getAllElements,
    saveMessage,
    getElementByMinistry,
    getElementByHeading,
    getElementByTags,
    getElementByUserId,
    getElementbyDate 
}
  
