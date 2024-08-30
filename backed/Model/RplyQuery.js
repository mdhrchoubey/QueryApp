// const replySchema = new mongoose.Schema({
//     queryId: String,
//     reply: String,
//     receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'NewSuer' },
//     sender: { type:String, required:true },
//     message: { type: String, required: true },
//     status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
//     // other reply fields...
//   });
  
//   const Reply = mongoose.model('Reply', replySchema);