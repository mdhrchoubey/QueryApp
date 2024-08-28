// backend/models/User.js
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

mongoose.userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name:{type:String, required:true},
    // standard:{type:String, required:true},
    role: { type: String, enum: ['student', 'teacher'], required: true },
    gender:{type:String, gen:['male', 'female'], required:true, required:true},
    password: { type: String, required: true },
    // sender: { type: mongoose.Schema.Types.ObjectId, ref: 'query' },
    resetPasswordToken: String,
  resetPasswordExpires: Date
}); 



module.exports = mongoose.model('NewSuer', mongoose.userSchema);