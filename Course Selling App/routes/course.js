const {Router} = require('express');
const { userAuth } = require('../middleware/user');
const { mongoose } = require('mongoose');
const { purchaseModel, courseModel } = require('./db');
const courseRouter = Router();

courseRouter.get('/preview',async function(req,res){
    const allCourses =await courseModel.find({});
    res.json({
        allCourses
    })
});
courseRouter.post('/purchase',userAuth,async function(req,res){
    const userId = new mongoose.Types.ObjectId(req.userId);
    const creatorId = req.body.creatorId;
    // Ideally we check for payment before purchasing course, it was not added to keep things simple for now
    await purchaseModel.create({
        userId,
        creatorId
    })
    res.json({
        msg:"You have successfuly bought the course"
    })
});
module.exports={
    courseRouter:courseRouter
};