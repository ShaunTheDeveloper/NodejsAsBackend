import express from "express";
import {fileURLToPath} from "url"
import path from "path"


const PORT = process.env.PORT || 3000
const app = express();



app.listen(PORT,(err)=>{
    console.log(`server started on PORT : ${PORT}`)
})



app.get("/test",(req,res)=>{
    res.send("server work correctly")
})





