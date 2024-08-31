const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.connect("mongodb://localhost:27017/FinalTouch", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


const app = express();
app.use(bodyParser.json());
app.use(cors()
);


const userRoute=require("./Routes/UserRoute")
app.use("/user", userRoute)

const Query=require("./Routes/QueryRoute")
app.use("/query", Query)

app.get("/", (req, res)=>{
    res.send("welcome")
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));