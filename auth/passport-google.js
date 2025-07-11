import passport from "passport";
import {Strategy} from "passport-google-oauth20"
import  {UserGoogle} from "../db/user_google.js"
import {clientID,clientSecret} from "../secret/secret.js"



export default passport.use(
    new Strategy({
        clientID : clientID,
        clientSecret : clientSecret,
        callbackURL : "/auth/google/callback"
    },async(accessToken,refreshToken,profile,done)=>{
        let findUser;
        try{
            findUser = await UserGoogle.findOne({googleId:profile.id})
            if(findUser) return done(null,findUser);
        }catch(err){
            console.log("error in findig user in database")
            console.log(err);
            return done(err,null);
        }

        try{
            const newUser = UserGoogle({googleId: profile.id,email: profile.emails[0].value,displayName:profile.displayName})
            const savedUser =await newUser.save()
            return done(null,savedUser);
        }catch(err){
            console.log("error in saving user")
            console.log(err)
            return done(err,null)
        }


    })
)