const mongoose = require("mongoose");
const mongoUri =
  "mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/SM_Sameer?retryWrites=true&w=majority";

const connectMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("MongoDB up and running")
    })
}

module.exports = connectMongo
