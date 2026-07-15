export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Suits' | 'Sarees' | 'Nighty' | 'Night Suits' | 'Bedsheets' | 'Slippers' | 'Gift Items' | 'Aachar' | 'Papad';
  image: string;
  sizes?: string[]; // Standard clothing sizes (S, M, L, XL, XXL) or weights for food/pickles (250g, 500g, 1kg)
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface StitchingInquiry {
  id: string;
  name: string;
  phone: string;
  garmentType: string;
  measurements: string;
  notes: string;
  preferredDate: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orderHistory: Order[];
}

export interface Order {
  id: string;
  items: {
    productName: string;
    category: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }[];
  totalAmount: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'COD' | 'UPI';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
}

export type ActiveTab = 'home' | 'shop' | 'services' | 'about' | 'contact' | 'cart' | 'profile';
