import express from 'express';

const router = express.Router();

//authCheck: user can access its significant dashboard only 
const authCheck = (req, res, next) => {
    if(!req.user) {
        //if user is not logged in, redirect to login page
        res.redirect('/auth/login');
    } else {
        //if logged in
        next();
    }
};


router.get('/', authCheck, (req, res) => {
    //res.send('You are logged In' + req.user.username);
    res.render('profile', { user: req.user });
});

export default router;