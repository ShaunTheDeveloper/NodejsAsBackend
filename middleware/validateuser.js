import { validationResult,matchedData } from "express-validator";

import { validateIdBody,validateIdParams,validateEmail,validateName,validatePassword } from "../validator/user.js";



export const validateInputCheck = (req,res,next)=>{
    const result = validationResult(req);
    console.log(result.errors)
    if(result.errors.length == 0){
        return next()
    }
    console.log("not empty")
    return res.status(400).send(result.errors)
}



export const validateUserInput = [validateIdBody,validateEmail,validateName,validatePassword];