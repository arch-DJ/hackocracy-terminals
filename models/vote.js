var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var voteSchema = new Schema({
	"uid"	: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	"qid"   : {type:mongoose.Schema.Types.ObjectId, ref: 'Query'},
	"vote"	: {type:String,default:"none"}
})
mongoose.model("Vote",voteSchema,"vote");