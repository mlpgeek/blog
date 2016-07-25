var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var PostSchema = new Schema({
    title: {type: String, required: true},
    content: String,
    createdAt: {type: Date, default: Date.now},
    modifiedAt: Date,
    createdBy: {type: ObjectId, ref: 'User'},
});

mongoose.model('Post', PostSchema);
