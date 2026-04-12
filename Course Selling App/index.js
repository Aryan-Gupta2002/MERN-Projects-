const express = require('express');
const {mongoose, get} = require('mongoose');
mongoose.connect("");
const jwt = require('jsonwebtoken');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const JWT_SECRET = "";
const app = express();

app.use(express.json());
app.use("/user",userRouter);
app.use("/course",courseRouter);


app.listen(3000);
