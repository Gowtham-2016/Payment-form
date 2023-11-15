import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import SnackbarWrapper from './SnackbarWrapper';

export type Severity = 'error' | 'success' | 'info' | 'warning';

interface SnackbarContextType {
  openSnackbar: (message: string, severity: Severity) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  openSnackbar: () => {},
});

export const useSnackbar = (): SnackbarContextType => useContext(SnackbarContext);

type SnackBarType = {
  open: boolean,
  message: string,
  severity: Severity
}

type SnackbarProviderProps = {
  children: ReactNode;
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackBarType>({
    open: false,
    message: '',
    severity: 'success',
  });

  const openSnackbar = (message: string, severity: Severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar({
      open: false,
      message: '',
      severity: 'success',
    });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <SnackbarWrapper
        open={snackbar.open}
        onClose={closeSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
