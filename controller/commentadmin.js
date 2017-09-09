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
console.log("data inserted into the comment admin database");
},(err)=>{
console.log("data not insertComment");
});
};
var getAllCommentByQuery = function(req,callback){
comment.find({"adminid":req.params.mid}).then((result)=>{
if(!result){
return callback({"data":null});
}
callback({"data":result});
},(err)=>{
console.log("some Error occurred");
});
};
