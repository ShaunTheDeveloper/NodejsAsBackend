import { Router } from "express";
import { users } from "../db/database.js";
import { parseIdBody,parseIdParams,parsedIdCookie} from "../middleware/parsid.js";
import { validateIdParams,validateEmail,validatePassword } from "../validator/user.js";
import { validateUserInput,validateInputCheck } from "../middleware/validateuser.js";



const userRouter = Router();


userRouter.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if (err) return res.status(400).send(`something bad happened ${err.message}`)
        res.clearCookie("connect.id");
        res.status(200).send({message:"you logout succefully"})
    })
})



userRouter.get("/login",validateEmail,validatePassword,validateInputCheck,(req,res)=>{
    if(req.session.user) return res.send({message: "you alredy logged in"})


    const {email,password} = req.body;

    const user = users.find((user)=>user.email === email);

    if(!user) return res.status(400).send({message: "user with this email not exist"})

    const isPasswordCorrect = user.password === password;

    if(!isPasswordCorrect) return res.status(400).send({"message": "password incorrect"})

    req.session.user = user;
    res.status(200).send({message: "login succefully"})
}
)


userRouter.get("/dashbord",parsedIdCookie,(req,res)=>{
    if(!req.session.user) return res.send({message: "you must login"})

    const user = users.find((user)=>user.id === req.session.user.id);

    if(!user){
        res.clearCookie("id",{signed: true});
        return res.status(400).send({message:"somthing bad happen you must login again"})
    }
    console.log(req.sessionStore)
    res.send(user)
})


userRouter.get("/getAll",(req,res)=>{
    res.send(users);
})


userRouter.get("/getbyid/:id",parseIdParams,validateIdParams,validateInputCheck,(req,res)=>{
    const id = req.params.id

    const user = users.find((value)=>{
        return value.id === id
    })

    if(user){
        res.status(200).send(user);
        return;
    }else{
        res.status(404).send({message: "user not founded"})
    }
})



userRouter.post("/",parseIdBody,validateUserInput,validateInputCheck,(req,res)=>{
    const body = req.body;
    const {id} = body;

    const user = users.find((value)=>{
        return value.id === id
    })

    if(user){
        res.status(400).send({message:"user with this id exist"})
        return
    }

    users.push(body);
    res.status(200).send(body)
})



export default userRouter;