const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');
// const multer =require("multer")
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mdhrchoubey@gmail.com',
//     pass: '123456789'
//   }
// });
const signup=async (req, res) => {
    const { email, name, role, gender, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email});
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      //Hashed Password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create new user
      const newUser = await User({ 
       email:email,
       name:name,
       role:role,
       gender:gender,
       password:hashedPassword,
    });
       newUser.save();

       const token = jwt.sign({ userId: newUser._id }, 'secretKey', { expiresIn: '1h' });
      res.json({ token });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const login = async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Login successful, return a success message or a token
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const displayTeacher= async (req, res)=>{
    const user = await User.find({role:"teacher"})
    res.status(200).json(user);
  }

  const displayStudent= async (req, res)=>{
    const user = await User.find({role:"student"})
    res.status(200).json(user);
  }

  const profile=async (req, res) => {
    try {
     
      const user = await User.findOne({user: req.user.id});
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };


  const forgetPassword=async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      // In a real application, you would send this token via email
      // For this example, we'll just send it in the response
      res.json({ 
        message: 'Password reset token generated. In a real application, this would be sent via email.',
        resetToken: resetToken
      });
    } catch (error) {
      console.error('Error in forget password:', error);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  }

  const resetPassword = async (req, res) => {
    const { email, resetToken, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        email,
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user's password and clear reset token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Error in reset password:', error);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  };

  const displayAllUser= async (req, res)=>{
    const user = await User.find()
    res.status(200).json(user);
  }

  const resetPasswordAdmin=async(req, res)=>{
    const usermail  = req.body.email;
  
    try {
      const user = await User.findOne({ email:usermail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      // In a real application, you would send this token via email
      // For this example, we'll just send it in the response
      res.json({ 
        message: 'Password reset token generated. In a real application, this would be sent via email.',
        resetToken: resetToken
      });
    } catch (error) {
      console.error('Error in forget password:', error);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }

    const { email, resetToken, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        email,
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user's password and clear reset token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Error in reset password:', error);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  }
  

module.exports={
    signup,
    login,
    displayTeacher,
    displayStudent,
    profile,
    forgetPassword,
    resetPassword,
    displayAllUser,
    resetPasswordAdmin
    // picture
}


// const signup=async (req, res) => {
//     const name=req.body.name;
//     try {
//         const user = new User({ 
//             name:name
//         });
//         await user.save();
//         res.status(201).send('User created');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };

//   const picture=async (req, res)=>{
//         // const { password, confirmPassword } = req.body;
//         // if (password !== confirmPassword) {
//         //   return res.status(400).json({ error: 'Passwords do not match' });
//         // }
      
//         // update student data in database
//         const student = { name: 'John Doe', email: 'john.doe@example.com' };
//         student.profilePic = req.file.filename;
      
//         // hash password
//         // const hashedPassword = bcrypt.hashSync(password, 10);
//         // student.password = hashedPassword;
      
//         res.json(student);
//       }


// const signup=async (req, res) => {
//     const email  = req.body.name;
//     try {
//         const data = await new User.create({ email:email});
//         res.status(201).send('User created');
//         res.send("data save")
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };









    