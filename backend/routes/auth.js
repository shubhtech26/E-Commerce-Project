import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d'
  });
}

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

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, passwordHash });
    const token = signToken(user);
    return res.json({ user: { id: user._id, firstName, lastName, email }, token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  return res.json({ user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }, token });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  return res.json(user);
});

router.post('/logout', (_req, res) => {
  return res.json({ message: 'Logged out' });
});

router.put('/profile', requireAuth, async (req, res) => {
  const updates = req.body || {};
  delete updates.password;
  delete updates.passwordHash;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-passwordHash');
  return res.json(user);
});

router.put('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const user = await User.findById(req.user.id);
  if (!user || !user.passwordHash) return res.status(400).json({ message: 'User not found' });
  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Current password incorrect' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  return res.json({ message: 'Password changed' });
});

export default router;