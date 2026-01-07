'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';

// Order types with enhanced status tracking
export type OrderStatus = 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Date;
  message: string;
}

export interface Order {
  id: string;
  restaurantId: number;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  status: OrderStatus;
  estimatedDelivery: string;
  createdAt: Date;
  timeline: OrderTimeline[];
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'timeline'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  reorderItems: (orderId: string) => OrderItem[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const STORAGE_KEY = 'fastfood_orders';

// Generate mock orders for demo
const generateMockOrders = (): Order[] => {
  const now = new Date();

  return [
    {
      id: 'ORD-1001',
      restaurantId: 1,
      restaurantName: 'Pizza Paradise',
      restaurantImage: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
      items: [
        { id: '1', name: 'Margherita Pizza', quantity: 2, price: 14.99, image: '🍕' },
        { id: '2', name: 'Garlic Bread', quantity: 1, price: 5.99, image: '🥖' },
      ],
      subtotal: 35.97,
      deliveryFee: 2.99,
      total: 38.96,
      deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      status: 'delivered',
      estimatedDelivery: '25-35 min',
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      timeline: [
        { status: 'confirmed', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), message: 'Order confirmed' },
        { status: 'preparing', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000), message: 'Restaurant is preparing your order' },
        { status: 'on_the_way', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000), message: 'Your order is on the way' },
        { status: 'delivered', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 35 * 60 * 1000), message: 'Order delivered' },
      ],
    },
    {
      id: 'ORD-1002',
      restaurantId: 2,
      restaurantName: 'Burger House',
      restaurantImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      items: [
        { id: '1', name: 'Classic Cheeseburger', quantity: 1, price: 11.99, image: '🍔' },
        { id: '2', name: 'Crispy Fries', quantity: 1, price: 4.99, image: '🍟' },
        { id: '3', name: 'Chocolate Milkshake', quantity: 1, price: 5.99, image: '🥤' },
      ],
      subtotal: 22.97,
      deliveryFee: 2.99,
      total: 25.96,
      deliveryAddress: '456 Business Ave, Floor 12, New York, NY 10002',
      status: 'delivered',
      estimatedDelivery: '20-30 min',
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      timeline: [
        { status: 'confirmed', timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), message: 'Order confirmed' },
        { status: 'preparing', timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000), message: 'Restaurant is preparing your order' },
        { status: 'on_the_way', timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000), message: 'Your order is on the way' },
        { status: 'delivered', timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 28 * 60 * 1000), message: 'Order delivered' },
      ],
    },
    {
      id: 'ORD-1003',
      restaurantId: 3,
      restaurantName: 'Sushi Master',
      restaurantImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
      items: [
        { id: '1', name: 'Dragon Roll', quantity: 2, price: 16.99, image: '🍣' },
        { id: '2', name: 'Miso Soup', quantity: 2, price: 3.99, image: '🍜' },
      ],
      subtotal: 41.96,
      deliveryFee: 2.99,
      total: 44.95,
      deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      status: 'preparing',
      estimatedDelivery: '30-40 min',
      createdAt: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
      timeline: [
        { status: 'confirmed', timestamp: new Date(now.getTime() - 30 * 60 * 1000), message: 'Order confirmed' },
        { status: 'preparing', timestamp: new Date(now.getTime() - 25 * 60 * 1000), message: 'Restaurant is preparing your order' },
      ],
    },
  ];
};

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedOrders = JSON.parse(stored, (key, value) => {
          // Convert date strings back to Date objects
          if (key === 'createdAt' || key === 'timestamp') {
            return new Date(value);
          }
          return value;
        });
        setOrders(parsedOrders);
      } else {
        // Initialize with mock orders for demo
        const mockOrders = generateMockOrders();
        setOrders(mockOrders);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));
      }
    } catch (error) {
      console.error('Failed to load orders from localStorage:', error);
      const mockOrders = generateMockOrders();
      setOrders(mockOrders);
    }
    setIsInitialized(true);
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error('Failed to save orders to localStorage:', error);
      }
    }
  }, [orders, isInitialized]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'timeline'>): Order => {
    const now = new Date();
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: now,
      timeline: [
        { status: 'confirmed', timestamp: now, message: 'Order confirmed' },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const now = new Date();
          const statusMessages: Record<OrderStatus, string> = {
            confirmed: 'Order confirmed',
            preparing: 'Restaurant is preparing your order',
            on_the_way: 'Your order is on the way',
            delivered: 'Order delivered',
            cancelled: 'Order cancelled',
          };

          return {
            ...order,
            status,
            timeline: [
              ...order.timeline,
              { status, timestamp: now, message: statusMessages[status] },
            ],
          };
        }
        return order;
      })
    );
  };

  const reorderItems = (orderId: string): OrderItem[] => {
    const order = getOrderById(orderId);
    return order?.items || [];
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        updateOrderStatus,
        reorderItems,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}

// Helper function to convert CartItems to OrderItems
export function cartItemsToOrderItems(items: CartItem[]): OrderItem[] {
  return items.map((item) => ({
    id: item.id,
    name: item.itemName,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  }));
}
