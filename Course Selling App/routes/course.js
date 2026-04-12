const {Router} = require('express');
const courseRouter = Router();

courseRouter.get('/preview',function(req,res){
    res.json({
        msg:"preview courses"
    })
});
courseRouter.post('/purchase',function(req,res){
    res.json({
        msg:"purchasing"
    })
});
module.exports={
    courseRouter:courseRouter
};