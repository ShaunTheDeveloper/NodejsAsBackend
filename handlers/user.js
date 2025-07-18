import { mockUsers } from "../utils/constant/mock_user.js";



export const getUserByIdHandler = (request, response) => {
	const { findUserIndex } = request;
	const findUser = mockUsers[findUserIndex];
	if (!findUser) return response.sendStatus(404);
	return response.send(findUser);
};