import dotenv from 'dotenv'
import { connectdb } from './db/connectdb.js'
import { app } from './app.js'



dotenv.config({
    path:'./env'
})

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on the port ${process.env.PORT || 8000}`)
    })
})
.catch((Error)=>{console.log("Mongodb Connect Failed",Error)})