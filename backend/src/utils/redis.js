import {createClient} from 'redis';

const client = createClient({
    url:process.env.REDIS_URI
});

client.on("error",(error)=>{
    console.log("Error while connecting redis",error)
});

(async()=>{
   try {
     await client.connect();
     console.log("Connected to Redis")
   } catch (error) {
    console.error("Redis connection Failed",error)
   }
})();

export default client;


