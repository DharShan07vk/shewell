'use client';
import { createContext, useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext<{
  showToast: (severity: 'success' | 'info' | 'warn' | 'error' | undefined, summary: string, detail: string) => void;
}>({
  showToast: () => {
    console.log('toast context not initialized');
  }
});

export function ToastContextProvider({ children }: any) {
  const toastRef = useRef<Toast>(null);

  const showToast = (severity: 'success' | 'info' | 'warn' | 'error' | undefined, summary: string, detail: string) => {
    if (toastRef.current) {
      toastRef.current.show({
        severity: severity,
        summary: summary,
        detail: detail
      });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
}

export default function useToastContext() {
  return useContext(ToastContext);
}
