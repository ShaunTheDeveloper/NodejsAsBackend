import express from "express";
import {fileURLToPath} from "url"
import path from "path"
import userRouter from "./router/user.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./auth/passport-local.js"
import mongoose from "mongoose";



const PORT = process.env.PORT || 3000
const app = express();
mongoose.connect("mongodb://localhost:27017/users")
.then(()=>{console.log("connected to db succfully")})
.catch(err=>console.log(err))


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


app.use(passport.initialize());
app.use(passport.session())





app.use("/users",userRouter);

app.post("/auth",passport.authenticate("local"),(req,res)=>{
    res.sendStatus(200)
})


app.get("/check/auth",(req,res)=>{
    console.log(req.user)
    console.log(req.session)
    res.sendStatus(200)
})

app.get("/auth/logout",(req,res)=>{
    if(!req.user) return res.sendStatus(401)
    req.logout((err)=>{
        if(err) return res.sendStatus(400);
        res.sendStatus(200)
    })
})

app.listen(PORT,(err)=>{
    console.log(`server started on PORT : ${PORT}`)
})





app.get("/test",(req,res)=>{
    res.send("server work correctly")
})





