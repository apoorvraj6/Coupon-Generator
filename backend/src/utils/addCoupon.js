import { connectdb } from "../db/connectdb.js";
import { couponModel } from "../models/coupon.js";
import { asyncHandeler } from "./AsyncHandler.js";
import {v4 as uniquecoupon} from 'uuid'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config()




const addCoupon = asyncHandeler(async(req,res)=>{

    await connectdb();

    const coupons = [];

    for(let i = 0;i<10;i++)
    {
        coupons.push({code:uniquecoupon(),status: "available"})
    }

    await couponModel.insertMany(coupons);
    console.log("Coupons Added Successfully");

    mongoose.connection.close();
})

addCoupon();