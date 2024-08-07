import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Ratings', ratingSchema);


