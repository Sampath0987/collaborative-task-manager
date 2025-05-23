import { create } from "zustand";

interface FilterState {
  search: string;
  status: string;
  priority: string;
  setSearch: (val: string) => void;
  setStatus: (val: string) => void;
  setPriority: (val: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  status: "",
  priority: "",
  setSearch: (val) => set({ search: val }),
  setStatus: (val) => set({ status: val }),
  setPriority: (val) => set({ priority: val }),
  clearFilters: () => set({ search: "", status: "", priority: "" }),
}));
