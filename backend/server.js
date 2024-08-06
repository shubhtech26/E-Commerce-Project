import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import productAdminRoutes from './routes/productAdmin.js'
import productRoutes from './routes/product.js';
import mongoose from 'mongoose';
import passportSetup from './config/passport-setup.js';
import cookieSession from'cookie-session';
import passport from 'passport';

//express app
const app = express();

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // maxAge: a day in milliesec 
    keys: [process.env.SESSION_COOKIEKEY]
}));

// initialzise passport
app.use(passport.initialize());
app.use(passport.session());

//connect to db
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //listen to request
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error)
    })

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', productAdminRoutes);
app.use('/user', productRoutes)






