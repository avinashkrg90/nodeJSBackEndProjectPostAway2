import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app = express();


app.get('/', (req, res)=>{
    res.send("Hello and welcome to our server");
})



const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("server is listening on port " + PORT);
})



