import express from 'express';
import User from '../models/userModel.js'
import createUser from '../controllers/userController.js'
import passport from 'passport';

const router = express.Router();

// dashboard
router.get('/', (req, res) => {
    res.json({msg: 'a dummy dashboard'});
})

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send({msg: 'Logout'});
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    //res.send(req.user);
    res.redirect('/profile/');
})


router.get('/signin', (req, res) => {
    res.render('LoginPage');
})

router.post('/registration', createUser)

export default router;