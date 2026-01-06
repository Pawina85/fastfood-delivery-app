'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DeliveryContextType {
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  showToast: boolean;
  toastMessage: string;
  showToastNotification: (message: string) => void;
  hideToast: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

const STORAGE_KEY = 'fastfood_delivery_address';

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [deliveryAddress, setDeliveryAddressState] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load address from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDeliveryAddressState(saved);
    }
  }, []);

  const setDeliveryAddress = (address: string) => {
    setDeliveryAddressState(address);
    localStorage.setItem(STORAGE_KEY, address);
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  return (
    <DeliveryContext.Provider
      value={{
        deliveryAddress,
        setDeliveryAddress,
        showToast,
        toastMessage,
        showToastNotification,
        hideToast,
      }}
    >
      {children}
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toastMessage}</span>
            <button onClick={hideToast} className="ml-2 text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
}
