import mongoose,{Schema} from 'mongoose'


const couponSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true,
    },
    assigned_to:{
        type:String,
        default:null,
    },
    status:{
        type:String,
        enum:["available","claimed"],
        defaut:"available",
    }
},{timestamps:true});




export const couponModel = mongoose.model('Coupon',couponSchema)