import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());


import couponRouter from './routes/couponRoutes.js'

app.use('/api/coupon',couponRouter);


export {app};