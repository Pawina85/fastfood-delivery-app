'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser } from './useClerkSafe';
import { CartItem } from './CartContext';

// Types
export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'cash';
  last4?: string;
  cardBrand?: string;
  label: string;
  isDefault: boolean;
}

export interface OrderHistoryItem {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  status: 'delivered' | 'preparing' | 'delivering' | 'cancelled';
  deliveryAddress: string;
  restaurantName: string;
}

export interface UserProfile {
  addresses: SavedAddress[];
  paymentMethods: PaymentMethod[];
  orderHistory: OrderHistoryItem[];
  favoriteRestaurants: number[];
}

interface UserContextType {
  profile: UserProfile;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  addToOrderHistory: (order: Omit<OrderHistoryItem, 'id' | 'date'>) => void;
  toggleFavoriteRestaurant: (restaurantId: number) => void;
  getDefaultAddress: () => SavedAddress | undefined;
  getDefaultPaymentMethod: () => PaymentMethod | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock data for demonstration
const mockAddresses: SavedAddress[] = [
  { id: '1', label: 'Home', address: '123 Main Street, Apt 4B, New York, NY 10001', isDefault: true },
  { id: '2', label: 'Work', address: '456 Business Ave, Floor 12, New York, NY 10002', isDefault: false },
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', type: 'card', last4: '4242', cardBrand: 'Visa', label: 'Personal Card', isDefault: true },
  { id: '2', type: 'card', last4: '8888', cardBrand: 'Mastercard', label: 'Business Card', isDefault: false },
  { id: '3', type: 'cash', label: 'Cash on Delivery', isDefault: false },
];

const mockOrderHistory: OrderHistoryItem[] = [
  {
    id: 'ORD-001',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    items: [
      { id: '1', restaurantId: 1, restaurantName: 'Pizza Paradise', itemName: 'Margherita Pizza', quantity: 2, price: 14.99, image: '🍕' },
    ],
    total: 32.97,
    status: 'delivered',
    deliveryAddress: '123 Main Street, Apt 4B',
    restaurantName: 'Pizza Paradise',
  },
  {
    id: 'ORD-002',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    items: [
      { id: '2', restaurantId: 2, restaurantName: 'Burger House', itemName: 'Classic Cheeseburger', quantity: 1, price: 11.99, image: '🍔' },
      { id: '3', restaurantId: 2, restaurantName: 'Burger House', itemName: 'Fries', quantity: 1, price: 4.99, image: '🍟' },
    ],
    total: 19.97,
    status: 'delivered',
    deliveryAddress: '456 Business Ave, Floor 12',
    restaurantName: 'Burger House',
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    addresses: [],
    paymentMethods: [],
    orderHistory: [],
    favoriteRestaurants: [1, 3],
  });

  // Load mock data when user signs in
  useEffect(() => {
    if (isSignedIn) {
      setProfile({
        addresses: mockAddresses,
        paymentMethods: mockPaymentMethods,
        orderHistory: mockOrderHistory,
        favoriteRestaurants: [1, 3],
      });
    } else {
      setProfile({
        addresses: [],
        paymentMethods: [],
        orderHistory: [],
        favoriteRestaurants: [],
      });
    }
  }, [isSignedIn]);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const addAddress = (address: Omit<SavedAddress, 'id'>) => {
    const newAddress: SavedAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      addresses: address.isDefault
        ? [...prev.addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
        : [...prev.addresses, newAddress],
    }));
  };

  const removeAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
  };

  const setDefaultAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    }));
  };

  const addPaymentMethod = (method: Omit<PaymentMethod, 'id'>) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: `pay-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      paymentMethods: method.isDefault
        ? [...prev.paymentMethods.map((p) => ({ ...p, isDefault: false })), newMethod]
        : [...prev.paymentMethods, newMethod],
    }));
  };

  const removePaymentMethod = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((p) => p.id !== id),
    }));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((p) => ({
        ...p,
        isDefault: p.id === id,
      })),
    }));
  };

  const addToOrderHistory = (order: Omit<OrderHistoryItem, 'id' | 'date'>) => {
    const newOrder: OrderHistoryItem = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date(),
    };
    setProfile((prev) => ({
      ...prev,
      orderHistory: [newOrder, ...prev.orderHistory],
    }));
  };

  const toggleFavoriteRestaurant = (restaurantId: number) => {
    setProfile((prev) => ({
      ...prev,
      favoriteRestaurants: prev.favoriteRestaurants.includes(restaurantId)
        ? prev.favoriteRestaurants.filter((id) => id !== restaurantId)
        : [...prev.favoriteRestaurants, restaurantId],
    }));
  };

  const getDefaultAddress = () => profile.addresses.find((a) => a.isDefault);
  const getDefaultPaymentMethod = () => profile.paymentMethods.find((p) => p.isDefault);

  return (
    <UserContext.Provider
      value={{
        profile,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        addToOrderHistory,
        toggleFavoriteRestaurant,
        getDefaultAddress,
        getDefaultPaymentMethod,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
}
