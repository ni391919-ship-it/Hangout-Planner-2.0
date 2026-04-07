import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Mock users database
const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@hangout.com', avatar: '🦊' },
  { id: '2', name: 'Sam Chen', email: 'sam@hangout.com', avatar: '🐼' },
  { id: '3', name: 'Jordan Blake', email: 'jordan@hangout.com', avatar: '🦋' },
];

// Mock friends data
export interface FriendResponse {
  friendId: string;
  friendName: string;
  friendAvatar: string;
  status: 'imIn' | 'gonnaBeLate' | 'cantMakeIt';
  arrivalTime?: string;
  minutesLate?: number;
  excuse?: string;
}

export const MOCK_FRIENDS: Omit<User, 'email'>[] = [
  { id: 'f1', name: 'Maya Johnson', avatar: '🌸' },
  { id: 'f2', name: 'Leo Martins', avatar: '🎸' },
  { id: 'f3', name: 'Priya Patel', avatar: '✨' },
  { id: 'f4', name: 'Dylan Brooks', avatar: '🏄' },
  { id: 'f5', name: 'Zoe Kim', avatar: '🎨' },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const found = MOCK_USERS.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return { success: true };
    }

    // For demo: any valid email/password combo works
    if (email && _password.length >= 4) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        avatar: ['🦊', '🐼', '🦋', '🌟', '🎭', '🦄'][Math.floor(Math.random() * 6)],
      };
      setUser(newUser);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password. (Hint: any email + 4+ char password works!)' };
  };

  const signup = async (name: string, email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (!name.trim()) return { success: false, error: 'Name is required' };
    if (!email.trim()) return { success: false, error: 'Email is required' };
    if (_password.length < 4) return { success: false, error: 'Password must be at least 4 characters' };

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: ['🦊', '🐼', '🦋', '🌟', '🎭', '🦄', '🐲', '🌸'][Math.floor(Math.random() * 8)],
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
