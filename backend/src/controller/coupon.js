import { couponModel } from "../models/coupon.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandeler } from "../utils/AsyncHandler.js";
import { client } from "../utils/redis.js";


const nextCoupon = async()=>{
    const coupon = await couponModel.findOneAndUpdate(
        {status:"available"},
        {status:"claimed"},
        {new:true},
    )

    return coupon;
}


const claimCoupon = asyncHandeler(async(req,res)=>{

    const userIp = req.ip;

    const check = await client.get(userIp);
    if(check){
        const timeLeft = await client.ttl(userIp);
        const min = Math.floor(timeLeft/60);
        const sec = timeLeft%60;
        return res.status(429).json(new ApiResponse(429,`Already claimed try after ${min} minutes and ${sec} seconds`,{}))
    }

    const coupon = await nextCoupon();

    if(!coupon)
    {
        return res.status(400).json(new ApiResponse(400,"No coupon available",{}));
    }

    await client.setEx(userIp,3600,"claimed");

    res.status(200).json(new ApiResponse(200,"Coupon claimed successfully",{coupon:coupon.code}))
})

export {claimCoupon};