// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User=require("../Model/UserModel")
const bcrypt = require('bcryptjs');

const multer = require('multer');
const authControl=require("../Controller/UserController")
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5 // limit file size to 5MB
  }
});


// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });





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

// //Profile pic
// router.get('profile-pic/:userName', async(req, res)=>{
//   const userName=req.body
//   const user = await User.findOne(userName);
  

// })


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

  //profile pic
  router.get('/profileheader/:userName', async (req, res) =>{
    const userName=req.params;
    const {role, gender}=req.body
    // console.log(userName)
    const user=await User({name:userName,
      role:role,
      gender:gender

    });
    // console.log({
    //  userName
    // })
  } );


  // Change password 
router.post("/changePassword", authControl.Changepassword)


router.post('/reset-password', async (req, res) => {
  const { newPassword, passid } = req.body;
  try {
 const user=await User.findById(passid)

  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }

  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // In a real application, you'd update the password in your database here
    user.password = hashedPassword;

    await user.save();

    console.log(hashedPassword)
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
});






module.exports = router;
