import express from "express";
import {fileURLToPath} from "url"
import path from "path"
import userRouter from "./router/user.js";


const PORT = process.env.PORT || 3000
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"static")));
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use("/users",userRouter);






app.listen(PORT,(err)=>{
    console.log(`server started on PORT : ${PORT}`)
})



app.get("/test",(req,res)=>{
    res.send("server work correctly")
})





