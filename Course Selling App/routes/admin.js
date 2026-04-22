const {Router} = require('express');
const adminRouter = Router();
const {z} = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { adminModel } = require('./db');

adminRouter.post('/course/signup',async function(req,res){
    // Input VAlidation Start using zod ------ 
    const requiredInputBody = z.object({
        email:string().email().min(3).max(30),
        password:string().min(5).max(30),
        f_name:string().min(3).max(30),
        l_name:string().min(3).max(30)
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
        const hashedPass = bcrypt.hash(password,5);
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
adminRouter.post('/course/signin',function(req,res){

    res.json({
            msg:"sign in endpoint"
    })
});
adminRouter.post('/course/',function(req,res){
    res.json({
            msg:"course creation"
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