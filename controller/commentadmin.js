'use strict'
var mongoose = require('mongoose');
var comment =mongoose.model('CommentAdmin');
var insertComment = function(req,callback){
var newComment = comment({
	comment : req.body.comment,
	adminid : req.body.admin,
	userid  : req.user._id
});
newComment.save().then((result)=>{
console.log("Data inserted into the comment admin database");
callback({"res":true})
},(err)=>{
console.log("Data not insertComment");
callback({"res":false})
});
};
var getAllCommentByAdmin = function(req,callback){
	comment.find({"adminid":req.params.mid}).then((result)=>{
		console.log("result is " + result)
	if(!result){
		return callback({"data":null});
	}
	//callback({"data":result});
	},(err)=>{
		console.log("some Error occurred");
	});
};

var getAllCommentByAdmin = function(req,callback){
	comment.find({"adminid":req.params.mid},function(err,data){
		if(err)
			throw err
		else{

		}
	}).populate("userid").exec(function(err,data){
		if(err)
			throw err
		else{
			callback({"data":data}) 
		}
	})
}

var countComments = function(req,callback){
  comment.count({}, function( err, count){
        console.log( "Number of comments: ", count );
        callback({"data":count});
    });  
};

//Create count comments API
module.exports = {
    insertComment,
    getAllCommentByAdmin,
    countComments
}
