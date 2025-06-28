import React, { useCallback, useState, createContext, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast, { ToastType } from '../components/ui/Toast';
interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  hideToast: (id: string) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const ToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = Date.now().toString();
    setToasts(prevToasts => [...prevToasts, {
      id,
      type,
      message,
      duration
    }]);
  }, []);
  const hideToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);
  return <ToastContext.Provider value={{
    showToast,
    hideToast
  }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end">
        <AnimatePresence>
          {toasts.map(toast => <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} duration={toast.duration} onClose={hideToast} />)}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>;
};
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};