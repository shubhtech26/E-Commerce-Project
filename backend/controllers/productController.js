import Product from '../models/productModel.js';
import Category from '../models//categoryModel.js';

// create product
const createProduct = async (req, res) => {

    const {title,
      description,
      price,
      discountedPrice,
      discountPersent,
      quantity,
      brand,
      color,
      sizes, 
      imageUrl,
      ratings, 
      reviews, 
      numRatings,
      category
    } = req.body;

    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// delete product by id
const deleteProductById = async (req, res) => {
    const { id }= req.params;
    try {
        const message = await Product.findByIdAndDelete(id);
        if (!id) return res.status(200).json({ error: 'Product not found' });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// update product by id
const updateProductById = async (req, res) => {
    const { id }= req.params;
    try {
        const message = await Product.updateMany(id, req.body);
        if (!id) return res.status(200).json({ error: 'Product not found' });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// Search products by query
const searchProduct = async (req, res) => {
    const query = req.query;   
    try {
      const products = await Product.find(query);
      if (!products) return res.status(200).send('No such product exists');
      res.status(200).json(products); 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get all products based on filtering and pagination
const getAllProducts = async (req, res) => {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = req.query;

  pageSize = pageSize || 10;
  pageNumber = pageNumber || 1;
  
  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return res.status(200).json({ content: [], currentPage: 1, totalPages: 1 });
    }
  }

  if (color) {
    const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
    const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }

  if (sizes) {
    const sizesSet = new Set(sizes.split(",").map(size => size.trim()));
    query = query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.or([
      { discountedPrice: { $gte: minPrice, $lte: maxPrice } },
      { price: { $gte: minPrice, $lte: maxPrice } }
    ]);
  }

  if (minDiscount) {
    query = query.where("discountPersent").gt(minDiscount);
  }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  // Apply pagination
  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  try {
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return res.status(200).json({ content: products, currentPage: pageNumber, totalPages });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}



export default { createProduct, deleteProductById, updateProductById, searchProduct, getAllProducts };

