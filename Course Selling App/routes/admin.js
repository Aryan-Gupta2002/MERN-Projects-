const {Router} = require('express');
const adminRouter = Router();
const {z} = require('zod');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const { adminModel} = require('./db');
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const{adminAuth}=require('../middleware/admin')

adminRouter.post('/course/signup',async function(req,res){
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
        await adminModel.create({
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
adminRouter.post('/course/signin',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    // Check if User exists
    const ifAdmin = await adminModel.findOne({
        email:email
    })
    if (!ifAdmin){
        res.status(403).json({
            msg:"Invalid Credentials"
        })
        return;
    }
    //Matching Passwords
    const passwordMatch =await bcrypt.compare(password,ifAdmin.password);
    if (passwordMatch){
        const token = jwt.sign({
            id: ifAdmin._id.toString()
        },JWT_ADMIN_SECRET);
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
adminRouter.post('/course/',adminAuth,async function(req,res){
    const adminId = req.creatorID;
    const {title,description,price,imageURL}=req.body;
    const course =await courseModel.create({
        title,description,price,imageURL,
        creatorId:adminId
    })
    res.json({
        msg;"Course created"
        courseId;course._id
    })
});
adminRouter.put('/course/',function(req,res){
    res.json({
            msg:"course update"
    })
});
adminRouter.get('/course/bulk',function(req,res){
    res.json({
            msg:"get all courses"
    })
});
module.exports ={
    adminRouter:adminRouter
};