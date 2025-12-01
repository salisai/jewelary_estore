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
  image: string | File | null;
  stock: number;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'failed';
  stripeSessionId?: string;
}

export interface AiRecommendationResponse {
  recommendedProductIds: string[];
  reasoning: string;
}