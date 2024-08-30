const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');

const nodemailer = require('nodemailer');
const crypto = require('crypto');




  ///////////////// Register Profile  ////////////////////////////////////

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
      res.json({ 
          message: 'Login successful', token});

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  ///////////////// Login Profile    ////////////////////////////////////
  const login = async (req, res) => {
    const { email, password, role, } = req.body;
    
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
      // Login successful, return a success message or a token
      res.json({ message: 'Login successful',
        email: user.email,
        role: user.role,
        name:user.name,
        gender:user.gender,
        role:user.role,
        id:user._id,
        ImagePath:user.imagePath,
        password:user.password,
        token
      });
   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  ///////////////// Tacher List  ////////////////////////////////////
  const displayTeacher= async (req, res)=>{
    const user = await User.find({role:"teacher"})
    res.status(200).json(user);
  }

    ///////////////// Student List ////////////////////////////////////

  const displayStudent= async (req, res)=>{
    const user = await User.find({role:"student"})
    res.status(200).json(user);
  }

    ///////////////// Profile Display  ////////////////////////////////////

  const profile=async (req, res) => {
    const username = req.params.username;
    try {
      const user = await User.findOne({ name: username });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching user profile' });
    }
  }

    ///////////////// Profile Update ////////////////////////////////////

  const profileUpdate= async (req, res)  => {
    try {
      const { userName } = req.params;
      const { name, email } = req.body;
      
      let updateData = { name, email };
      
      if (req.file) {
        updateData.imageUrl = `/uploads/${req.file.filename}`;
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { userName },
        updateData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  }

  ///////////////// Forget Password////////////////////////////////////

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

  ///////////////// Reset Password   ////////////////////////////////////

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


  ////////////////////////// Change Password /////////////////////////////////


  const Changepassword=async (req, res) => {
    // const email=req.params;
    const {name }=req.body;
    const {currentPassword, newPassword}=req.body;
    try{
      const user=await User.findOne({name})
      console.log(user)
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        console.log({
        message: 'Incorrect current password',
      })
      return res.status(401).json({ message: 'Incorrect current password' });
      
      
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    console.log({
      message: 'Password has been changed successfully',
    })

    res.json({ message: 'Password has been changed successfully'});
    

    }

    catch{
      res.status(404).json({message:"User not found"})
    }
   
  };



    /////////////////  Display All User List  ////////////////////////////////////

  const displayAllUser= async (req, res)=>{
    const user = await User.find()
    res.status(200).json(user);
  }

    ///////////////// Reset Password by Admin ////////////////////////////////////

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
  
    ///////////////// Export Logics                //////////////////////////////////////////////////////////

module.exports={
    signup,
    login,
    displayTeacher,
    displayStudent,
    profile,
    forgetPassword,
    resetPassword,
    displayAllUser,
    resetPasswordAdmin,
    profileUpdate,
    Changepassword
    // picture
}







