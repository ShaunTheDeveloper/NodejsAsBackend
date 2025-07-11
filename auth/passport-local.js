import passport from "passport";
import { Strategy } from "passport-local";
import { UserLocal } from "../db/user_local.js";
import bcrypt from "bcrypt"



export default passport.use(
    new Strategy({usernameField : "email"},async(email,password,done)=>{
        try{
            const finduser = await UserLocal.findOne({email})
            if(!finduser) throw Error("user not found in database")
            if(!bcrypt.compareSync(password,finduser.password)) throw Error("incorrect password")
            
            done(null,finduser);

        }catch(err){
            done(err,null);
        }

    })
)