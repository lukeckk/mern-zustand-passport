import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(    // 'persist' is used to store state in local storage
    (set, get) => ({
      // State
      items: [],

      // Actions
      addToCart: (product) => {
        set((state) => {
          // Check if product already exists in cart
          const existingItem = state.items.find(item => item._id === product._id);

          if (existingItem) {
            // If exists, increase quantity
            return {
              items: state.items.map(item =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }

          // If new item, add to cart with quantity 1
          return {
            items: [...state.items, { ...product, quantity: 1 }]
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item._id !== productId)
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Selectors
      getCartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getCartTotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
    }
  )
);

export default useCartStore; 