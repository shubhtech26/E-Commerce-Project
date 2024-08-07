
import mongoose from 'mongoose';

const {Schema} =  mongoose;
const cartSchema= new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  cartItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cartItems',
    required: false,
  }],
  totalPrice: {
    type: Number,
    required: true,
    default:0
  },
  totalItem: {
    type: Number,
    required: true,
    default:0
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default:0
  },
  discount: {
    type: Number,
    required: true,
    default:0
  },
},{ timestamps: true});

export default mongoose.model('Cart', cartSchema);
