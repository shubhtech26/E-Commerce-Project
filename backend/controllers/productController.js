import Product from '../models/productModel.js';

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
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// update product by id
const updateProductById = async (req, res) => {
    const { id }= req.params;
    try {
        const productId = req.params.id;
        const message = await Product.updateMany(id, req.body);
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//search product by id



export default { createProduct, deleteProductById, updateProductById };

