import mongoose from 'mongoose';

const {Schema} =  mongoose;

const cartItemSchema = new Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    required: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: false,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

export default mongoose.model('cartItems', cartItemSchema);


