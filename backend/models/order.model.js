import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    // required: true,
  },
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'orderItems',
  }],
  orderDate: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: 'addresses',
  },
  paymentDetails: {
    
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paymentId:{
      type:String,
    },
    paymentStatus:{
      type:String
    }
    
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
  },
  discounte: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  totalItem: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Orders', orderSchema);

