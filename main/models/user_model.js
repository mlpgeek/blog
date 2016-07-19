var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
        firstname: String,
	    lastname : String,
    	email : {
            type: String,
            unique: true
        },
    	password : String
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) throw err; 
        callback(null, isMatch);
    });
};

mongoose.model('User', UserSchema);
