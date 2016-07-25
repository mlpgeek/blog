var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
        name: {type: String, required: true, trim: true},
        username : {type: String, required: true, unique: true}, 
    	email : {
            type: String,
            unique: true,
            trim: true
        },
        followers: [{type: Schema.ObjectId, ref: 'User'}],
        subscribe: [{type: Schema.ObjectId, ref: 'Blog'}],
        signupAt: {type: Date, default: Date()},
    	password : String
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) throw err; 
        callback(null, isMatch);
    });
};

mongoose.model('User', UserSchema);
