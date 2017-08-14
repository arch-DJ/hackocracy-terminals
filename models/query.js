'use strict'
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema ({
	userid 		: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},,
	query  		: {type : String , required : true},
	tags   		: {type : String , required : true},
	heading 	: {type : String , required : true},
	// Please add address schema 
			  {timestamps=true;}
});
