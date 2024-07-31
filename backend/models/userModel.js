
import mongoose from 'mongoose';

const { Schema }= mongoose;

const userSchema = new Schema({
    userid : {
        type: Number,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
     },
    gender : {
        type: Enumerator,
        required: true
    },
    dob : {
        type: Date,
        required: true
    },
    email : {
        type: Email,
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

}, { timestamps: true})


export default mongoose.model('User', userSchema);