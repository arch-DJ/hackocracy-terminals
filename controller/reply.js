var mongoose = require("mongoose")
var replyModel = mongoose.model("Reply")

exports.insert = function(req){
	console.log("////////////////////////////")
	console.log(req.user)
	new replyModel({
		"aid"	: req.user._id,
		"uid"	: req.body.uid,
		"qid"	: req.body.qid,
		"reply"	: req.body.reply
	}).save((err)=>{
		if(err)
			throw err
		else{
			console.log("reply sent");
		}
	})
}

exports.getPopulatedReply = function(req,callback){
	replyModel.find({"uid":req.user._id}).populate("aid").populate("qid").exec((err,data)=>{
		if(err)
			throw err
		else{
			callback({"data":data});
		}
	})
}