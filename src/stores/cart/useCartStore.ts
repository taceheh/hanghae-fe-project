import { create } from 'zustand';
import { CartStore } from './type';

const useCartStore = create<CartStore>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
  clearSelectedItems: () =>
    set({
      selectedItems: [],
    }),
}));
export default useCartStore;
