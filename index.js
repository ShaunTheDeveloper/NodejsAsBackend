import express from "express";
import {fileURLToPath} from "url"
import path from "path"
import userRouter from "./router/user.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Session } from "inspector/promises";


const PORT = process.env.PORT || 3000
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"static")));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser("secret"))


app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "secret",
    cookie : {
        maxAge : 60000*60,
        httpOnly : true
    }
}))


app.use("/users",userRouter);






app.listen(PORT,(err)=>{
    console.log(`server started on PORT : ${PORT}`)
})



app.get("/test",(req,res)=>{
    res.send("server work correctly")
})





