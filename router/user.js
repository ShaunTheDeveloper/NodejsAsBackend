import { Router } from "express";
import { parseIdBody,parseIdParams,parsedIdCookie} from "../middleware/parsid.js";
import { validateIdParams,validateEmail,validatePassword } from "../validator/user.js";
import { validateUserInput,validateInputCheck } from "../middleware/validateuser.js";
import bcrypt from "bcrypt"
import passport from "passport";
import { User } from "../db/users.js";
import '../auth/passport-local.js'
const salt = 10




const userRouter = Router();


userRouter.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err) res.status(400).send({location:"log out error",message:err.message})
        res.status(200).send({message:"successfully logout"})
    })
})



userRouter.get("/login",validateEmail,validatePassword,validateInputCheck,passport.authenticate("local"),(req,res)=>{
    if(req.user){
        res.status(200).send({message:"you login successfully",data : req.user})
    }else{
        res.status(400).send({location:"login failed"})
    }
}
)


userRouter.get("/dashbord",parsedIdCookie,(req,res)=>{
    if(!req.user) return res.send({message: "you must login"})

    const user = req.user;
    res.status(200).send({message:"your dashbord",data:user})
})


userRouter.get("/getAll",async(req,res)=>{
    try{
        const data = await User.find();
        res.send(data)
    }catch(err){
        res.status(400).send({location:"in get All",message:err.message})
    }
    })



userRouter.post("/",parseIdBody,validateUserInput,validateInputCheck,async (req,res)=>{
    const body = req.body;
    try{
        const genSalt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password,genSalt);
        const user = new User(body);
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
})



export default userRouter;