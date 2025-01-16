import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore } from './type';

const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      selectedItems: [],
      setSelectedItems: (items) => set({ selectedItems: items }),
      clearSelectedItems: () => set({ selectedItems: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
