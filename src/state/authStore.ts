import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  phone: string;
  login: (phone: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  phone: '',
  login: (phone) => set({ isAuthenticated: true, phone }),
  logout: () => set({ isAuthenticated: false, phone: '' })
}));
