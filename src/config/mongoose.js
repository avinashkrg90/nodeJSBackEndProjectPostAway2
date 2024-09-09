import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose'
const url = process.env.MONGODB_URL_LOCAL

export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url)
        console.log("Mongodb connected using mongoose")
    }catch(err){
        console.log(`Error while connecting to db: ${err}`)
    } 
}