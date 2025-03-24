// //connection with mongodb database
const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://cwy:test123@cluster0.pdd4z.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0",
           );
        console.log("MongoDB Connected");
    }catch(error){
        console.error(error);
        process.exit(1)
    }
};
module.exports=connectDB;
