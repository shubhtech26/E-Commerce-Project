import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import User from '../models/userModel.js';

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const [mens, womens] = await Promise.all([
    Category.findOneAndUpdate({ name: 'men' }, { name: 'men' }, { upsert: true, new: true }),
    Category.findOneAndUpdate({ name: 'women' }, { name: 'women' }, { upsert: true, new: true })
  ]);

  const products = [
    {
      title: 'Men Shirt Classic',
      description: 'Comfortable cotton shirt',
      price: 999,
      discountedPrice: 799,
      discountPersent: 20,
      quantity: 100,
      brand: 'BrandX',
      color: 'blue',
      sizes: [{ name: 'S', quantity: 20 }, { name: 'M', quantity: 30 }, { name: 'L', quantity: 50 }],
      imageUrl: 'https://via.placeholder.com/300x300',
      category: mens._id
    },
    {
      title: 'Women Dress Floral',
      description: 'Floral summer dress',
      price: 1499,
      discountedPrice: 1099,
      discountPersent: 26,
      quantity: 80,
      brand: 'BrandY',
      color: 'red',
      sizes: [{ name: 'S', quantity: 20 }, { name: 'M', quantity: 30 }, { name: 'L', quantity: 30 }],
      imageUrl: 'https://via.placeholder.com/300x300',
      category: womens._id
    }
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);

  // Seed a demo user
  await User.findOneAndUpdate(
    { email: 'demo@example.com' },
    { firstName: 'Demo', lastName: 'User', email: 'demo@example.com', passwordHash: '$2a$10$8CN2gkH9HqFf0W0vhgR9Ae0r2Gq7sr4D6nWJm7YvZfW8XbZf8oHhK' },
    { upsert: true }
  );

  console.log('Seed complete');
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


