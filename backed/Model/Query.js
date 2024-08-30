
const mongoose = require('mongoose');


mongoose.userSchema = mongoose.Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'NewSuer' },
    sender: { type:String, required:true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    reply:{type:String,}
}); 



module.exports = mongoose.model('query', mongoose.userSchema);