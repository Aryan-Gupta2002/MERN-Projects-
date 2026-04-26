const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email : {type:String,unique:true},
    password : String,
    f_name : String,
    l_name : String
})

const Admin = new Schema({
    email : {type:String,unique:true},
    password : String,
    f_name : String,
    l_name : String
})

const Course = new Schema({
    title: String,
    description :String,    
    price : Number,
    imageURL: String,
    creatorId : ObjectId
})

// const Purchase = new Schema({
//     courseId : ObjectId,
//     userId : ObjectId
// })

// Referencing
const Purchase = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course"   
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"     
    }
});

const userModel = mongoose.model('users',User);
const adminModel = mongoose.model('admin',Admin);
const courseModel = mongoose.model('course',Course);
const purchaseModel = mongoose.model('purchase',Purchase);

module.exports={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}