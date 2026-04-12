const {Router} = require('express');
const adminRouter = Router();

adminRouter.post('/signup',function(req,res){
    res.json({
        msg:"signup endpoint"
    })
});
adminRouter.post('/signin',function(req,res){
    res.json({
            msg:"sign in endpoint"
    })
});
adminRouter.post('/course',function(req,res){
    res.json({
            msg:"course creation"
    })
});
adminRouter.put('/course',function(req,res){
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