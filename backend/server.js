import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import productAdminRoutes from './routes/productAdmin.js';
import productRoutes from './routes/product.js';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import cors from 'cors';
import seedRoutes from './routes/seed.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orders.js';

// Create Express app
const app = express();

// Middleware
app.use(express.json());
// Allow localhost, *.vercel.app, and optionally FRONTEND_ORIGIN
const allowedOrigins = [/localhost:\d+$/ , /\.vercel\.app$/];
if (process.env.FRONTEND_ORIGIN) {
  try {
    const escaped = process.env.FRONTEND_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    allowedOrigins.push(new RegExp(escaped));
  } catch {}
}
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const ok = allowedOrigins.some((rx) => rx.test(origin));
      return callback(ok ? null : new Error('Not allowed by CORS'), ok);
    },
    credentials: true,
  })
);

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    keys: [process.env.SESSION_COOKIEKEY]
}));

// Remove Passport Google OAuth (no external providers)

// Connect to MongoDB
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

// Set up routes with /api prefix
app.use('/api/auth', routes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin/products', productAdminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seed', seedRoutes);

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));
