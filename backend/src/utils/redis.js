import {createClient} from 'redis';

const client = createClient({
    url:process.env.REDIS_URI
});

client.on("error",(error)=>{
    console.log("Error while connecting redis",error)
});

const connectredis = async()=>{
    try {
        await client.connect();
        console.log('Connected to Redis')
        
    } catch (error) {
        console.log("Error while connecting to the redis")
        process.exit(1);
    }
}

export {connectredis,client};


