'use strict'
const mongoose = require ('mongoose');
const Schema = new mongoose.Schema;

var commentSchema = new Schema ({
	userid : {type : String , required : true},
	queryid :{type : String , required : true},//query type may be the object reference Please look into it
	comment : {type : String , required :true},
	{timestamps:true}
});
