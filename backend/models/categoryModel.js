import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  level: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Categories', categorySchema);
