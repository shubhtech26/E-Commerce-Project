import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../models/productModel.js';

const router = express.Router();

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    if (payload.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

router.post('/', requireAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.json(product);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export default router;


