'use strict'
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
     	var addressSchema =  new Schema({
		address1 		: {type : String,required : true;},
		address2 		: {type : String,default : ''},
		city 			: {type : String,required : true},
		district 		: {type : String,required : true},
		state 			: {type : String,required : true},
		pincode 		: {type : Number,required : true},
	    wardNo 			: {type : Number,required : true}
	    });
var querySchema = new Schema ({
	userid 		: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},// The user folder must be included inside this folder??
	query  		: {type : String , required : true},
	tags   		: {type : String , required : true},
	heading 	: {type : String , required : true},
	address     : [addressSchema]; // This is the address of the probleam area from where the user is posting
			  {timestamps=true;}
});

var Query = mongoose.models('Query',querySchema);

module.exports = {
	Query
}
