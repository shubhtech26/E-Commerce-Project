
import mongoose from 'mongoose';

const { Schema } = mongoose;

const genderEnum = ['Male', 'Female', 'Other'];

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
     },
    gender : {
        type: String,
        enum: genderEnum,
    },
    dob : {
        type: Date,
    },
    email : {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        required: true
    },
    mobile : {
        type: Number,
        required: true
    },
    address : {
        type: String,
    },
    review : {
        type: String,
    },
    favourites : {
        type: String,
    },
    cardDetails : {
        type: Number,
    },
    username : {
        type: String
    },
    googleId : {
        type: String
    },

}, { timestamps: true})


export default mongoose.model('User', userSchema);