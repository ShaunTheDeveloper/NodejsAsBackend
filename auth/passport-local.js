import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../db/users.js";
import bcrypt from "bcrypt"


passport.serializeUser((user,done)=>{
    done(null , user.id)
})

passport.deserializeUser(async(id,done)=>{
    try{
        const finduser = await User.findById(id)
        console.log(finduser)
        if(!finduser) throw Error("somthing bad happend you must login again")
        done(null,finduser)
    }catch(err){
        done(err,null)
    }
})



export default passport.use(
    new Strategy({usernameField : "email"},async(email,password,done)=>{
        try{
            const finduser = await User.findOne({email})
            if(!finduser) throw Error("user not found in database")
            if(!bcrypt.compareSync(password,finduser.password)) throw Error("incorrect password")
            
            done(null,finduser);

        }catch(err){
            done(err,null);
        }

    })
)