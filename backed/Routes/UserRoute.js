// backend/routes/auth.js
const express = require('express');
const router = express.Router();

const authControl=require("../Controller/UserController")

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
router.get("/profile/:email",authControl.profile)

//Display All User
router.get("/displayAllUser",authControl.displayAllUser)

// //Picture
// router.put("/picture", authControl.picture)

module.exports = router;
