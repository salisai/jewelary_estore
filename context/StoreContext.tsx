import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { supabase } from '../lib/supabaseClient';


interface StoreContextType {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  login: (email: string, password?: string, isSignUp?: boolean) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  placeOrder: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  //fetch on mount
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {//save into state
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'User',
          isAdmin: true
        });
        fetchOrders(session.user.id);
      }

      // fetch products
      const { data: productsData } = await supabase.from('products').select('*');
      if (productsData) {
        setProducts(productsData);
      }
    };

    init();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: 'User',
          isAdmin: true
        });
        fetchOrders(session.user.id);
        //no session
      } else {
        setUser(null);
        setOrders([]);
      }
    });

    // Load cart from local storage
    const savedCart = localStorage.getItem('lumiere_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    return () => subscription.unsubscribe();
  }, []);


  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(cart));
  }, [cart]);

  const fetchOrders = async (userId: string) => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) {
      setOrders(data.map((o: any) => ({
        id: o.id,
        userId: o.user_id,
        items: o.items,
        total: o.total,
        date: o.created_at,
        status: o.status
      })));
    }
  };

  const login = async (email: string, password?: string, isSignUp?: boolean) => {
    if (!password) return { error: 'Password required' };
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error };
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setOrders([]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addProduct = async (product: Product) => {
    // Remove ID so Supabase generates it
    const { id, ...newProduct } = product;
    const { data, error } = await supabase.from('products').insert([newProduct]).select();
    
    if (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product to database.');
      return;
    }

    if (data) {
      setProducts((prev) => [...prev, data[0] as Product]);
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };


  const placeOrder = async () => {
    if (!user) return;
    
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const { data, error } = await supabase.from('orders').insert([{
      user_id: user.id,
      total: total,
      items: cart,
      status: 'pending'
    }]).select();

    if (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
      return;
    }

    //update state
    if (data) {
      setOrders((prev) => [{
        id: data[0].id,
        userId: data[0].user_id,
        items: data[0].items,
        total: data[0].total,
        date: data[0].created_at,
        status: data[0].status
      }, ...prev]);
      //after successful checkout.
      clearCart();
    }
  };

  //upload image file not url.
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage.from("product-images").upload(fileName,file);
    if (error) throw error;

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return urlData.publicUrl;
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        products,
        cart,
        orders,
        isCartOpen,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        addProduct,
        deleteProduct,
        placeOrder,
        uploadImage
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};