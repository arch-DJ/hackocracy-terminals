'use strict'
const mongoose = require ('mongoose');
const Schema = new mongoose.Schema;

var commentSchema = new Schema ({
	userid 		: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},,
	queryid 	: {type:mongoose.Schema.Types.ObjectId, ref: 'query'},,
	comment 	: {type : String , required :true},
			  {timestamps:true}
});
