

const Message = require('../Model/Query');
const UserModel = require('../Model/UserModel');

const sendMessage=async(req, res) => {
    try {
      const { sender, receiver, message } = req.body;
      const newMessage = new Message({ sender:sender, receiver, message })
      await UserModel.findByIdAndUpdate(receiver._id, {$push:{receiver:receiver._id}})
      await newMessage.save();
      res.json({ message: 'Message sent successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error sending message' });
    }
  }
  const displayQuery=async(req, res)=>{
    try {
      const query = await Message.find();
      res.json(query);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving messages' });
    }

  }

  const statusdisplay = async (req, res) => {
    try {
        const todo = await Message.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
  
        todo.status = req.body.status || todo.status;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const reply = async (req, res) => {
  try {
    const { reply } = req.body;
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.reply = reply || message.reply;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// const Rply=async (req, res)=>{
  
//     try {
//       const RplyMessage=req.body;
//         const newRply = await Message.findById(req.params.id);
//         if (!newRply) {
//             return res.status(404).json({ message: 'Todo not found' });
//         }
  
//         todo.reply = req.body.reply || todo.reply;
//         const updatedTodo = await todo.save();
//         res.json(updatedTodo);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }

module.exports={
    sendMessage,
    displayQuery,
    statusdisplay,
    reply
}