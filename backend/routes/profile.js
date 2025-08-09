import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

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
  const user = await User.findById(req.user.id).select('-passwordHash');
  return res.json(user);
});

export default router;