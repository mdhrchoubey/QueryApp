// backend/models/User.js
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

mongoose.userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name:{type:String, required:true},
    imagePath:{type:String},
    role: { type: String, enum: ['student', 'teacher'], required: true },
    gender:{type:String, gen:['male', 'female'], required:true, required:true},
    password: { type: String, required: true },
    resetPasswordToken: String,
  resetPasswordExpires: Date
}); 



module.exports = mongoose.model('NewSuer', mongoose.userSchema);