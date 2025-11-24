import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  productName: string;
  productImageUrls: string[];
  unitPrice: number;
  discount: number;
  quantity: number;
  productUrls: string;
  stockQuantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => { success: boolean; error?: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => { success: boolean; error?: string };
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const state = get();
        const existingItem = state.items.find(
          (item) => item.productId === product.productId
        );

        const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

        // Check if we exceed stock
        if (newQuantity > product.stockQuantity) {
          return {
            success: false,
            error: `Only ${product.stockQuantity} items available in stock`
          };
        }

        set((state) => {
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity }],
          };
        });

        return { success: true };
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return { success: true };
        }

        const state = get();
        const item = state.items.find((item) => item.productId === productId);

        if (!item) {
          return { success: false, error: 'Item not found in cart' };
        }

        // Check if we exceed stock
        if (quantity > item.stockQuantity) {
          return {
            success: false,
            error: `Only ${item.stockQuantity} items available in stock`
          };
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));

        return { success: true };
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const discountedPrice = item.unitPrice * (1 - item.discount / 100);
          return total + discountedPrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'black-friday-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
