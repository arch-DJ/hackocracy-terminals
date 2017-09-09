'use strict'
var mongoose = require('mongoose');
var comment =mongoose.model('Comment');
var insertComment = function(req,callback){
var newComment = comment({
comment : req.body.comment,
queryid : req.body.admin,
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
if(!result){
return callback({"data":null});
}
callback({"data":result});
},(err)=>{
console.log("some Error occurred");
});
};

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
