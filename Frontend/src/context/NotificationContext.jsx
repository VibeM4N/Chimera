import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const showSuccess = (message, options = {}) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      ...options,
    });
  };

  const showWarning = (message, options = {}) => {
    toast.warning(message, {
      position: 'bottom-right',
      autoClose: 3000,
      ...options,
    });
  };

  const showInfo = (message, options = {}) => {
    toast.info(message, {
      position: 'bottom-right',
      autoClose: 3000,
      ...options,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
