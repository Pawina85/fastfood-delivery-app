'use client';

import { useState } from 'react';
import { useUserProfile } from './UserContext';
import Button from './Button';
import Input from './Input';

type Tab = 'addresses' | 'payments' | 'orders';

export default function UserProfileModal() {
  const {
    profile,
    isProfileModalOpen,
    closeProfileModal,
    addAddress,
    removeAddress,
    setDefaultAddress,
    removePaymentMethod,
    setDefaultPaymentMethod,
  } = useUserProfile();

  const [activeTab, setActiveTab] = useState<Tab>('addresses');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressLabel, setNewAddressLabel] = useState('');
  const [newAddressValue, setNewAddressValue] = useState('');

  if (!isProfileModalOpen) return null;

  const handleAddAddress = () => {
    if (newAddressLabel && newAddressValue) {
      addAddress({
        label: newAddressLabel,
        address: newAddressValue,
        isDefault: profile.addresses.length === 0,
      });
      setNewAddressLabel('');
      setNewAddressValue('');
      setIsAddingAddress(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={closeProfileModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">My Account</h2>
            <button
              onClick={closeProfileModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'addresses'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Addresses
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'payments'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Order History
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                {profile.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-xl border-2 ${
                      address.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{address.label}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{address.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-sm text-orange-500 hover:text-orange-600"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => removeAddress(address.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Address */}
                {isAddingAddress ? (
                  <div className="p-4 rounded-xl border-2 border-dashed border-gray-300 space-y-3">
                    <Input
                      placeholder="Label (e.g., Home, Work)"
                      value={newAddressLabel}
                      onChange={(e) => setNewAddressLabel(e.target.value)}
                    />
                    <Input
                      placeholder="Full address"
                      value={newAddressValue}
                      onChange={(e) => setNewAddressValue(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" onClick={handleAddAddress}>
                        Save Address
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors"
                  >
                    + Add New Address
                  </button>
                )}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                {profile.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-xl border-2 ${
                      method.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {method.type === 'card' ? (
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{method.label}</span>
                            {method.isDefault && (
                              <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          {method.last4 && (
                            <p className="text-sm text-gray-500">
                              {method.cardBrand} ending in {method.last4}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => setDefaultPaymentMethod(method.id)}
                            className="text-sm text-orange-500 hover:text-orange-600"
                          >
                            Set Default
                          </button>
                        )}
                        {method.type !== 'cash' && (
                          <button
                            onClick={() => removePaymentMethod(method.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <p className="text-sm text-gray-500 text-center mt-4">
                  Payment methods are securely stored. Add new cards during checkout.
                </p>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {profile.orderHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>No orders yet</p>
                  </div>
                ) : (
                  profile.orderHistory.map((order) => (
                    <div key={order.id} className="p-4 rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{order.restaurantName}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.image} {item.itemName} x {item.quantity}</span>
                            <span>฿{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-3 pt-3 border-t">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-orange-500">฿{order.total.toFixed(2)}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Reorder
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
