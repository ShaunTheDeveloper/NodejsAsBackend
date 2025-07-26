
import {jest} from "@jest/globals"


const mock_response = {
    status : jest.fn(()=> mock_response),
    send : jest.fn()
}
const mock_request = {}

jest.unstable_mockModule("express-validator",() => ({
    validationResult : jest.fn(()=>({
        isEmpty : jest.fn(()=> false),
        array : jest.fn(()=>["invalid input"])
    })),
    matchedData : jest.fn(()=>({
        password : "password"
    }))
}))
const validator = await import("express-validator");


jest.unstable_mockModule("bcrypt",()=>({
    hashSync : jest.fn((password)=> `hash_${password}`),
    genSaltSync : jest.fn()
}))

const bcrypt  = await import("bcrypt")

const {createUserHandler} = await import("../handlers/user")

describe("testing create user",()=>{

    it('validation error in input',async()=>{
        await createUserHandler(mock_request,mock_response)
        
        expect(validator.validationResult).toHaveBeenCalled()
        expect(mock_response.status).toHaveBeenCalled()
        expect(mock_response.status).toHaveBeenCalledTimes(1)
        expect(mock_response.status).toHaveBeenCalledWith(400)
        expect(mock_response.send).toHaveBeenCalled()
        expect(mock_response.send).toHaveBeenCalledTimes(1)
        expect(mock_response.send).toHaveBeenCalledWith(["invalid input"])

    })

    it("success on save user",async()=>{
        jest.spyOn(validator,"validationResult").mockImplementationOnce(()=>({
            isEmpty : jest.fn(()=> true)
        }))
        await createUserHandler(mock_request,mock_response)

        expect(validator.validationResult).toHaveBeenCalled()
        expect(bcrypt.hashSync).toHaveReturnedWith("hash_password")
        expect(validator.matchedData).toHaveBeenCalled()
    })


})