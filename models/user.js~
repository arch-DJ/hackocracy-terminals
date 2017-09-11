/*'use strict'
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcryptjs');
//const validator = require("validator");

//require('mongoose-type-email');
//var SALT_WORK_FACTOR = 15;

/*Schema to store the addresses of the users*/
/*var addressSchema =  new Schema({
	
	
})


/*A user schema to store all its details*/
/*var UserSchema = new Schema({
	first_name		: {type : String ,default :'',required:true},
	middle_name		: {type : String ,default :''},
	last_name 		: {type : String ,default :''},
	aadhar_number 	: {type : Number,unique : true,
		min :[100000000000,'NOT VALID NUMBER RETRY!!'],
		max :[999999999999,'NOT VALID NUMBER RETRY!!'],                         
		validate :{
			validator : Number.isInteger,
			message : '{VALUE} is not a integer value',
		}
	},
	user_name 		: {type : String,unique : true},	
	email     		: {type : String},
	                   
	password 		: {type : String}
	
	mobile 			: {type : Number,unique: true},
	
	address 		: [addressSchema],
	
	profession 		: {type : String},
	
	isBanned 		: {type : Boolean,default : false},
	
	group			: {type : Number,default : 8},
	
	dateofbirth 		:{type : Date ,},
	
	gender 			:{type : String ,}	
});

// Hashing password and protecting it from rainbow attack i.e maximum login limit
/*UserSchema.pre('save',function(next){
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
		next();
});
//var User = m
UserSchema.methods.comparePassword =  function(candidatePassword , cb){
	bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
		if(err)
			return cb(err);
		cb(null,isMatch);
	})
}*/
// User as a deconstructor will be added where-ever it will be used
/*var User = mongoose.model('User',UserSchema,'user');*/





var mongoose = require('mongoose')
const bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email 			: {type:String},
	password 		: {type:String},
	first_name		: {type : String ,default :'',required:true},
	middle_name		: {type : String ,default :''},
	last_name 		: {type : String ,default :''},
	user_name 		: {type : String,unique : true},	
	
	mobile 			: {type : Number,unique: true},
	
	profession 		: {type : String},
	
	gender 			: {type : String},
	address1 		: {type : String},
	address2 		: {type : String,default : ''},
	city 			: {type : String},
	district 		: {type : String},
	state 			: {type : String},
	pincode 		: {type : Number},
	wardNo 			: {type : Number},
	group			: {type:Number,default:2},
	isBanned		: {type:Boolean,default:false}			
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User',userSchema,'users');