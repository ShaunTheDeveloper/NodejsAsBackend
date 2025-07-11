import passport from "passport";
import  {UserGoogle} from "../db/user_google.js"
import { UserLocal } from "../db/user_local.js";



passport.serializeUser((user,done)=>{
    console.log(user)
    if(user.googleId){
        done(null,{id:user.id,type:"google"})
    }else{
        done(null,{id:user.id,type:"local"})
    }
})

passport.deserializeUser(async(user,done)=>{
    console.log(user)
    try{
        let findUser;
        if(user.type === 'local') findUser = await UserLocal.findById(user.id)
        if(user.type === 'google') findUser = await UserGoogle.findById(user.id)
        console.log(findUser)
        if(findUser) return done(null,findUser)
            else throw Error("can not find user try to log in")
    }catch(err){
        done(err,null)
    }
})