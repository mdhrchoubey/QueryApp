// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User=require("../Model/UserModel")
const multer = require('multer');
const authControl=require("../Controller/UserController")
const path = require('path');



// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });





// Sign-up route
router.post('/signup',authControl.signup );

// Login route
router.post('/login', authControl.login);

//Forget password
router.post('/forgetpassword', authControl.forgetPassword);

//Reset password
router.post("/resetpassword", authControl.resetPassword)

// Reset Password by Admin
router.post("/resetPasswordAdmin", authControl.resetPasswordAdmin)

//DisplayTeacher
router.get("/displayTeacher",authControl.displayTeacher)

//Display Student
router.get("/displayStudent",authControl.displayStudent)

//Profile
// router.get("/profile/:username",authControl.profile)

//Display All User
router.get("/displayAllUser",authControl.displayAllUser)

//Profile Update
// router.put("/profileupdate/:username", authControl.profileUpdate)



router.get('/profile/:userName', async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.userName });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put('/profileupdate/:userName', upload.single('image'), async (req, res) => {
    try {
      const { name, email } = req.body;
      const updateData = { name, email };
  
      if (req.file) {
        updateData.imagePath = req.file.path;
      }
  
      const user = await User.findOneAndUpdate(
        { name: req.params.userName },
        updateData,
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        user,
        message: 'Profile updated successfully',
        imagePath: user.imagePath,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  





module.exports = router;
