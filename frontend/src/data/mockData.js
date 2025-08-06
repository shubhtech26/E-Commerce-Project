// Mock Products Data
export const mockProducts = [
  {
    _id: '1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f37f5953?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'men',
    subcategory: 't-shirts',
    brand: 'EcoWear',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 50,
    tags: ['casual', 'organic', 'basic'],
    featured: true
  },
  {
    _id: '2',
    name: 'Women\'s Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer occasions. Lightweight and breathable fabric.',
    price: 79.99,
    originalPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'women',
    subcategory: 'dresses',
    brand: 'FloralFash',
    colors: ['Blue', 'Pink', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 25,
    tags: ['summer', 'floral', 'casual'],
    featured: true
  },
  {
    _id: '3',
    name: 'Men\'s Denim Jeans',
    description: 'Classic fit denim jeans with a modern twist. Durable construction and comfortable fit.',
    price: 89.99,
    originalPrice: 120.00,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'men',
    subcategory: 'jeans',
    brand: 'DenimCo',
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.3,
    reviewCount: 234,
    inStock: true,
    stockQuantity: 75,
    tags: ['denim', 'casual', 'classic'],
    featured: false
  },
  {
    _id: '4',
    name: 'Women\'s Leather Handbag',
    description: 'Elegant leather handbag with multiple compartments. Perfect for work or casual outings.',
    price: 149.99,
    originalPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'women',
    subcategory: 'bags',
    brand: 'LuxeLeather',
    colors: ['Brown', 'Black', 'Tan'],
    sizes: ['One Size'],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 30,
    tags: ['leather', 'handbag', 'luxury'],
    featured: true
  },
  {
    _id: '5',
    name: 'Running Sneakers',
    description: 'High-performance running sneakers with advanced cushioning technology.',
    price: 129.99,
    originalPrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'shoes',
    subcategory: 'sneakers',
    brand: 'RunTech',
    colors: ['White', 'Black', 'Blue'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    stockQuantity: 100,
    tags: ['running', 'sports', 'comfortable'],
    featured: true
  },
  // Add more products...
  {
    _id: '6',
    name: 'Casual Button-Up Shirt',
    description: 'Versatile button-up shirt suitable for both casual and semi-formal occasions.',
    price: 59.99,
    originalPrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'men',
    subcategory: 'shirts',
    brand: 'ClassicWear',
    colors: ['Blue', 'White', 'Light Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 40,
    tags: ['shirt', 'casual', 'button-up'],
    featured: false
  },
  {
    _id: '7',
    name: 'Women\'s Yoga Pants',
    description: 'Comfortable and flexible yoga pants made from moisture-wicking fabric.',
    price: 49.99,
    originalPrice: 69.99,
    images: [
      'https://images.unsplash.com/photo-1506629905773-f61b2e485eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'women',
    subcategory: 'activewear',
    brand: 'YogaFlex',
    colors: ['Black', 'Navy', 'Purple'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
    stockQuantity: 60,
    tags: ['yoga', 'activewear', 'comfortable'],
    featured: false
  },
  {
    _id: '8',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'SoundTech',
    colors: ['Black', 'White', 'Silver'],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 445,
    inStock: true,
    stockQuantity: 25,
    tags: ['electronics', 'audio', 'wireless'],
    featured: true
  }
];

// Mock Categories
export const mockCategories = [
  { id: 'men', name: 'Men', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 'women', name: 'Women', image: 'https://images.unsplash.com/photo-1494790108755-2616c0e2b1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 'shoes', name: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
];

// Mock User Data
export const mockUser = {
  _id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  addresses: [
    {
      _id: 'addr1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true
    },
    {
      _id: 'addr2',
      type: 'work',
      firstName: 'John',
      lastName: 'Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA',
      isDefault: false
    }
  ],
  preferences: {
    newsletter: true,
    notifications: true,
    theme: 'light'
  }
};

// Mock Orders
export const mockOrders = [
  {
    _id: 'order1',
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    orderDate: '2024-01-15T10:30:00Z',
    deliveryDate: '2024-01-18T14:00:00Z',
    items: [
      {
        _id: 'item1',
        product: mockProducts[0],
        quantity: 2,
        size: 'M',
        color: 'White',
        price: 29.99
      },
      {
        _id: 'item2',
        product: mockProducts[2],
        quantity: 1,
        size: '32',
        color: 'Blue',
        price: 89.99
      }
    ],
    shippingAddress: mockUser.addresses[0],
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'visa'
    },
    subtotal: 149.97,
    shipping: 9.99,
    tax: 12.80,
    total: 172.76,
    tracking: {
      number: 'TRK123456789',
      carrier: 'FedEx',
      status: 'delivered'
    }
  },
  {
    _id: 'order2',
    orderNumber: 'ORD-2024-002',
    status: 'shipped',
    orderDate: '2024-01-20T09:15:00Z',
    estimatedDelivery: '2024-01-25T17:00:00Z',
    items: [
      {
        _id: 'item3',
        product: mockProducts[1],
        quantity: 1,
        size: 'M',
        color: 'Blue',
        price: 79.99
      }
    ],
    shippingAddress: mockUser.addresses[0],
    paymentMethod: {
      type: 'card',
      last4: '1234',
      brand: 'mastercard'
    },
    subtotal: 79.99,
    shipping: 9.99,
    tax: 7.20,
    total: 97.18,
    tracking: {
      number: 'TRK987654321',
      carrier: 'UPS',
      status: 'in_transit'
    }
  }
];

// Mock Reviews
export const mockReviews = [
  {
    _id: 'review1',
    productId: '1',
    user: {
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0e2b1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    rating: 5,
    title: 'Excellent quality!',
    comment: 'This t-shirt is incredibly soft and comfortable. The fit is perfect and the quality is outstanding.',
    date: '2024-01-10T12:00:00Z',
    verified: true,
    helpful: 23
  },
  {
    _id: 'review2',
    productId: '1',
    user: {
      name: 'Mike Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    rating: 4,
    title: 'Good value for money',
    comment: 'Nice t-shirt, good quality fabric. Runs slightly large so consider sizing down.',
    date: '2024-01-08T15:30:00Z',
    verified: true,
    helpful: 15
  }
];

// Mock Cart Data
export const mockCart = {
  items: [
    {
      _id: 'cart1',
      product: mockProducts[0],
      quantity: 2,
      size: 'M',
      color: 'White',
      price: 29.99
    },
    {
      _id: 'cart2',
      product: mockProducts[4],
      quantity: 1,
      size: '10',
      color: 'White',
      price: 129.99
    }
  ],
  totalItems: 3,
  totalPrice: 189.97
};

// Mock Wishlist
export const mockWishlist = [
  mockProducts[1],
  mockProducts[3],
  mockProducts[7]
];

// Mock Admin Data
export const mockAdminStats = {
  totalRevenue: 125000,
  totalOrders: 1250,
  totalCustomers: 3500,
  totalProducts: 450,
  revenueGrowth: 12.5,
  orderGrowth: 8.3,
  customerGrowth: 15.2,
  productGrowth: 5.7,
  recentOrders: mockOrders,
  topProducts: mockProducts.slice(0, 5),
  salesData: [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Apr', sales: 22000 },
    { month: 'May', sales: 25000 },
    { month: 'Jun', sales: 28000 }
  ]
};

// Mock Coupons
export const mockCoupons = [
  {
    _id: 'coupon1',
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minAmount: 50,
    expiryDate: '2024-12-31T23:59:59Z',
    description: '10% off on orders above $50'
  },
  {
    _id: 'coupon2',
    code: 'FREESHIP',
    discount: 9.99,
    type: 'fixed',
    minAmount: 30,
    expiryDate: '2024-12-31T23:59:59Z',
    description: 'Free shipping on orders above $30'
  }
];

const allMockData = {
  mockProducts,
  mockCategories,
  mockUser,
  mockOrders,
  mockReviews,
  mockCart,
  mockWishlist,
  mockAdminStats,
  mockCoupons
};

export default allMockData;