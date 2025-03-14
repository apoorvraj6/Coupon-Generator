import {Router} from 'express';
import { claimCoupon } from '../controller/coupon.js';



const router = Router();

router.route('/claim-coupon').post(claimCoupon);


export default router;