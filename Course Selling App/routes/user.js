// const express = require('express');
// const router = express.Router;
// OR
const {Router} = require('express');
const userRouter =  Router();   //Router is a function
// userRouter is now used in main index.js
const {z} = require('zod');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const {userModel,purchaseModel, courseModel} = require('./db');
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const{userAuth}=require('../middleware/user');
const { default: mongoose } = require('mongoose');

userRouter.post('/signup',async function(req,res){
    // Input VAlidation Start using zod ------ 
        const requiredInputBody = z.object({
            email:z.string().email().min(3).max(30),
            password:z.string().min(5).max(30),
            f_name:z.string().min(3).max(30),
            l_name:z.string().min(3).max(30)
        })
        const parsedData = requiredInputBody.safeParse(req.body);
        if(!parsedData.success){
            res.json({
                msg:"Input is in Incorrect format",
                error:parsedData.error
            })
            return;
        }
        //------Input Validation End
        const email = req.body.email;
        const password = req.body.password;
        const f_name = req.body.f_name;
        const l_name = req.body.l_name;
        let errCaught = false;
        try{
            //Hashing Password Start -----
            const hashedPass = await bcrypt.hash(password,5);
            // Adding User to adminModel collection -----
            await userModel.create({
                email:email,
                password:hashedPass,
                f_name:f_name,
                l_name:l_name
            })
        }catch(e){
            res.json({
                msg:"User already exists"
            })
            errCaught = true 
        }
        if(!errCaught){
            res.json({
                msg:"You have signed up"
            })
        }
});
userRouter.post('/signin',userAuth,async function(req,res){
        const email = req.body.email;
        const password = req.body.password;
        // Check if User exists
        const ifUser = await userModel.findOne({
            email:email
        })
        if (!ifUser){
            res.status(403).json({
                msg:"Invalid Credentials"
            })
            return;
        }
        //Matching Passwords
        const passwordMatch =await bcrypt.compare(password,ifUser.password);
        if (passwordMatch){
            const token = jwt.sign({
                id: ifUser._id.toString()
            },JWT_USER_SECRET);
            // We can do cookie logic here
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                msg: "You are entering wrong credentials"
            })
        }
});
userRouter.get('/purchases',userAuth,async function(req,res){
    const userId = new mongoose.Types.ObjectId(req.userId);
    const courses = await purchaseModel.find({
        userId:userId
    }).populate("courseId");
    if(!courses.length)(
        res.json({
            msg:'You have not purchased any course'
        })
    )
    // Below is one way of getting data about purhased courses, however we will try referencing now
    // const courseData = await courseModel.find({
    //     _id: {$in : courses.map(x=>x.courseId)}
    // })

    res.json({
        courses
        // courses,
        // courseData
    })
});
module.exports ={
    userRouter:userRouter
};