// Keyboard shortcuts utility

export interface Shortcut {
  key: string;
  description: string;
  action: () => void;
  category: string;
}

export interface ShortcutCategory {
  name: string;
  shortcuts: Shortcut[];
}

// Global shortcuts registry
let shortcuts: Shortcut[] = [];

export const registerShortcut = (shortcut: Shortcut) => {
  // Check if shortcut already exists
  const existingIndex = shortcuts.findIndex(s => s.key === shortcut.key);
  if (existingIndex !== -1) {
    // Replace existing shortcut
    shortcuts[existingIndex] = shortcut;
  } else {
    // Add new shortcut
    shortcuts.push(shortcut);
  }
};

export const unregisterShortcut = (key: string) => {
  shortcuts = shortcuts.filter(s => s.key !== key);
};

export const clearAllShortcuts = () => {
  shortcuts = [];
};

export const getShortcuts = (): Shortcut[] => {
  return [...shortcuts];
};

export const getShortcutsByCategory = (): ShortcutCategory[] => {
  const categories: Record<string, Shortcut[]> = {};
  
  shortcuts.forEach(shortcut => {
    if (!categories[shortcut.category]) {
      categories[shortcut.category] = [];
    }
    categories[shortcut.category].push(shortcut);
  });
  
  return Object.entries(categories).map(([name, shortcuts]) => ({
    name,
    shortcuts
  }));
};

// Initialize keyboard event listener
export const initializeKeyboardShortcuts = () => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement || 
        event.target instanceof HTMLSelectElement) {
      return;
    }
    
    // Check for Alt key combinations
    if (event.altKey && !event.ctrlKey && !event.shiftKey) {
      const key = event.key.toLowerCase();
      const shortcut = shortcuts.find(s => s.key.toLowerCase() === `alt+${key}`);
      
      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

// Predefined shortcuts
export const DEFAULT_SHORTCUTS: Shortcut[] = [
  {
    key: 'Alt+N',
    description: 'New Quotation',
    action: () => {
      // This will be set by the component that registers the shortcut
    },
    category: 'Quotations'
  },
  {
    key: 'Alt+P',
    description: 'New Product',
    action: () => {
    },
    category: 'Products'
  },
  {
    key: 'Alt+C',
    description: 'New Customer',
    action: () => {
    },
    category: 'Customers'
  },
  {
    key: 'Alt+S',
    description: 'Settings',
    action: () => {
    },
    category: 'Navigation'
  },
  {
    key: 'Alt+D',
    description: 'Dashboard',
    action: () => {
    },
    category: 'Navigation'
  },
  {
    key: 'Alt+L',
    description: 'Product List',
    action: () => {
    },
    category: 'Navigation'
  },
  {
    key: 'Alt+Q',
    description: 'Quotation List',
    action: () => {
    },
    category: 'Navigation'
  },
  {
    key: 'Alt+U',
    description: 'Customer List',
    action: () => {
    },
    category: 'Navigation'
  },

];

// Helper function to format shortcut key for display
export const formatShortcutKey = (key: string): string => {
  return key
    .replace('Alt+', 'Alt + ')
    .replace('Ctrl+', 'Ctrl + ')
    .replace('Shift+', 'Shift + ')
    .toUpperCase();
}; 