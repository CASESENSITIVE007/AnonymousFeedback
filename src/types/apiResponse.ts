import { Message } from "@/models/User.modal";

export interface ApiResponse {
    success: boolean; 
    message: string;
    isAcceptedMessage?: boolean;  // ye optional hai 
    messages?:Array<Message>; // ye optional hai
  

}