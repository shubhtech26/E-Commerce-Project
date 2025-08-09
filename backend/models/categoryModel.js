import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  level: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model('categories', categorySchema);
