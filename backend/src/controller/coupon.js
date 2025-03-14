import { couponModel } from "../models/coupon.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandeler } from "../utils/AsyncHandler.js";
import { client } from "../utils/redis.js";
import { v4 as uniqueid } from "uuid";  


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
    const sessionId = req.cookies.sessionid;

    // Generate a session ID if not present
    if(!sessionId){
        sessionId = uniqueid();
        res.cookie ("sessionid",sessionId,{
            httpOnly:true,
            secure:true,
            maxAge:3600000,
        })
    }

    // Check if this session or IP has already claimed a coupon
    const check = await client.get(userIp);
    const sessionCheck = await client.get(sessionId);

    if(check || sessionCheck){
        const timeLeft = await client.ttl(userIp) || await client.ttl(sessionId);
        const min = Math.floor(timeLeft/60);
        const sec = timeLeft%60;
        return res.status(429).json(new ApiResponse(429,`Already claimed try after ${min} minutes and ${sec} seconds`,{}))
    }
    // Get the next available coupon
    const coupon = await nextCoupon();

    if(!coupon)
    {
        return res.status(400).json(new ApiResponse(400,"No coupon available",{}));
    }

    // Store IP and sessionId in Redis for 1 hour to prevent abuse
    await client.setEx(userIp,3600,"claimed");
    await client.setEx(sessionId,3600,"claimed");

    // Return the coupon to the user
    res.status(200).json(new ApiResponse(200,"Coupon claimed successfully",{coupon:coupon.code}))
})

export {claimCoupon};