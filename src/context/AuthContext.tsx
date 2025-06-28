import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  email: string;
  name: string;
  walletBalance: number;
  accountType?: 'personal' | 'business';
  businessName?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, accountType: 'personal' | 'business', businessName?: string, socialProvider?: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication with hardcoded credentials
    if (email === 'ahmed@riders.com' && password === '123') {
      const userData = {
        email: 'ahmed@riders.com',
        name: 'Ahmed',
        walletBalance: 250.75,
        accountType: 'personal'
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };
  const signup = async (email: string, password: string, name: string, accountType: 'personal' | 'business', businessName?: string, socialProvider?: string): Promise<boolean> => {
    // Mock signup implementation
    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate a successful signup
      // If using social auth
      if (socialProvider) {
        console.log(`Signing up with ${socialProvider}`);
        // Simulate a successful social auth signup
        const socialUserData = {
          email: socialProvider === 'google' ? 'social@example.com' : 'social2@example.com',
          name: 'Social User',
          walletBalance: 0,
          accountType,
          businessName: accountType === 'business' ? businessName : undefined
        };
        setUser(socialUserData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(socialUserData));
        return true;
      }
      // Regular email signup
      const userData = {
        email,
        name,
        walletBalance: 0,
        accountType,
        businessName: accountType === 'business' ? businessName : undefined
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    signup,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};