import { create } from 'zustand';
// Zustand holds UI state only (navigation, filters). Server data lives in TanStack Query.
export const useUI = create((set) => ({
  page: 'dashboard', eventId: null, q: '',
  go: (page) => set({ page }),
  setEvent: (eventId) => set({ eventId }),
  setQ: (q) => set({ q }),
}));
