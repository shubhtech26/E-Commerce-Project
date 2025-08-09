import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import User from '../models/userModel.js';
import { mens_kurta } from '../../frontend/src/assets/Mens_Kurta.js';

dotenv.config();

function readJson(relativePath) {
  const absolute = path.resolve(process.cwd(), relativePath);
  const raw = fs.readFileSync(absolute, 'utf8');
  return JSON.parse(raw);
}

function mapItemToProduct(item, categoryId) {
  const sizes = Array.isArray(item.size)
    ? item.size.map(s => ({ name: s.name, quantity: Number(s.quantity || 0) }))
    : Array.isArray(item.sizes)
      ? item.sizes
      : [{ name: 'M', quantity: Number(item.quantity || 10) }];

  let totalQty = sizes.reduce((n, s) => n + (Number(s.quantity) || 0), 0);
  if (!totalQty) totalQty = Number(item.quantity || 50);

  // Normalize prices to 2-digit realistic values
  const rawPrice = Number(item.price || 99);
  const rawSale = Number(item.discountedPrice || rawPrice);
  const normalize = (p) => Math.min(99, Math.max(29, Math.round(p / 10)));
  const sale = normalize(rawSale);
  const price = Math.min(99, Math.max(sale + 5, normalize(rawPrice)));
  const discountPersent = Math.max(0, Math.round(((price - sale) / price) * 100));

  return {
    title: item.title || item.name || 'Product',
    description: item.description || item.title || '',
    price,
    discountedPrice: sale,
    discountPersent,
    quantity: totalQty,
    brand: item.brand || 'House',
    color: (item.color || '').toString().toLowerCase() || 'black',
    sizes,
    imageUrl: item.imageUrl || item.thumbnail || '',
    category: categoryId
  };
}

async function main() {
  await mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create specific categories from local datasets (match Postman/leaf categories)
  const categoryNames = ['shirt', 'men_jeans', 'women_dress', 'women_top', 'mens_kurta'];
  const categories = {};
  for (const name of categoryNames) {
    const cat = await Category.findOneAndUpdate({ name }, { name }, { upsert: true, new: true });
    categories[name] = cat._id;
  }

  let products = [];
  {
    // Load local JSON datasets from frontend assets (no external calls)
    const menShirts = readJson('../frontend/src/assets/men_shirt.json');
    const menJeans = readJson('../frontend/src/assets/men_jeans.json');
    const womenDress = readJson('../frontend/src/assets/womens product/women_dress.json');
    const womenTop = readJson('../frontend/src/assets/womens product/women_top.json');

    products = [
      ...menShirts.map(i => mapItemToProduct(i, categories['shirt'])),
      ...menJeans.map(i => mapItemToProduct(i, categories['men_jeans'])),
      ...womenDress.map(i => mapItemToProduct(i, categories['women_dress'])),
      ...womenTop.map(i => mapItemToProduct(i, categories['women_top'])),
      ...mens_kurta.map(i => mapItemToProduct(i, categories['mens_kurta']))
    ];
  }

  await Product.deleteMany({});
  await Product.insertMany(products);

  // Seed a demo user
  await User.findOneAndUpdate(
    { email: 'demo@example.com' },
    { firstName: 'Demo', lastName: 'User', email: 'demo@example.com', passwordHash: '$2a$10$8CN2gkH9HqFf0W0vhgR9Ae0r2Gq7sr4D6nWJm7YvZfW8XbZf8oHhK' },
    { upsert: true }
  );

  console.log(`Seed complete: inserted ${products.length} products`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


