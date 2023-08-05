import mongoose from "mongoose";
let {Schema,model} = mongoose
let UserSchema = new Schema({
    firstname : {
        type : String,
        required : true,
        min : 3,
        max : 20
    },
    lastname : {
        type : String,
        required : true,
        min : 3,
        max : 20
    },
    username : {
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 20
    },
    password : {
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 20
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    profile : {
        type : String,
        default : 'https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

}, { timestamps : true })
export default model('user',UserSchema);
