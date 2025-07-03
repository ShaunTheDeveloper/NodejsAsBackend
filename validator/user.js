import { param,body,query,validationResult,matchedData } from "express-validator";
const IdAttr = "id"
const emptyIdMessage = "value:id can not be empty"
const isIntIdMessage = "value:id must be int(number)"

const nameAttr = "name";
const isStringNameMessage = "value:name must be string "
const minLenghtName = 6;
const maxLenghtName = 20;
const isLengthNameMessage = `value:name must have ${minLenghtName} to ${maxLenghtName} char`


const emailAttr = "email";
const isEmailMessage = "value:email must be a vlaid email adress"


const passwordAttr = "password";
const isStrongPasswordMessage = "use string password"


export const validateIdBody = body(IdAttr).notEmpty().withMessage(emptyIdMessage).isInt().withMessage(isIntIdMessage)
export const validateIdParams = param(IdAttr).notEmpty().withMessage(emptyIdMessage).isInt().withMessage(isIntIdMessage)

export const validateName = body(nameAttr).isString().withMessage(isStringNameMessage).isLength({min:6,max:20}).withMessage(isLengthNameMessage)

export const validateEmail = body(emailAttr).isEmail().withMessage(isEmailMessage);

export const validatePassword = body(passwordAttr).isStrongPassword().withMessage(isStrongPasswordMessage)




