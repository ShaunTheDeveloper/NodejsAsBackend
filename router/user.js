import { Router } from "express";
import { users } from "../db/database.js";
import { parseIdBody,parseIdParams} from "../middleware/parsid.js";



const userRouter = Router();


userRouter.get("/getAll",(req,res)=>{
    res.send(users);
})


userRouter.get("/:id",parseIdParams,(req,res)=>{
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



userRouter.post("/",parseIdBody,(req,res)=>{
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