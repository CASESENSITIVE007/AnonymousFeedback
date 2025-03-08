import {z} from 'zod';
export const usernameValidation = z.string().min(3,"Username must be atleast 3 characters").max(20,"Username must be atmost 20 characters");
export const emailValidation = z.string().email("Please fill a valid email address");
export const passwordValidation = z.string().min(6,"Password must be atleast 6 characters").max(20,"Password must be atmost 20 characters");

export const signupSchema = z.object({
    username:usernameValidation,
    email:emailValidation,
    password:passwordValidation
})