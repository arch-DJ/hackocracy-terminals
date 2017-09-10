var mongoose = require('mongoose')
var Schema = mongoose.Schema
var replySchema = new Schema({
	"aid"    	: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	"uid"		: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	"qid"		: {type:mongoose.Schema.Types.ObjectId, ref: 'Query'},
	"reply"		: {type:String,required:true}
})

mongoose.model("Reply",replySchema,"reply")