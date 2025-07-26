import { mockUsers } from "../utils/constant/mock_user.js";
import { validationResult,matchedData } from "express-validator";
import {genSaltSync, hashSync} from "bcrypt"
import {UserLocal} from "../db/user_local.js"



export const getUserByIdHandler = (request, response) => {
	const { findUserIndex } = request;
	const findUser = mockUsers[findUserIndex];
	if (!findUser) return response.sendStatus(404);
	return response.send(findUser);
};


export const createUserHandler = async (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty()) return response.status(400).send(result.array());

   const data = matchedData(request);
   const salt = genSaltSync(10);
   data.password = hashSync(data.password,salt);
   const newUser = new UserLocal(data);

   try {
     const savedUser = await newUser.save();
     return response.status(201).send(savedUser);
   } catch (err) {
     return response.sendStatus(400);
   }
};