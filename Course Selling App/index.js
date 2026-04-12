const express = require('express');
const {mongoose, get} = require('mongoose');
mongoose.connect("");
const jwt = require('jsonwebtoken');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const JWT_SECRET = "";
const app = express();

app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/vi/admin",adminRouter);

app.listen(3000);
