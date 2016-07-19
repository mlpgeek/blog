var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var PostSchema = new Schema({
	postNum: {
		type: Number,
		require: true,
		unique: true	
	}, 
	title:{ 
		type: String,
		require: true,
	},
	published:{ 
		type: Date,
		default: Date.now
	},
	content: String,
	/*published: {
		type: Schema.ObjectId,
		ref: 'User'
	}*/
	//comments : { type: Schema.ObjectId, ref: 'Comment'}
});

mongoose.model('Post', PostSchema);
