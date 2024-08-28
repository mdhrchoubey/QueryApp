// backend/routes/auth.js
const express = require('express');
const router = express.Router();

const queryControl=require("../Controller/QueryController")

// send message
router.post('/sendMessage',queryControl.sendMessage );

//display Query
router.get("/displayQuery",queryControl.displayQuery)

//Staus
router.put('/display/:id', queryControl.statusdisplay);


module.exports = router;