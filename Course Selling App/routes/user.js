// const express = require('express');
// const router = express.Router;
// OR
const {Router} = require('express');
const userRouter =  Router();   //Router is a function
// userRouter is now used in main index.js

userRouter.post('/signup',function(req,res){
    res.json({
        msg:"signup endpoint"
    })
});
userRouter.post('/signin',function(req,res){
res.json({
        msg:"sign in endpoint"
    })
});
userRouter.get('/purchases',function(req,res){
res.json({
        msg:"purchased courses"
    })
});
module.exports ={
    userRouter:userRouter
};