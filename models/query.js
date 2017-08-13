'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema ({
	userid :{type : String , required : true},
	query  :{type : String , required : true},
	tags   :{type : String , required : true},
	heading :{type : String , required : true},
	// Please add address schema 
	{timestamps=true;}
});
