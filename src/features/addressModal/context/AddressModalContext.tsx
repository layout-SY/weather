import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type AddressModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AddressModalContext = createContext<AddressModalContextValue | null>(
  null
);

export function AddressModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(
    () => ({
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <AddressModalContext.Provider value={value}>
      {children}
    </AddressModalContext.Provider>
  );
}

export function useAddressModal() {
  const ctx = useContext(AddressModalContext);
  if (!ctx) {
    throw new Error('useAddressModal must be used within AddressModalProvider');
  }
  return ctx;
}
