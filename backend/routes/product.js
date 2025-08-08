import express from 'express';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      pageNumber = 1,
      pageSize = 12,
      q
    } = req.query;

    let query = Product.find();

    if (q) {
      const regex = new RegExp(q, 'i');
      query = query.find({ $or: [{ title: regex }, { description: regex }, { brand: regex }, { color: regex }] });
    }

    if (category) {
      const existCategory = await Category.findOne({ name: category });
      if (existCategory) {
        query = query.where('category').equals(existCategory._id);
      } else {
        // if category not found, return empty result consistently
        return res.json({ items: [], pagination: { page: Number(pageNumber), limit: Number(pageSize), total: 0, totalPages: 0 } });
      }
    }

    if (color) {
      const colorRegex = new RegExp(color.split(',').join('|'), 'i');
      query = query.where('color').regex(colorRegex);
    }

    if (sizes) {
      query = query.where('sizes.name').in(sizes.split(','));
    }

    if (minPrice && maxPrice) {
      query = query.or([
        { discountedPrice: { $gte: Number(minPrice), $lte: Number(maxPrice) } },
        { price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }
      ]);
    }

    if (minDiscount) {
      query = query.where('discountPersent').gt(Number(minDiscount));
    }

    if (sort) {
      const sortDirection = sort === 'price_high' ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    const total = await Product.countDocuments(query.getFilter ? query.getFilter() : query.getQuery());
    const items = await query
      .skip((Number(pageNumber) - 1) * Number(pageSize))
      .limit(Number(pageSize))
      .lean();

    return res.json({ items, pagination: { page: Number(pageNumber), limit: Number(pageSize), total, totalPages: Math.ceil(total / Number(pageSize)) } });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Not found' });
    return res.json(product);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// GET /api/products/filters
router.get('/filters/:category?', async (req, res) => {
  try {
    const match = {};
    if (req.params.category) {
      const cat = await Category.findOne({ name: req.params.category });
      if (cat) match.category = cat._id;
    }
    const colors = await Product.distinct('color', match);
    const sizes = await Product.distinct('sizes.name', match);
    const minPrice = await Product.find(match).sort({ discountedPrice: 1 }).limit(1).select('discountedPrice').lean();
    const maxPrice = await Product.find(match).sort({ discountedPrice: -1 }).limit(1).select('discountedPrice').lean();
    return res.json({ colors, sizes, priceRange: [minPrice[0]?.discountedPrice || 0, maxPrice[0]?.discountedPrice || 0] });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default router;