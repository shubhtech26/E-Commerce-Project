import express from 'express';
import User from '../models/userModel.js'
import createUser from '../controllers/userController.js'
import passport from 'passport';

const router = express.Router();


// auth login
router.get('/login', (req, res) => {
    // TODO
    //res.render('login', { user: req.user });
    res.json({ user: req.user });
})

// auth logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session = null; // Clear the session
        res.send({ msg: 'Logout successful' });
    });
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {  
    res.send('YOU REACHED THE CALLBACK URI');
    // TODO res.redirect('/profile/');
})



export default router;