import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeKeyboardShortcuts, registerShortcut, unregisterShortcut, clearAllShortcuts } from '../lib/keyboardShortcuts';

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

const KeyboardShortcutsProvider: React.FC<KeyboardShortcutsProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing shortcuts to prevent duplicates
    clearAllShortcuts();
    
    // Define shortcuts
    const shortcuts = [
      {
        key: 'Alt+N',
        description: 'New Quotation',
        action: () => {
          // Navigate to /quotations/new route
          navigate('/quotations/new');
        },
        category: 'Quotations'
      },
      {
        key: 'Alt+P',
        description: 'New Product',
        action: () => {
          // This will be handled by the ProductList component
          const event = new CustomEvent('openProductEditor');
          window.dispatchEvent(event);
        },
        category: 'Products'
      },
      {
        key: 'Alt+C',
        description: 'New Customer',
        action: () => {
          // This will be handled by the CustomerList component
          const event = new CustomEvent('openCustomerEditor');
          window.dispatchEvent(event);
        },
        category: 'Customers'
      },
      {
        key: 'Alt+S',
        description: 'Settings',
        action: () => {
          navigate('/settings');
        },
        category: 'Navigation'
      },
      {
        key: 'Alt+D',
        description: 'Dashboard',
        action: () => {
          navigate('/dashboard');
        },
        category: 'Navigation'
      },
      {
        key: 'Alt+L',
        description: 'Product List',
        action: () => {
          navigate('/products');
        },
        category: 'Navigation'
      },
      {
        key: 'Alt+Q',
        description: 'Quotation List',
        action: () => {
          navigate('/quotations');
        },
        category: 'Navigation'
      },
      {
        key: 'Alt+U',
        description: 'Customer List',
        action: () => {
          navigate('/customers');
        },
        category: 'Navigation'
      }
    ];

    // Register shortcuts
    shortcuts.forEach(shortcut => {
      registerShortcut(shortcut);
    });

    // Initialize keyboard event listener
    const cleanup = initializeKeyboardShortcuts();

    // Cleanup function to unregister shortcuts
    return () => {
      shortcuts.forEach(shortcut => {
        unregisterShortcut(shortcut.key);
      });
      cleanup();
    };
  }, [navigate]);

  return <>{children}</>;
};

export default KeyboardShortcutsProvider; 