

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


const reply=async (req, res) => {
  try {
    const { queryId, reply } = req.body;

    // Validate input
    if (!queryId || !reply ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the query and update it
    const updatedQuery = await Message.findByIdAndUpdate(
      queryId,
      { 
        $set: { 
          reply: reply,
          repliedAt: new Date(),
          status:"completed"
        }
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.json({
      updatedQuery,
      
    });

  } catch (error) {
    console.error('Error in /query/reply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


module.exports={
    sendMessage,
    displayQuery,
    statusdisplay,
    reply
}