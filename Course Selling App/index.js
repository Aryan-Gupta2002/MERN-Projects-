const express = require('express');
require("dotenv").config();
const {mongoose, get} = require('mongoose');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();

app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/vi/admin",adminRouter);

function authMiddleware (req,res,next){
    
}

async function dbConnect() {
    await mongoose.connect(process.env.MONGOCON)
    app.listen(3000);
}

dbConnect()