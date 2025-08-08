import express from 'express';
import jwt from 'jsonwebtoken';
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItems.js';
import CartItem from '../models/cartItem.model.js';
import Cart from '../models/cart.model.js';

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

router.get('/', requireAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('orderItems').lean();
  return res.json(orders);
});

router.get('/:id', requireAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('orderItems').lean();
  if (!order) return res.status(404).json({ message: 'Not found' });
  return res.json(order);
});

router.post('/', requireAuth, async (req, res) => {
  // Create order from current cart
  const cart = await Cart.findOne({ user: req.user.id });
  const items = await CartItem.find({ cart: cart?._id }).lean();
  if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const orderItems = await Promise.all(items.map(async (ci) => {
    const oi = await OrderItem.create({
      product: ci.product,
      size: ci.size,
      quantity: ci.quantity,
      price: ci.price,
      discountedPrice: ci.discountedPrice,
      userId: req.user.id
    });
    return oi._id;
  }));

  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalDiscountedPrice = items.reduce((s, i) => s + i.discountedPrice * i.quantity, 0);
  const order = await Order.create({
    user: req.user.id,
    orderItems,
    orderDate: new Date(),
    shippingAddress: req.body.shippingAddressId || null,
    paymentDetails: { paymentMethod: req.body.paymentMethod || 'COD', paymentStatus: 'PAID' },
    totalPrice,
    totalDiscountedPrice,
    discounte: totalPrice - totalDiscountedPrice,
    orderStatus: 'PENDING',
    totalItem: items.reduce((s, i) => s + i.quantity, 0),
  });

  await CartItem.deleteMany({ cart: cart._id });
  return res.json(order);
});

router.put('/:id/status', requireAuth, async (req, res) => {
  const order = await Order.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { orderStatus: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Not found' });
  return res.json(order);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const order = await Order.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { orderStatus: 'CANCELLED' }, { new: true });
  if (!order) return res.status(404).json({ message: 'Not found' });
  return res.json(order);
});

export default router;


