import mongoose from "mongoose"


const shcemaUser = mongoose.Schema({
    email : {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    },
    displayName: mongoose.Schema.Types.String,
    password:{
        type : mongoose.Schema.Types.String,
        required: true
    }
})


export const User = mongoose.model("User",shcemaUser);