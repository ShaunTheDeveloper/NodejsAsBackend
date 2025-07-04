import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../db/database.js";

passport.serializeUser((user,done)=>{
    console.log(user)
    done(null , user.id)
})

passport.deserializeUser((id,done)=>{
    console.log(id)
    try{
        const finduser = users.find((user)=>user.id === id);
        if(!finduser) throw Error("somthing bad happend you must login again")
        done(null,finduser)
    }catch(err){
        done(err,null)
    }
})



export default passport.use(
    new Strategy({usernameField : "email"},(email,password,done)=>{
        try{
            console.log(email + "    "+ password)
            const finduser = users.find((user)=>user.email === email);
            console.log(finduser.password)
            if(!finduser) throw Error("user not found in database")
            if(finduser.password !== password) throw Error("incorrect password")
            
            done(null,finduser);

        }catch(err){
            done(err,null);
        }

    })
)