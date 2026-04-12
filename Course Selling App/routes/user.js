// const express = require('express');
// const router = express.Router;
// OR
const {Router} = require('express');
const userRouter =  Router();   //Router is a function
// userRouter is now used in main index.js

userRouter.post('/signup',function(req,res){

});
userRouter.post('/signin',function(req,res){

});
userRouter.get('/purchases',function(req,res){

});
module.exports ={
    userRouter:userRouter
};