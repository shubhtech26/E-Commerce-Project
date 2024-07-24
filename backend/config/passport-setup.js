import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from '../config/keys'

passport.use(
    new GoogleStrategy({
        //options for the google stragegy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
}), () => {
    //passport callback function
}
)