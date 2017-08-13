var mongoose = require ('mongoose');

var Schema = mongoose.Schema;
require('mongoose-type-email');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
var userSchema = new Schema({
	first_name: {
		     type : String ,
	       	     default :'', 
		     required:true
	            },
	middle_name: {
		     type : String ,
	             default :'' 
	             },
	last_name : {
		     type : String ,
	             default :''
	            },
        aadhar_number : {
                        type : Number,
                        required : true,
                        unique : true,
                        min :[1000000000000000,'NOT VALID NUMBER RETRY!!'],
                        max :[9999999999999999,'NOT VALID NUMBER!! RETRY'],                         
                        validate :{
                                validator : Number.isInteger,
                                message : '{VALUE} is not a integer value',
                        }
                        
                        },
        user_name :{
                   type : String,
                   required : true,
                   unique : true
                   },	
        email : {
                work : mongoose.SchemaTypes.Email,required:'true',
                home : mongoose.SchemaTypes.Email,
                unique : true,
                required : 'Email address is required'
                },
        password :{type : String , required : true },
        mobile :{
                type : Number,
                required : true,
                unique; true
                },
        address1 : {
                   type : String,
                   required : true;
                   },
        address2 : {
                    type : String,
                    default : ''
                    },
        city :{
               type : String,
               required : true
                },
        district :{
                type : String,
                required : true
                },
       state :{
                type : String,
                required : true
              },
       profession :{
                    type = String,
                    required : true
                    }
       isBanned :{
                  type :Boolean,
                  default : false
                 }
       time_created : {
                        type : Date,
                        default : Date.now
                      }
});
// use of password hashing and "USE OF MAXIMUM LOGIN LIMIT REMAINING"
userSchema,pre(save,function(next){
        var user = this;
        if(!user.isModified('password')) return next();
        //generation of a salt 
        bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
                if(err) return next(err);
                // hash password using new salt
                bcrypt.hash(user.password , salt , function (err , hash){
                        if(err) return next (err);
                        //overide the passwerd with hashed one
                        user.password = hash;
                        next();
                });
        });
        
});
UserSchema,methods.comparePassword = function(candidatePassword , cb){
        bcrypt.compare(candidatePassword, this.password , function (err,isMatch){
                if(err) return cb(err);
                cb(null, isMatch);
                });
        });
module.exports = mongoose.model(user , userSchema);