# ShopZone — Complete E‑Commerce Site (MERN)

A complete, production‑ready MERN e‑commerce site with modern UI/UX, fully local backend APIs (no external product API), MongoDB persistence, JWT auth, cart & orders, seed data, and an optional local AI bot (Ollama).

## 🚀 Features Implemented

### ✅ Core E‑Commerce Features
- Product Catalog – Filtering, sorting, pagination, search
- Product Details – Gallery, variants (size/color), stock status
- Shopping Cart – Add/remove/update, pricing totals
- Checkout – Multi‑step flow (address, summary)
- Authentication – Register/login via JWT, profile update, change password
- Orders – Create order, view my orders, order details

### ✅ Modern UI/UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Components** - Hover effects, animations, loading states
- **Advanced Navigation** - Mega menu, search modal, breadcrumbs
- **Professional Layout** - Clean, modern design with consistent spacing

### ✅ Technical Excellence
- Redux Toolkit state management
- Service layer (Axios) with interceptors
- Error handling, notifications, and clean code structure
- Seed script + published JSON for instant testing

### ✅ Admin (APIs ready)
- Admin product CRUD (create/update/delete)
- (Extensible) hooks for order and customer management

## 🏗️ Project Structure (Monorepo)

```
E-Commerce-Project/
├── backend/                 # Node.js + Express + MongoDB (Mongoose)
│   ├── models/              # Product, Category, User, Cart, Order, etc.
│   ├── routes/              # auth, products, cart, orders, admin, seed, ai
│   ├── scripts/seed.js      # DB seeding
│   ├── seed-data/products.json
│   └── server.js            # Express entrypoint
└── frontend/                # React app
    ├── src/                 # Components, pages, redux, services, utils
    └── vercel.json          # SPA rewrites for Vercel
```

## 🎯 Key Components

### **Navigation System**
- Responsive mega menu with category navigation
- Advanced search with autocomplete
- Cart drawer with item management
- User authentication menu

### **Product Features**
- **ProductCard** - Reusable product display with hover effects
- **ProductDetail** - Comprehensive product view with image gallery
- **ProductFilters** - Advanced filtering sidebar
- **ProductSort** - Multiple sorting options

### **Shopping Experience**
- **Cart** - Full shopping cart with quantity management
- **Checkout** - Multi-step checkout process
- **Authentication** - Login/register with OAuth integration

### **Admin Dashboard**
- Sales analytics and charts
- Recent orders management
- Top products display
- Quick action buttons

## 🔧 State Management (Redux Store Shape)
```javascript
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  product: {
    products: Product[],
    currentProduct: Product | null,
    searchResults: Product[],
    filters: FilterObject,
    pagination: PaginationObject,
    loading: boolean,
    error: string | null
  },
  cart: {
    items: CartItem[],
    totalItems: number,
    totalPrice: number,
    loading: boolean,
    error: string | null
  },
  order: {
    orders: Order[],
    currentOrder: Order | null,
    loading: boolean,
    error: string | null
  }
}
```

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Adaptive layouts** for all screen sizes
- **Touch-friendly interactions** for mobile devices

## 🔌 Backend API (Summary)

Base: `http://localhost:4000/api`

### Auth
- POST `/auth/register` – `{ firstName, lastName, email, password }`
- POST `/auth/login` – `{ email, password }`
- GET  `/auth/me` – current user (Bearer token)
- POST `/auth/logout`

### Products (Public)
- GET `/products` – query params: `category, brand, color, sizes, minPrice, maxPrice, minDiscount, sort, pageNumber, pageSize, q`
- GET `/products/:id`
- GET `/products/filters/:category?` – colors, sizes, brands, price range

### Products (Admin)
- POST   `/admin/products`
- PUT    `/admin/products/:id`
- DELETE `/admin/products/:id`

### Cart
- GET    `/cart`
- POST   `/cart/add` – `{ productId, quantity, size, color }`
- PUT    `/cart/items/:id`
- DELETE `/cart/items/:id`
- DELETE `/cart/clear`

### Orders
- GET  `/orders`
- GET  `/orders/:id`
- POST `/orders` – create order

### Seed
- `node scripts/seed.js` (recommended) or an optional `/seed` route (if enabled)

### AI (Optional, local Ollama)
- GET  `/ai/models` – list local models
- POST `/ai/chat` – `{ question | messages[], model?, stream? }`

## 🎨 Design System

### **Color Palette**
- Primary: Indigo (600, 700)
- Success: Green (600, 700)
- Warning: Yellow (600, 700)
- Error: Red (600, 700)
- Gray Scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

### **Typography**
- Font Family: Inter (system font fallback)
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl
- Weights: normal, medium, semibold, bold

### **Spacing**
- Consistent spacing scale: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
- Grid system with gap utilities

## 🚦 Getting Started

### **Prerequisites**
- Node.js 16+ and npm
- Backend API (optional - uses mock data)

### **Installation**
```bash
cd frontend
npm install
npm start
```

### **Available Scripts**
- `npm start` - Development server (port 3000)
- `npm build` - Production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## ⚙️ Environment Variables

### Backend – `backend/.env`
```
MONG_URI=mongodb://127.0.0.1:27017/ecommerce   # or your Atlas URI
PORT=4000
JWT_SECRET=dev_secret
SESSION_COOKIEKEY=dev_session
FRONTEND_ORIGIN=http://localhost:3000

# Optional (Ollama bot)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

### Frontend – `frontend/.env`
```
REACT_APP_API_URL=http://localhost:4000/api
```

### **OAuth Integration**
The authentication system is ready for OAuth integration:
- Google OAuth endpoints configured
- Facebook OAuth endpoints configured
- JWT token handling implemented
- Automatic token refresh ready

## 📊 Mock & Sample Data

Comprehensive mock data included for:
- **Products** - 8+ sample products with images, variants, reviews
- **Categories** - Multiple product categories
- **Users** - Sample user data with addresses
- **Orders** - Order history with different statuses
- **Reviews** - Product reviews and ratings
- **Admin Stats** - Dashboard analytics data

### Sample database JSON for quick testing

We publish a small realistic dataset at `backend/seed-data/products.json`. It matches the schema used by the app.

Minimal product object (example):
```json
{
  "title": "Classic Cotton Tee",
  "description": "Soft, breathable cotton t‑shirt.",
  "price": 999,
  "discountedPrice": 799,
  "discountPersent": 20,
  "quantity": 120,
  "brand": "House",
  "color": "black",
  "sizes": [{ "name": "S", "quantity": 20 }, { "name": "M", "quantity": 30 }],
  "imageUrl": "https://via.placeholder.com/600x600.png?text=Classic+Cotton+Tee",
  "categorySlug": "t-shirts"
}
```

Import options:
```bash
# Option 1 (recommended)
cd E-Commerce-Project/backend
node scripts/seed.js

# Option 2 (admin token required)
curl -X POST http://localhost:4000/api/admin/products \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ADMIN_TOKEN>' \
  -d @backend/seed-data/products.json
```

### Sample database JSON for quick testing

We publish a small but realistic dataset you can import directly. It lives in `backend/seed-data/products.json` and matches the backend schema. Example product:

```json
{
  "title": "Classic Cotton Tee",
  "description": "Soft, breathable cotton t‑shirt.",
  "price": 999,
  "discountedPrice": 799,
  "discountPersent": 20,
  "quantity": 120,
  "brand": "House",
  "color": "black",
  "sizes": [{ "name": "S", "quantity": 20 }, { "name": "M", "quantity": 30 }],
  "imageUrl": "https://via.placeholder.com/600x600.png?text=Classic+Cotton+Tee",
  "categorySlug": "t-shirts"
}
```

Import options:

```bash
# Option 1: seed via script (recommended)
cd E-Commerce-Project/backend
node scripts/seed.js

# Option 2: POST the JSON as admin (auth token required)
curl -X POST http://localhost:4000/api/admin/products \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ADMIN_TOKEN>' \
  -d @backend/seed-data/products.json
```

## 🎯 Production Ready Features

### **Performance**
- Component lazy loading
- Image optimization
- Bundle size optimization
- Redux DevTools integration

### **User Experience**
- Loading states for all async operations
- Error handling with user-friendly messages
- Toast notifications for actions
- Smooth animations and transitions

### **Accessibility**
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

### **SEO Ready**
- Proper meta tags structure
- Semantic HTML
- Crawlable URLs
- Social media meta tags ready

## 🔧 Customization

### **Theming**
- Tailwind configuration in `tailwind.config.js`
- Color scheme easily customizable
- Component styles modular and maintainable

### **Adding Features**
1. Create component in appropriate folder
2. Add Redux slice if state management needed
3. Create service for API integration
4. Add route in App.js
5. Update navigation if needed

## 📈 Future Enhancements

- [ ] Progressive Web App (PWA)
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Live chat integration

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for new components (recommended)
3. Add unit tests for new features
4. Follow the existing code style
5. Update documentation

## 📄 License

MIT

---

Created by **Shubhendra Singh** and **Saloni Mittal**.
