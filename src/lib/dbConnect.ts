
import mongoose from "mongoose";

type connectionObject = { 
  isConnected?: number; 
}
const connection : connectionObject={};
async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Using existing connection");
        return;
    }
   try {
    
    const db = await mongoose.connect(process.env.MONGODB_URI || '');
      connection.isConnected = db.connections[0].readyState;
      console.log("New connection created");

   } catch (error) {
    console.log("Error in connecting to database",error);
   }


}
export default dbConnect;