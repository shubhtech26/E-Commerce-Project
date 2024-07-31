import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
    new GoogleStrategy({
        //options for the google stragegy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, (accessToken, refershToken, profile, done) => {
    //passport callback function
    console.log(profile);
})
)



// AccessToken: this is token we recieve by google
// refreshToken: to refersh the accessToken, since its expires after some time