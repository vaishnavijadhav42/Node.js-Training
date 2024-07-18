import {Schema,model,Document} from "mongoose";

interface User extends Document {
    name:String,
    email:String,
    contact:String
}

const userSchema=new Schema<User>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
}, { versionKey: false }); 

const userModel=model<User>('User',userSchema);
export default userModel;