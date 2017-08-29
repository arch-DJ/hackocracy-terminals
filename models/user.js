'use strict'
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require("validator");

//require('mongoose-type-email');
SALT_WORK_FACTOR = 15;

/*Schema to store the addresses of the users*/
var addressSchema =  new Schema({
	
	address1 		: {type : String,required : true;},
	address2 		: {type : String,default : ''},
	city 			: {type : String,required : true},
	district 		: {type : String,required : true},
	state 			: {type : String,required : true},
	pincode 		: {type : Number,required : true},
	wardNo 			: {type : Number,required : true}
})


/*A user schema to store all its details*/
var UserSchema = new Schema({
	first_name		: {type : String ,default :'',required:true},
	middle_name		: {type : String ,default :''},
	last_name 		: {type : String ,default :''},
	aadhar_number 	: {type : Number,required : true,unique : true,
		min :[100000000000,'NOT VALID NUMBER RETRY!!'],
		max :[999999999999,'NOT VALID NUMBER RETRY!!'],                         
		validate :{
			validator : Number.isInteger,
			message : '{VALUE} is not a integer value',
		}
	},
	user_name 		: {type : String,required : true,unique : true},	
	email     		: {type : String ,
					   validate:{validator : validator.isEmail,
	                   message : '{VALUE} is not a valid email'},
	                   unique : true,required : true},
	                   
	password 		: {type : String , required : true },
	
	mobile 			: {type : Number,required : true,unique; true},
	
	address 		: [addressSchema],
	
	profession 		: {type : String,required : true},
	
	isBanned 		: {type : Boolean,default : false},
	
	group			: {type : Number,default : 8},
	{timestamps: true},
	
	dateofbirth 		:{type : Date , required : true},
	
	gender 			:{type : String , required : true}	
});

// Hashing password and protecting it from rainbow attack i.e maximum login limit
UserSchema.pre('save',function(next){
var user = this;
if(user.isModified('password')){
	
	bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(user.password,salt,(err,hash)=>{
			if(err){
				return next(err);
			}
			user.password=hash;
			next();    
	});
	});
	}
else
{
	next();
}
});
//var User = m
UserSchema.methods.comparePassword =  function(candidatePassword , cb){
	bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
		if(err)
			return cb(err);
		cb(null,isMatch);
	})
}
// User as a deconstructor will be added where-ever it will be used
var User = mongoose.model('User' , UserSchema);
module.exports = {
	User	
}
