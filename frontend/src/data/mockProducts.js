export const mockProducts = {
  women: {
    tops: [
      {
        id: 'wt1',
        name: 'Floral Print Blouse',
        price: 49.99,
        description: 'Elegant floral print blouse with short sleeves',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        category: 'women/tops',
        rating: 4.5,
        reviews: 128,
        inStock: true,
      },
      {
        id: 'wt2',
        name: 'Silk V-Neck Top',
        price: 59.99,
        description: 'Luxurious silk top with V-neck design',
        image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        category: 'women/tops',
        rating: 4.3,
        reviews: 95,
        inStock: true,
      },
      // Add more tops...
    ],
    dresses: [
      {
        id: 'wd1',
        name: 'Summer Floral Dress',
        price: 79.99,
        description: 'Light and breezy summer dress with floral pattern',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        category: 'women/dresses',
        rating: 4.7,
        reviews: 156,
        inStock: true,
      },
      {
        id: 'wd2',
        name: 'Evening Cocktail Dress',
        price: 129.99,
        description: 'Elegant black cocktail dress for special occasions',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        category: 'women/dresses',
        rating: 4.8,
        reviews: 203,
        inStock: true,
      },
      // Add more dresses...
    ],
    shoes: {
      sneakers: [
        {
          id: 'ws1',
          name: 'Classic White Sneakers',
          price: 89.99,
          description: 'Comfortable white sneakers for everyday wear',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          category: 'women/shoes/sneakers',
          rating: 4.6,
          reviews: 245,
          inStock: true,
        },
        {
          id: 'ws2',
          name: 'Running Performance Shoes',
          price: 119.99,
          description: 'High-performance running shoes with cushioning',
          image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          category: 'women/shoes/sneakers',
          rating: 4.8,
          reviews: 189,
          inStock: true,
        },
      ],
      heels: [
        {
          id: 'wh1',
          name: 'Classic Black Pumps',
          price: 99.99,
          description: 'Timeless black pumps with 3-inch heel',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          category: 'women/shoes/heels',
          rating: 4.4,
          reviews: 167,
          inStock: true,
        },
      ],
    },
  },
  men: {
    shirts: [
      {
        id: 'ms1',
        name: 'Oxford Button-Down Shirt',
        price: 69.99,
        description: 'Classic Oxford shirt in light blue',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        category: 'men/shirts',
        rating: 4.5,
        reviews: 178,
        inStock: true,
      },
      {
        id: 'ms2',
        name: 'Casual Linen Shirt',
        price: 59.99,
        description: 'Comfortable linen shirt for summer',
        image: 'https://images.unsplash.com/photo-1596755094661-76c4d8c2c0f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        category: 'men/shirts',
        rating: 4.3,
        reviews: 145,
        inStock: true,
      },
    ],
    shoes: {
      sneakers: [
        {
          id: 'msk1',
          name: 'Urban Street Sneakers',
          price: 99.99,
          description: 'Modern street-style sneakers',
          image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          category: 'men/shoes/sneakers',
          rating: 4.7,
          reviews: 234,
          inStock: true,
        },
        {
          id: 'msk2',
          name: 'Athletic Running Shoes',
          price: 129.99,
          description: 'Professional running shoes with support',
          image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          category: 'men/shoes/sneakers',
          rating: 4.9,
          reviews: 312,
          inStock: true,
        },
      ],
      boots: [
        {
          id: 'mb1',
          name: 'Leather Chelsea Boots',
          price: 149.99,
          description: 'Classic leather Chelsea boots in brown',
          image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          category: 'men/shoes/boots',
          rating: 4.8,
          reviews: 189,
          inStock: true,
        },
      ],
    },
  },
};

export const getProductsByCategory = (category) => {
  if (!category) return [];
  
  const parts = category.split('/').filter(Boolean);
  let products = mockProducts;
  
  // Handle root categories (men, women)
  if (parts.length === 1) {
    const rootCategory = products[parts[0]];
    if (!rootCategory) return [];
    
    // Flatten all subcategories
    return Object.values(rootCategory)
      .flatMap(subcategory => 
        Array.isArray(subcategory) ? subcategory : 
        typeof subcategory === 'object' ? Object.values(subcategory).flat() : 
        []
      );
  }
  
  // Navigate through the category path
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!products[part]) {
      return [];
    }
    products = products[part];
    
    // If we've reached an array of products, return it
    if (Array.isArray(products)) {
      return products;
    }
  }
  
  // If we've reached an object containing product arrays (like shoes subcategories)
  if (typeof products === 'object') {
    return Object.values(products)
      .flatMap(subcategory => Array.isArray(subcategory) ? subcategory : []);
  }
  
  return [];
};

export const getProductById = (productId) => {
  const allProducts = [
    ...getProductsByCategory('women/tops'),
    ...getProductsByCategory('women/dresses'),
    ...getProductsByCategory('women/shoes/sneakers'),
    ...getProductsByCategory('women/shoes/heels'),
    ...getProductsByCategory('men/shirts'),
    ...getProductsByCategory('men/shoes/sneakers'),
    ...getProductsByCategory('men/shoes/boots'),
  ];
  
  return allProducts.find(product => product.id === productId);
};