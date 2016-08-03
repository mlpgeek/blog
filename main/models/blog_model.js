var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: {type: String, required: true},
    posts: [{type: Schema.ObjectId, ref: 'Post'}]
});


var BlogSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    createdAt: {type: Date, default: Date()},
    createdBy: {type: Schema.ObjectId, ref: 'User'},
    categories: [CategorySchema]
});


mongoose.model('Blog', BlogSchema);
