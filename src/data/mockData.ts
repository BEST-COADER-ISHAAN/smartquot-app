import { Quote, Product, MarginData } from '../types';

export const mockQuotes: Quote[] = [
  {
    id: '001',
    customer: 'Acme Corporation',
    date: '2024-01-15',
    amount: 15750,
    margin: 32,
    status: 'approved'
  },
  {
    id: '002',
    customer: 'TechStart Inc.',
    date: '2024-01-14',
    amount: 8500,
    margin: 28,
    status: 'sent'
  },
  {
    id: '003',
    customer: 'Global Dynamics',
    date: '2024-01-12',
    amount: 22000,
    margin: 35,
    status: 'approved'
  },
  {
    id: '004',
    customer: 'Innovate Solutions',
    date: '2024-01-10',
    amount: 5200,
    margin: 25,
    status: 'draft'
  },
  {
    id: '005',
    customer: 'Metro Enterprises',
    date: '2024-01-08',
    amount: 12800,
    margin: 30,
    status: 'rejected'
  },
  {
    id: '006',
    customer: 'Future Systems',
    date: '2024-01-05',
    amount: 18600,
    margin: 33,
    status: 'approved'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Professional Software License',
    price: 299,
    unitsSold: 145,
    revenue: 43355,
    category: 'Software'
  },
  {
    id: 'P002',
    name: 'Enterprise Consulting Package',
    price: 2500,
    unitsSold: 12,
    revenue: 30000,
    category: 'Services'
  },
  {
    id: 'P003',
    name: 'Cloud Infrastructure Setup',
    price: 1200,
    unitsSold: 22,
    revenue: 26400,
    category: 'Infrastructure'
  },
  {
    id: 'P004',
    name: 'Training Workshop Series',
    price: 850,
    unitsSold: 28,
    revenue: 23800,
    category: 'Training'
  },
  {
    id: 'P005',
    name: 'Security Audit Service',
    price: 1800,
    unitsSold: 8,
    revenue: 14400,
    category: 'Security'
  },
  {
    id: 'P006',
    name: 'Mobile App Development',
    price: 5000,
    unitsSold: 3,
    revenue: 15000,
    category: 'Development'
  }
];

export const mockMarginData: MarginData[] = [
  { month: 'Aug 2023', margin: 28, revenue: 125000 },
  { month: 'Sep 2023', margin: 30, revenue: 135000 },
  { month: 'Oct 2023', margin: 29, revenue: 142000 },
  { month: 'Nov 2023', margin: 31, revenue: 158000 },
  { month: 'Dec 2023', margin: 33, revenue: 172000 },
  { month: 'Jan 2024', margin: 35, revenue: 185000 }
];