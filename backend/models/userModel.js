
import mongoose from 'mongoose';

const { Schema } = mongoose;

const genderEnum = ['Male', 'Female', 'Other'];

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  gender: { type: String, enum: genderEnum },
  dob: { type: Date },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  passwordHash: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  mobile: { type: String },
  address: { type: String },
  review: { type: String },
  favourites: { type: String },
  cardDetails: { type: String },
  username: { type: String },
  googleId: { type: String },
  image: { type: String },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String }
}, { timestamps: true })


export default mongoose.model('User', userSchema);