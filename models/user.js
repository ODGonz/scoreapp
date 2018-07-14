const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}

module.exports.deleteUser = function(submittedUserID, callback){
    User.findByIdAndRemove(submittedUserID, callback);
}

module.exports.updateScore = function(submittedUserID, score, callback){
    User.findByIdAndUpdate(submittedUserID, {$inc: {score: score}}, callback);
}