import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'


const connectdb = async(req,res)=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Mongodb Connected");
        
    } catch (error) {
        console.log('Mondodb connect failed',error)
        process.exit(1);
    }
}

export {connectdb}