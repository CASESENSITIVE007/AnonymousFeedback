//ye 1 function hai jo email send krega "resend email" yha hmne use kra hai

import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmails(
    email: string,
    username:string,
    verifyCode:string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({  
        from: 'Acme <onboarding@resend.dev>', //free walo ko yhi email milta hai 
        to: [email],
        subject: "Verify your email address",
        react: VerificationEmail ({username:username , otp:verifyCode } ), //ye hamara component hai ismai hmne props pss krdiye 
       
    });
    return {
      success: true,
      message: "verification email send successfully",
    };
    
   
     } catch (error) {
    console.error("Failed to send verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}