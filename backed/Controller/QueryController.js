

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

module.exports={
    sendMessage,
    displayQuery,
    statusdisplay
}