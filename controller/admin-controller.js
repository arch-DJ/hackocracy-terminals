const mongoose = require("mongoose");
//var {Query} = require("./../models/query");
require('../models/adminpost');
const {ObjectId} = require('mongodb');
//var ObjectID = require('mongodb').ObjectID
var AdminPost = mongoose.model('AdminPost');

// API to save the messages in the database
var saveMessage = function(req,callback){
     var saveQuery = new AdminPost({
        userid  : req.user._id,
        heading : req.body.heading,
        message : req.body.message,
        tags : req.body.tags,
        ministry : req.body.ministry
     });
     console.log(req.body);
     saveQuery.save().then((query)=>{
       console.log("Data inserted to the AdminDatabase");
       callback({"res":true})
     },(err)=>{
       console.log("Data not inserted",err);
       callback({"res":false});
     })

};

// API to find the all the messages posted by the admins
var getAllElements = function(req,callback){
    AdminPost.find({},function(err,result){
        if(err){
        throw err;
        }
    else{
            }
    }).populate("userid").exec(function(err,results){
        if(err){
            throw err;
        }
        else{
            callback({"data":results});
        }  
    })
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
// API to find the whole post according to the message is for showing the blog
 var getElementById = function(req,callback){
   var x = new ObjectId(req.params.mid);
   console.log(typeof(x));
   AdminPost.find({"_id": req.params.mid},(err,result)=>{
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

// API to to sort the message in the decreasing order of the createdDate
var sortByCreatedDate = function(req,callback){
  AdminPost.find({}).sort('-createdAt').then((query)=>{
    if(!query){
      return callback({"data":null});
    }
    callback({"data":query});
  },(err)=>{
    callback({"data":null});
    console.log("some error occurred");
  });
};
// API to sort the message according to the decreasing order of the modifiedDate
var sortByUpdatedDate = function(req,callback){
  AdminPost.find({}).sort('updatedAt').then((query)=>{
    if(!query){
      return callback({"data":null});
    }
    callback({"data":query});
  },(err)=>{
    callback({"data":null});
    console.log("some error occurred");
  });
};
module.exports = {
    getAllElements,
    saveMessage,
    getElementByMinistry,
    getElementByHeading,
    getElementByTags,
    getElementByUserId,
    getElementbyDate ,
    sortByCreatedDate,
    sortByUpdatedDate,
    getElementById
}
  
