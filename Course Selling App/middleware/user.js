const jwt = require("jsonwebtoken");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function userAuth(req,res,next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token,JWT_USER_SECRET);
    if(decodedInfo){
        req.userId = decodedInfo.id;
        next();
    }else{
        res.status(403).json({
            msg:"Wrong Credentials"
        })
    }
}

module.exports={
    userAuth:userAuth
}   