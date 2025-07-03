import { Router } from "express";
import { users } from "../db/database.js";
import { parseIdBody,parseIdParams} from "../middleware/parsid.js";
import { validateIdParams } from "../validator/user.js";
import { validateUserInput,validateInputCheck } from "../middleware/validateuser.js";



const userRouter = Router();


userRouter.get("/getAll",(req,res)=>{
    res.send(users);
})


userRouter.get("/:id",parseIdParams,validateIdParams,validateInputCheck,(req,res)=>{
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