import React, { useEffect, useState } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { usePreferredSizeUnit } from '../../../hooks/usePreferredSizeUnit';

// ... existing code ...
// Add a state to store formatted sizes:
const [formattedSizes, setFormattedSizes] = useState<{ [size: string]: string }>({});
useEffect(() => {
  async function fetchFormattedSizes() {
    const newFormatted: { [size: string]: string } = {};
    for (const item of items) {
      if (item.product?.size) {
        newFormatted[item.product.size] = await formatSizeForDisplay(item.product.size, preferredSizeUnit);
      }
    }
    setFormattedSizes(newFormatted);
  }
  fetchFormattedSizes();
}, [items]);
// ... existing code ...
// Replace all usages of formatSizeForDisplay(item.product.size) with formattedSizes[item.product.size] || item.product.size
// ... existing code ... 