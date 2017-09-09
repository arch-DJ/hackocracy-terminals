'use strict'
const mongoose = require ('mongoose');
const Schema =  mongoose.Schema;

var commentSchema = new Schema ({
	userid 		: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	queryid 	: {type:mongoose.Schema.Types.ObjectId, ref: 'Query'},
	adminid     : {type: mongoose.Schema.Types.ObjectId, ref: 'AdminPost'},// That query file must be included inside this file ??
	comment 	: {type : String , required :true}
	},
	{timestamps:true}
);

var Comment = mongoose.model("Comment",commentSchema,'comment');


