import { Product, ProductCategory } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Essence Gold Ring',
    price: 120,
    category: ProductCategory.RINGS,
    description: 'A minimal 18k gold band designed for everyday elegance.',
    image: 'https://picsum.photos/seed/ring1/800/800',
    stock: 15,
  },
  {
    id: '2',
    name: 'Lunar Silver Pendant',
    price: 85,
    category: ProductCategory.NECKLACES,
    description: 'Sterling silver pendant inspired by the phases of the moon.',
    image: 'https://picsum.photos/seed/neck1/800/800',
    stock: 20,
  },
  {
    id: '3',
    name: 'Solitaire Diamond Studs',
    price: 450,
    category: ProductCategory.EARRINGS,
    description: 'Classic single diamond studs set in white gold.',
    image: 'https://picsum.photos/seed/ear1/800/800',
    stock: 8,
  },
  {
    id: '4',
    name: 'Helix Cuff Bracelet',
    price: 150,
    category: ProductCategory.BRACELETS,
    description: 'A twisted gold cuff that wraps gently around the wrist.',
    image: 'https://picsum.photos/seed/brace1/800/800',
    stock: 12,
  },
  {
    id: '5',
    name: 'Onyx Signet Ring',
    price: 180,
    category: ProductCategory.RINGS,
    description: 'Bold black onyx set in a thick silver band.',
    image: 'https://picsum.photos/seed/ring2/800/800',
    stock: 5,
  },
  {
    id: '6',
    name: 'Pearl Drop Chain',
    price: 95,
    category: ProductCategory.NECKLACES,
    description: 'Freshwater pearl suspended on a delicate gold chain.',
    image: 'https://picsum.photos/seed/neck2/800/800',
    stock: 25,
  },
];

export const MOCK_ADMIN_USER = {
  id: 'admin-1',
  email: 'admin@lumiere.com',
  name: 'Admin User',
  isAdmin: true,
};

export const MOCK_CUSTOMER_USER = {
  id: 'user-1',
  email: 'jane@example.com',
  name: 'Jane Doe',
  isAdmin: false,
};
