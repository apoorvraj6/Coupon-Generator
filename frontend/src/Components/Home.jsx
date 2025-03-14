import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {

    const [coupon, setCoupon] = useState('');
    const [time, setTime] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    {console.log(API_URL)}
    const getCoupon = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/coupon/claim-coupon`);
            console.log(res);
            setCoupon(res.data.data.coupon);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log(error);
                setTime(error.response.data.message);
                toast.error(error.response.data.message);

            } else {
                console.log("Something went wrong", error);
                toast.error("Something went wrong, please try again!");
            }
        }
    };
    return (
        <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-purple-500 bg-clip-text text-transparent md:text-7xl md:flex md:justify-center ">
                    Your Coupon is Waiting for You
                </h1>

           
            <div className="flex flex-col items-center h-screen justify-center gap-4 ">
                <button
                    onClick={getCoupon}
                    className="bg-yellow-400 text-purple-900 text-xl font-bold px-4 py-3 rounded"
                >
                    Claim Coupon
                </button>
                {coupon && <p className="text-purple-500 font-semibold text-xl flex justify-center items-center">Your Coupon: <span className='text-yellow-300'>{coupon}</span></p>}
            {time && <div className='font-semibold text-xl bg-gradient-to-r from-yellow-300 to-purple-500 bg-clip-text text-transparent '>{time}</div>}
            </div>
        </div>
    )
}

export default Home
