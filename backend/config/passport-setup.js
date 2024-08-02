import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/userModel.js';


//cookies creation
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//cookies come back from the browser
passport.deserializeUser((id, done) => {
    // find the user by ID that we got from cookie
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for the google stragegy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, (accessToken, refershToken, profile, done) => {
    //passport callback function
    console.log('passport callback fired: ');
    console.log(profile);

    //check if user already exists in database
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser) {
            //already have the user
            console.log('user is:', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in database
            // save profile content in database
            new User({
                username: profile.displayName,
                googleId: profile.id,
                gender: profile.gender,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            }).save().then((newUser) => {
                console.log('New user created' + newUser);
                done(null, newUser);
            })
        }

    })


})
);

export default passport;

// AccessToken: this is token we recieve by google
// refreshToken: to refersh the accessToken, since its expires after some time