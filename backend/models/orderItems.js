import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderItemSchema = new Schema({
 
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
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
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  deliveryDate: {
    type: Date,
  },
});

export default mongoose.model('OrderItem', orderItemSchema);

