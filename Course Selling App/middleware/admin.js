const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminAuth(req,res,next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token,JWT_ADMIN_SECRET);
    if(decodedInfo){
        req.creatorID = decodedInfo.id;
        next();
    }else{
        res.status(403).json({
            msg:"Wrong Credentials"
        })
    }
}

module.exports={
    adminAuth:adminAuth
}