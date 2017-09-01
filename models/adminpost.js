'use strict'
const mongoose = require("mongoose");
const validator = require("validator");


var adminpostSchema = new mongoose.Schema ({
    userid : {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    heading : {type : String , required : true},
    message : {type : String , required : true},
    tags : {type : String , required : true},
    ministry : {type : String , required : true}
     
},{timestamps:true});

var AdminPost = new mongoose.Schema ('AdminPost', adminpostSchema,'admin'); 
