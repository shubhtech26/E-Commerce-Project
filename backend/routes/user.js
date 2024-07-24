import express from 'express';
import User from '../models/userModel.js'
import createUser from '../controllers/userController.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'a dummy dashboard'});
})

router.get('/login', (req, res) => {
    res.render('login');
    res.json({msg: 'Login'});
})

router.get('/logout', (req, res) => {
    // handle with passport
    res.send({msg: 'Logout'});
})

router.get('/google', (req, res) => {
    //handle with passport
    res.send('logging in with google');
})

router.get('/signin', (req, res) => {
    res.render('LoginPage');
})

router.post('/registration', createUser)

export default router;