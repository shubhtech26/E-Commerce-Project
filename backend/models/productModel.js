import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  discountedPrice: {
    type: Number,
  },
  discountPersent: {
    type: Number,
  },
  quantity: {
    type: Number,
    // required: true,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  sizes: [{
    name:{type:String},
    quantity:{type:Number}
  }], 
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ratings',
    },
  ], 
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reviews',
    },
  ], 
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  }
}, { timestamps: true});

export default mongoose.model('Product', productSchema);
