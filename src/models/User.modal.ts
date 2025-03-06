//mongoose btt krta hai mongo db se
import mongoose, { Document, Schema } from 'mongoose'; //



//Document is liye lgaya hai kyuki hm yha typesafety use krre hain or yha hmne typescrypt use kra hai 
//agr hm javascript use krre hain yo koi zrurt ni hai likhne ki


//ab jb bhi hm typescript use krte hain to hm data ka type define krte hain to uske liye interface 1 bht common data type hai
export interface Message extends Document{ //ye custom data type hai jo hmne bnaya hai jaise hm int mai int likhte hain waise hi messageSchema mai hm ye follow krege

    content : string ;  // jo mera message ka content hoga ya jo mera message hoga wo string hoga
    createdAt: Date
}

// const MessageSchema = new Schema({}) // hm ise follow krte hain lekin hmne ab upar 1 data type bna liya hai to asie ni krenge

const MessageSchema : Schema<Message> = new Schema({  
    content :{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required : true,
        default:Date.now

    }
})

export interface User extends Document{ //same jaise hmne messageSchema bnaya hai waise hi userSchema bnaya hai
    userName : string ;  
    email: string;
    password : string;
    verifyCode : string;
    verifyCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingFeedback : boolean;
    messages:Message[]
}
const UserSchema : Schema<User> = new Schema({ 
    userName :{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type: String,
        required : true,
        unique:true,
        trim:true,
        match:[/.+\@.+\..+/,'Please fill a valid email address']

    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifyCodeExpiry:{
        type:Date,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingFeedback:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema) //agr user model already exist krta hai to usko use krlo wrna naya model bnado

export default UserModel; //export krne ke liye