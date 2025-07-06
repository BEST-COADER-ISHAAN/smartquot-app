import React, { useEffect, useState } from 'react';
import QuoteHistory from '../components/QuoteHistory';
import MarginOverview from '../components/MarginOverview';
import TopProducts from '../components/TopProducts';
import { supabase } from '../lib/supabase';
import { supabaseAdmin } from '../lib/supabaseAdmin';
import { Quotation, Product, Quote, MarginData } from '../types';

const Dashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [marginData, setMarginData] = useState<MarginData[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all quotations with rooms and items and customer name
      const { data: quotationsData, error: quotationsError } = await supabase
        .from('quotations')
        .select(`*, customer:customers(name), quotation_rooms(*, quotation_room_items(*, product:products(*)))`)
        .order('created_at', { ascending: true });
      console.log('quotationsData:', quotationsData ?? 'null');
      if (quotationsError) console.error('quotationsError:', quotationsError);

      // Fetch all products
      const { data: productsData, error: productsError } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('is_archived', false);
      console.log('productsData:', productsData ?? 'null');
      if (productsError) console.error('productsError:', productsError);

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
      (quotationsData || []).forEach((q: any) => {
        (q.quotation_rooms || []).forEach((room: any) => {
          (room.quotation_room_items || []).forEach((item: any) => {
            const pid = item.product_id;
            if (!pid) return;
            if (!productStats[pid]) {
              productStats[pid] = {
                name: item.product?.name || 'Product',
                revenue: 0,
                unitsSold: 0,
                category: item.product?.collection || 'General',
              };
            }
            productStats[pid].revenue += item.amount || 0;
            productStats[pid].unitsSold += item.quantity_boxes || 0;
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
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm lg:text-base text-gray-600 mt-1">Overview of your quotation business metrics</p>
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