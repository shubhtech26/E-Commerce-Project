import cartModel from '../models/cart.model.js';

// Ensure this path is correct
const getallItems = async (req, res) => 
{
    try {
        const items = await cartModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export default getallItems;