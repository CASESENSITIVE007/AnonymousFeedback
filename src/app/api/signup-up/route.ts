// yha hm api likhenge jo signup ke liye hogi
// next mai api naam se folder bnta hai route hoga uska naam
// phr usme ek file bnti hai jiska naam route.ts hota hai


// ye aise kaam krta hai api/signup-up/ 
// phr jb user signup krta hai to uska data yha aata hai
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.modal";
import bcrypt from "bcryptjs";
import { sendVerificationEmails } from "@/helpers/sendVerificationEmails";


export async function POST(request:Request){
    await dbConnect();
    try {
      const {username,email,password}  =  await request.json();  //ye hm form se uthare hain
      const verifyCode =  Math.random().toString().slice(2,8)
     const existingUserVerifiedByUsername= await  UserModel.findOne({
        username,
        isVerified:true
        // ye dono cond and ki trh chlri hain
      })
      if(existingUserVerifiedByUsername){
            return Response.json({
                message:"username already exists",
                success:false
            },
            {
                status:400
            })
        }

      const existingUserByEmail= await  UserModel.findOne({ // ye existingUserByEmail 1 object dera hai usermodel ka jismai isverified prop hai jo hmne neeche use kri hai
            email,
        })
        if(existingUserByEmail)
            {
           if(existingUserByEmail.isVerified){
            return Response.json({
                success:false,
                message:"User is already exist with this email"
            },{status:400})
           }
           const hashedPassword = await bcrypt.hash(password,12)
           existingUserByEmail.password = hashedPassword;
           existingUserByEmail.verifyCode=verifyCode;
           existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
           await existingUserByEmail.save()

           
        }

// yha hm tb phnchenge jb hme email bhi na mile or na hme username bhi ni mila 
        else{
            const hashedPassword= await bcrypt.hash(password,12);
           
            const expiryDate = new Date();//ye usermodel mai hai token expire kine ke liye
            expiryDate.setHours(expiryDate.getHours()+1);
            const newUser= new UserModel({
                    username : username,
                    email: email,
                    password : hashedPassword,
                    verifyCode, // ye otp dega string mai
                    verifyCodeExpiry : expiryDate,
                    isVerified : false,
                    isAcceptingFeedback : true,
                    messages:[]
            }
        )
        

            await newUser.save();  // ye hmne user ko save kra diya hai database mai 
         
        }
        //send verification email 
        const emailResponse=  await sendVerificationEmails(email,username,verifyCode);
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
        }

        return Response.json({
            success:true,
            message:"User Registered Successfully.Please Verify you email"
        },{status:200})



    } catch (error) {
        console.log("error registering user",error); //ye hme terminal pr error show krega
        return Response.json({
            message:"error registering user",error,
            success:false
        }), // ye hme client pr error show krega (frontend pr)
        {
            status:500
        }
            
    }
}