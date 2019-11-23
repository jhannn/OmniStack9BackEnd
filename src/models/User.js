const mongoose = require('mongoose');

// Usar os tipos primitivos do Js
//  String
//  Number
//  Boolean
//  etc
const UserSchema = new mongoose.Schema({
    email: String
});

module.exports = mongoose.model('User', UserSchema);