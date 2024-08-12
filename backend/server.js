import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import productAdminRoutes from './routes/productAdmin.js';
import productRoutes from './routes/product.js';
import mongoose from 'mongoose';
import passportSetup from './config/passport-setup.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cartRoutes from './routes/cartRoutes.js';

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    keys: [process.env.SESSION_COOKIEKEY]
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

// Set up routes
app.use('/auth', routes);
app.use('/profile', profileRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', productAdminRoutes);
app.use('/user', productRoutes);

// Home route
app.get('/', (req, res) => {
    res.send(' '); // Adjust as needed
});
