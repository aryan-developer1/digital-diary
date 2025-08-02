const mongoose = require("mongoose");

require("dotenv").config(); 

 const connectDb = ()=>{
    const connectionDetails = mongoose.connect(
        process.env.MONGODB_URI
    ).then(()=>{
        console.log("db connected successfully",connectionDetails)
    }).catch((error)=>{
        console.log("somer error occur",error)
    });
}

module.exports = connectDb

