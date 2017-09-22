'use strict'
const mongoose = require("mongoose");
const {ObjectId}= require("mongodb");

var User = mongoose.model('User');
// Getting all the user list
var getAllElements = function(req,callback){
    User.find().then((result)=>{
        if(!result){
            return callback({"data":null});
        }
        callback({"data":result});
        
    },(err)=>{
        console.log("Some results occured");
        callback({"data":null});
    });    
};
// if the priority of the user group is 1 that is Admin
var getElementAdmin = function (req,callback){
  User.find({"group":1}).then((result)=>{
      if(!result){
          return callback({"data":result});
      }
      callback({"data":result});
  },(err)=>{
    console.log("Some error occured");
    callback({"data":null});
  }); 
};
//  If the priority of the user group is 2 that is not Admin;
var getElementNonAdmin = function (req,callback){
  User.find({"group":2}).then((result)=>{
    if(!result){
      return callback({"data":result});
    }
    callback({"data":result});
  },(err)=>{
    console.log("Some error occured");
    callback({"data":null});
  }) ; 
};
// list of non banned users
var getElementNonBanned = function (req,callback){
  User.find({"isBanned":false}).then((result)=>{
    if(!result){
      return callback({"data":result});
    }
    callback({"data":result});
  },(err)=>{
    console.log("Some error occured");
    callback({"data":null});
  }) ; 
};

var getElementBanned = function (req,callback){
  User.find({"isBanned":false}).then((result)=>{
    if(!result){
      return callback({"data":result});
    }
    callback({"data":result});
  },(err)=>{
    console.log("Some error occured");
    callback({"data":null});
  }) ; 
};

var banUser = function(userId){
  User.findOneAndUpdate({"_id":userId},{"isBanned":true},function(err,data){
    if(err)
      throw err
    else{
      console.log(data)
    }
  })
}

var unbanUser = function(userId){
  User.findOneAndUpdate({"_id":userId},{"isBanned":false},function(err,data){
    if(err)
      throw err
    else{
      console.log(data)
    }
  })
}


module.exports = {
  getElementAdmin,
  getElementNonAdmin,
  getAllElements,
  getElementBanned,
  getElementNonBanned,
  banUser,
  unbanUser
}
