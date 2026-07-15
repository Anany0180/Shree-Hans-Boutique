import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, StitchingInquiry, User, Order, ActiveTab } from '../types';

interface AppContextType {
  cart: CartItem[];
  user: User | null;
  activeTab: ActiveTab;
  selectedProduct: Product | null;
  selectedCategory: string | null;
  searchQuery: string;
  inquiries: StitchingInquiry[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  loginUser: (email: string, name: string) => boolean;
  registerUser: (name: string, email: string, phone: string, address: string) => boolean;
  logoutUser: () => void;
  updateUserAddress: (address: string, phone: string) => void;
  createOrder: (paymentMethod: 'COD' | 'UPI', shippingDetails: { name: string; phone: string; address: string; city: string; pincode: string }) => Order;
  submitInquiry: (inquiryData: Omit<StitchingInquiry, 'id' | 'status' | 'createdAt'>) => StitchingInquiry;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to initialize local storage safely
const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading localStorage key', key, error);
    return defaultValue;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => getLocalStorageItem<CartItem[]>('shree_hans_cart', []));
  const [user, setUser] = useState<User | null>(() => getLocalStorageItem<User | null>('shree_hans_user', null));
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inquiries, setInquiries] = useState<StitchingInquiry[]>(() => getLocalStorageItem<StitchingInquiry[]>('shree_hans_inquiries', []));

  // Sync state to localStorage when changed
  useEffect(() => {
    localStorage.setItem('shree_hans_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shree_hans_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shree_hans_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Handle custom smooth top scrolling on tab change
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: Math.min(newQuantity, product.stock),
        };
        return newCart;
      }

      return [...prevCart, { product, selectedSize: size, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (email: string, name: string): boolean => {
    const formattedEmail = email.trim().toLowerCase();
    const mockUser: User = {
      name: name || 'Valued Guest',
      email: formattedEmail,
      phone: '+91 9876543210',
      address: 'Kali Mandir Road, Mughalsarai, Uttar Pradesh - 232101',
      orderHistory: getLocalStorageItem<Order[]>(`shree_hans_orders_${formattedEmail}`, [
        // Populate one dummy historic order to make the history screen look active and beautiful
        {
          id: 'ORD-84920',
          items: [
            {
              productName: 'Kashmiri Embroidered Chanderi Suit Set',
              category: 'Suits',
              price: 2450,
              quantity: 1,
              size: 'M',
              image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
            },
            {
              productName: 'Homemade Mango Pickle (Aam ka Aachar)',
              category: 'Aachar',
              price: 220,
              quantity: 1,
              size: '500g',
              image: 'https://images.unsplash.com/photo-1589135306090-e55524b942f1?w=600&auto=format&fit=crop&q=80',
            }
          ],
          totalAmount: 2670,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'), // 30 days ago
          status: 'Delivered',
          paymentMethod: 'COD',
          shippingAddress: {
            name: name || 'Valued Guest',
            phone: '+91 9876543210',
            address: 'Kali Mandir Road',
            city: 'Mughalsarai',
            pincode: '232101'
          }
        }
      ]),
    };
    setUser(mockUser);
    return true;
  };

  const registerUser = (name: string, email: string, phone: string, address: string): boolean => {
    const formattedEmail = email.trim().toLowerCase();
    const newUser: User = {
      name,
      email: formattedEmail,
      phone: phone || '+91 9876543210',
      address: address || 'Kali Mandir Road, Mughalsarai, Uttar Pradesh - 232101',
      orderHistory: [],
    };
    setUser(newUser);
    return true;
  };

  const logoutUser = () => {
    setUser(null);
  };

  const updateUserAddress = (address: string, phone: string) => {
    if (!user) return;
    const updatedUser = { ...user, address, phone };
    setUser(updatedUser);
  };

  const createOrder = (
    paymentMethod: 'COD' | 'UPI',
    shippingDetails: { name: string; phone: string; address: string; city: string; pincode: string }
  ): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      items: cart.map((item) => ({
        productName: item.product.name,
        category: item.product.category,
        price: item.product.price,
        quantity: item.product.quantity,
        size: item.selectedSize,
        image: item.product.image,
      })),
      totalAmount: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Processing',
      paymentMethod,
      shippingAddress: shippingDetails,
    };

    if (user) {
      const updatedHistory = [newOrder, ...user.orderHistory];
      const updatedUser = { ...user, orderHistory: updatedHistory };
      setUser(updatedUser);
      // Save order history persistent per user email in localStorage
      localStorage.setItem(`shree_hans_orders_${user.email.toLowerCase()}`, JSON.stringify(updatedHistory));
    } else {
      // If guest checkout, store standard guest order history
      const guestOrders = getLocalStorageItem<Order[]>('shree_hans_guest_orders', []);
      localStorage.setItem('shree_hans_guest_orders', JSON.stringify([newOrder, ...guestOrders]));
    }

    clearCart();
    return newOrder;
  };

  const submitInquiry = (inquiryData: Omit<StitchingInquiry, 'id' | 'status' | 'createdAt'>): StitchingInquiry => {
    const newInquiry: StitchingInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        user,
        activeTab,
        selectedProduct,
        selectedCategory,
        searchQuery,
        inquiries,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        loginUser,
        registerUser,
        logoutUser,
        updateUserAddress,
        createOrder,
        submitInquiry,
        setActiveTab,
        setSelectedProduct,
        setSelectedCategory,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
