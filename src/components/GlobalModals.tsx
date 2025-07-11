import React, { useState, useEffect } from 'react';
import ProductEditorModal from './Products/ProductEditorModal';
import CustomerEditorModal from './Customers/CustomerEditorModal';
import { QuotationProduct, QuotationCustomer } from '../types';

interface GlobalModalsProps {
  children: React.ReactNode;
}

const GlobalModals: React.FC<GlobalModalsProps> = ({ children }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<QuotationProduct | undefined>();
  const [editingCustomer, setEditingCustomer] = useState<QuotationCustomer | undefined>();

  // Listen for keyboard shortcut events
  useEffect(() => {
    const handleOpenProductEditor = () => {
      setEditingProduct(undefined); // Create new product
      setShowProductModal(true);
    };

    const handleOpenCustomerEditor = () => {
      setEditingCustomer(undefined); // Create new customer
      setShowCustomerModal(true);
    };

    window.addEventListener('openProductEditor', handleOpenProductEditor);
    window.addEventListener('openCustomerEditor', handleOpenCustomerEditor);
    
    return () => {
      window.removeEventListener('openProductEditor', handleOpenProductEditor);
      window.removeEventListener('openCustomerEditor', handleOpenCustomerEditor);
    };
  }, []);

  const handleProductSave = (savedProduct?: QuotationProduct) => {
    if (savedProduct) {
      // Dispatch event to notify other components that a product was saved
      const event = new CustomEvent('productSaved', { detail: savedProduct });
      window.dispatchEvent(event);
    }
    setShowProductModal(false);
    setEditingProduct(undefined);
  };

  const handleCustomerSave = (savedCustomer?: QuotationCustomer) => {
    if (savedCustomer) {
      // Dispatch event to notify other components that a customer was saved
      const event = new CustomEvent('customerSaved', { detail: savedCustomer });
      window.dispatchEvent(event);
    }
    setShowCustomerModal(false);
    setEditingCustomer(undefined);
  };

  const handleProductClose = () => {
    setShowProductModal(false);
    setEditingProduct(undefined);
  };

  const handleCustomerClose = () => {
    setShowCustomerModal(false);
    setEditingCustomer(undefined);
  };

  return (
    <>
      {children}
      
      {/* Product Editor Modal */}
      <ProductEditorModal
        isOpen={showProductModal}
        onClose={handleProductClose}
        onSave={handleProductSave}
        product={editingProduct}
      />

      {/* Customer Editor Modal */}
      <CustomerEditorModal
        isOpen={showCustomerModal}
        onClose={handleCustomerClose}
        onSave={handleCustomerSave}
        customer={editingCustomer}
      />
    </>
  );
};

export default GlobalModals; 