
import { getUserByIdHandler } from "../handlers/user.js";
import {jest} from "@jest/globals"
import { mockUsers } from "../utils/constant/mock_user.js";


const mock_response = {
    sendStatus : jest.fn(),
    send : jest.fn()
}

const mock_request = {
    findUserIndex : 2
}

describe("testing get user by id",()=>{
    it("test succfull get user",()=>{
        getUserByIdHandler(mock_request,mock_response);

        expect(mock_response.send).toHaveBeenCalled()
        expect(mock_response.sendStatus).not.toHaveBeenCalled()
        expect(mock_response.send).toHaveBeenCalledTimes(1)
        expect(mock_response.send).toHaveBeenCalledWith(mockUsers[2])
    })


    it("test unseccefull get user",()=>{
        const copy_request = {...mock_request, findUserIndex:43}
        getUserByIdHandler(copy_request,mock_response)

        expect(mock_response.sendStatus).toHaveBeenCalled();
        expect(mock_response.sendStatus).toHaveBeenCalledTimes(1);
        expect(mock_response.sendStatus).toHaveBeenCalledWith(404);
        expect(mock_response.send).not.toHaveBeenCalled()
    })
})