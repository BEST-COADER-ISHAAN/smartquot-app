import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import QuoteHistory from '../components/QuoteHistory';
import MarginOverview from '../components/MarginOverview';
import TopProducts from '../components/TopProducts';
import { supabase } from '../lib/supabase';
import { supabaseAdmin } from '../lib/supabaseAdmin';
import { Quotation, Product, Quote, MarginData } from '../types';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [marginData, setMarginData] = useState<MarginData[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);
  const { user, session } = useAuth();

  const loadDashboardData = useCallback(async () => {
    if (!session?.access_token) return;
    
    // Prevent rapid successive refreshes (minimum 5 seconds between refreshes)
    const now = Date.now();
    if (now - lastRefreshTime < 5000) {
      return;
    }
    
    setLastRefreshTime(now);
    setLoading(true);
    setRefreshing(true);
    try {
      // Fetch all quotations with rooms and items and customer name
      const { data: quotationsData, error: quotationsError } = await supabase
        .from('quotations')
        .select(`*, customer:customers(name), quotation_rooms(*, quotation_room_items(*, product:products(*)))`)
        .eq('created_by', user?.id)
        .order('created_at', { ascending: true });

      // Fetch all products
      const { data: productsData, error: productsError } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('is_archived', false)
        .eq('user_id', user?.id);

      // --- QuoteHistory ---
      // Transform quotations to Quote type
      const quoteHistory: Quote[] = (quotationsData ?? []).map((q: any) => ({
        id: q.quotation_number,
        customer: q.customer?.name || q.customer_id || 'N/A',
        date: q.created_at?.split('T')[0] || '',
        amount: q.total_amount || 0,
        margin: q.total_margin_percentage || 0,
        status: q.status || 'draft',
      })).reverse(); // Most recent first

      // --- MarginOverview ---
      // Group by month, sum margin and revenue
      const marginMap: { [month: string]: { margin: number; revenue: number } } = {};
      (quotationsData || []).forEach((q: any) => {
        const month = q.created_at?.slice(0, 7); // YYYY-MM
        if (!month) return;
        if (!marginMap[month]) marginMap[month] = { margin: 0, revenue: 0 };
        marginMap[month].margin += q.total_margin_percentage || 0;
        marginMap[month].revenue += q.total_amount || 0;
      });
      const marginArr: MarginData[] = Object.entries(marginMap).map(([month, data]) => ({
        month,
        margin: Number((data.margin / ((quotationsData || []).filter((q: any) => q.created_at?.slice(0, 7) === month).length || 1)).toFixed(1)),
        revenue: data.revenue
      })).sort((a, b) => a.month.localeCompare(b.month));

      // --- TopProducts ---
      // Aggregate product sales from all quotation items
      const productStats: { [id: string]: { name: string; revenue: number; unitsSold: number; category: string } } = {};
      
      // First, initialize all products with zero stats
      (productsData || []).forEach((product: any) => {
        productStats[product.id] = {
          name: product.name || 'Product',
          revenue: 0,
          unitsSold: 0,
          category: product.collection || 'General',
        };
      });
      
      // Then, add sales data from quotations
      (quotationsData || []).forEach((q: any) => {
        (q.quotation_rooms || []).forEach((room: any) => {
          (room.quotation_room_items || []).forEach((item: any) => {
            const pid = item.product_id;
            if (!pid) {
              return;
            }
            if (!productStats[pid]) {
              productStats[pid] = {
                name: item.product?.name || 'Product',
                revenue: 0,
                unitsSold: 0,
                category: item.product?.collection || 'General',
              };
            }
            
            // Handle different field names for quantity
            const quantity = item.quantity_boxes || item.quantity || 0;
            const amount = item.amount || item.total_price || 0;
            
            productStats[pid].revenue += amount;
            productStats[pid].unitsSold += quantity;
          });
        });
      });
      
      const topProductsArr: Product[] = Object.entries(productStats).map(([id, stat]) => ({
        id,
        name: stat.name,
        price: 0,
        unitsSold: stat.unitsSold,
        revenue: stat.revenue,
        category: stat.category,
      })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

      setQuotes(quoteHistory);
      setMarginData(marginArr);
      setTopProducts(topProductsArr);
      
      // Show brief notification for manual refresh
      if (refreshing && !loading) {
        setTimeout(() => setRefreshing(false), 1000);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [session?.access_token, lastRefreshTime, user?.id]);

  // Load data on mount and when session changes
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Refresh data when user navigates to dashboard (using visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadDashboardData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadDashboardData]);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Overview of your quotation business metrics</p>
          </div>
          <button
            onClick={loadDashboardData}
            disabled={loading || refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading || refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="p-4 lg:p-8 text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <MarginOverview marginData={marginData} />
            <TopProducts products={topProducts} />
          </div>
          <QuoteHistory quotes={quotes} />
        </>
      )}
    </div>
  );
};

export default Dashboard;