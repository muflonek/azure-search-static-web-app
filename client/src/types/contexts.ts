// Types for React Contexts
import { ReactNode } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: () => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
