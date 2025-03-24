// //connection with mongodb database
const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://cwy:test123@cluster0.pdd4z.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0',
           );
        console.log("MongoDB Connected");
    }catch(error){
        console.error(error);
        process.exit(1)
    }
};
module.exports=connectDB;


// // db.js
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     // Replace <db_password> with your actual password
//     await mongoose.connect("mongodb+srv://cwy:<db_password>@cluster0.pdd4z.mongodb.net/?retryWrites=true&w=majority", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
