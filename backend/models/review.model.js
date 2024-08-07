import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Reviews', reviewSchema);


