'use strict'
const mongoose = require('mongoose');
const validator = require("validator");

const Schema = mongoose.Schema;

var adminpostSchema = new Schema ({
    userid : {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    heading : {type : String , required : true},
    message : {type : String , required : true},
    tags : {type : String , required : false},
    ministry : {type : String , required : false}
     
},{timestamps:true}
);

var AdminPost = mongoose.model('AdminPost',adminpostSchema,'adminpost'); 
