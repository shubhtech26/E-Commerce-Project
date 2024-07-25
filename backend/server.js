import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/user.js';
import mongoose from 'mongoose';
import passportSetup from './config/passport-setup.js';

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/auth', routes);


//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen to request
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error)
    })





