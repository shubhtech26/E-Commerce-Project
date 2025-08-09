import express from 'express';
import jwt from 'jsonwebtoken';
import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js';
import Product from '../models/productModel.js';

const router = express.Router();

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

async function ensureCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, cartItems: [], totalItem: 0, totalPrice: 0, totalDiscountedPrice: 0, discount: 0 });
  }
  return cart;
}

router.get('/', requireAuth, async (req, res) => {
  const cart = await ensureCart(req.user.id);
  const items = await CartItem.find({ cart: cart._id }).populate('product').lean();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return res.json({ items, totalItems, totalPrice });
});

router.post('/add', requireAuth, async (req, res) => {
  const { productId, quantity = 1, size } = req.body;
  if (!productId) return res.status(400).json({ message: 'productId required' });
  const cart = await ensureCart(req.user.id);
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  let item = await CartItem.findOne({ cart: cart._id, product: product._id, userId: req.user.id, size });
  if (!item) {
    item = await CartItem.create({ cart: cart._id, product: product._id, userId: req.user.id, size: size || 'M', quantity: 0, price: product.price, discountedPrice: product.discountedPrice });
  }
  item.quantity += Number(quantity);
  await item.save();
  const items = await CartItem.find({ cart: cart._id }).populate('product').lean();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return res.json({ items, totalItems, totalPrice });
});

router.put('/items/:cartItemId', requireAuth, async (req, res) => {
  const { quantity } = req.body;
  const item = await CartItem.findById(req.params.cartItemId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.quantity = Number(quantity);
  if (item.quantity <= 0) await CartItem.findByIdAndDelete(item._id);
  else await item.save();
  const cart = await ensureCart(req.user.id);
  const items = await CartItem.find({ cart: cart._id }).populate('product').lean();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return res.json({ items, totalItems, totalPrice });
});

router.delete('/items/:cartItemId', requireAuth, async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.cartItemId);
  const cart = await ensureCart(req.user.id);
  const items = await CartItem.find({ cart: cart._id }).populate('product').lean();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return res.json({ items, totalItems, totalPrice });
});

router.delete('/clear', requireAuth, async (req, res) => {
  const cart = await ensureCart(req.user.id);
  await CartItem.deleteMany({ cart: cart._id });
  return res.json({ items: [], totalItems: 0, totalPrice: 0 });
});

router.get('/count', requireAuth, async (req, res) => {
  const cart = await ensureCart(req.user.id);
  const items = await CartItem.find({ cart: cart._id }).lean();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  return res.json({ count: totalItems });
});

router.post('/apply-coupon', requireAuth, async (_req, res) => {
  return res.json({ success: true, discountPercent: 10 });
});

router.delete('/remove-coupon', requireAuth, async (_req, res) => {
  return res.json({ success: true });
});

router.post('/items/:cartItemId/move-to-wishlist', requireAuth, async (_req, res) => {
  // Not implemented; just acknowledge to satisfy frontend
  return res.json({ success: true });
});

export default router;
