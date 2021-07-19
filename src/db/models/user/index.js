const mongoose = require('mongoose');

const {Schema} = mongoose;

const userScheme = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('users', userScheme);
