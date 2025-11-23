export enum ProductCategory {
  RINGS = 'Rings',
  NECKLACES = 'Necklaces',
  EARRINGS = 'Earrings',
  BRACELETS = 'Bracelets',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface AiRecommendationResponse {
  recommendedProductIds: string[];
  reasoning: string;
}