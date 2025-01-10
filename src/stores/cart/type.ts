export interface CartStore {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  clearSelectedItems: () => void;
}
