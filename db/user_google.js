import mongoose from "mongoose"


const shcemaUserGoogle = mongoose.Schema({
    googleId: mongoose.Schema.Types.String,
    email : {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    },
    displayName: mongoose.Schema.Types.String,
})


export const UserGoogle = mongoose.model("UserGoogle",shcemaUserGoogle);