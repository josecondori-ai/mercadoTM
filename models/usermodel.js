import mongoose, { model } from "mongoose";

let userScheme=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date

})

export default model('User',userScheme)
// export default User,userScheme
// module.exports=mongoose('User',userScheme)