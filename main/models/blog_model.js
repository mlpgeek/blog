var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    createdAt: {type: Date, default: Date()},
    modifiedAt: Date,
    createdBy: {type: Schema.ObjectId, ref: 'User'},
    categories: [{
        title: {type: String, },
        description: String,
        posts: [{type: Schema.ObjectId, ref: 'Post'}]
    }],
});


mongoose.model('Blog', BlogSchema);
