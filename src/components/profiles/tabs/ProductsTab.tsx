// components/profile-dashboard/tabs/ProductsTab.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/utils/supabase/client';
import { Product } from '../ProfileDashboard';
import { Package, Plus, Eye, Edit, DollarSign, Users, TrendingUp, Copy } from 'lucide-react';

interface ProductsTabProps {
  products: Product[];
  userId: string;
}

export default function ProductsTab({ products, userId }: ProductsTabProps) {
  const router = useRouter();
  const supabase = useSupabase();
  const [loading, setLoading] = useState<string | null>(null);

  const handleTogglePublish = async (productId: string, currentStatus: boolean) => {
    setLoading(productId);
    await supabase
      .from('products')
      .update({ 
        is_published: !currentStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);
    setLoading(null);
    router.refresh();
  };

  const copyProductLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/products/${slug}`);
  };

  const calculateRevenue = (product: Product) => {
    // Simple calculation - you might want to adjust based on your actual sales data
    if (product.sales_count && product.total_revenue) {
      return product.total_revenue;
    }
    // Fallback calculation if you don't have sales data
    return product.price_ally * 0.7; // 30% goes to residuals and infrastructure
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Your Sanctuary Products</h3>
          <p className="text-white/50 text-sm">Manage your creations and track performance</p>
        </div>
        <button 
          onClick={() => router.push('/products/create')}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          New Product
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60 mb-1">Total Products</div>
              <div className="text-2xl font-bold text-white">{products.length}</div>
            </div>
            <Package className="text-purple-400" size={24} />
          </div>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60 mb-1">Published</div>
              <div className="text-2xl font-bold text-white">
                {products.filter(p => p.is_published).length}
              </div>
            </div>
            <Eye className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60 mb-1">Estimated Revenue</div>
              <div className="text-2xl font-bold text-white">
                ${products.reduce((sum, p) => sum + calculateRevenue(p), 0).toFixed(2)}
              </div>
            </div>
            <DollarSign className="text-yellow-400" size={24} />
          </div>
        </div>

        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60 mb-1">Contributors</div>
              <div className="text-2xl font-bold text-white">
                {products.reduce((sum, p) => sum + (p.contributions?.length || 0), 0)}
              </div>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 grid grid-cols-12 text-sm text-white/50 font-medium">
          <div className="col-span-5">Product</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          {products.length === 0 ? (
            <div className="p-12 text-center text-white/40">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg mb-2">No products yet</p>
              <p className="text-sm">Create your first product to start earning residuals</p>
              <button 
                onClick={() => router.push('/products/create')}
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg inline-flex items-center gap-2"
              >
                <Plus size={16} />
                Create Product
              </button>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors grid grid-cols-12 items-center">
                {/* Product Info */}
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    {product.preview_image ? (
                      <img 
                        src={product.preview_image} 
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                        <Package size={20} className="text-white/40" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white">{product.title}</h4>
                      <p className="text-white/40 text-sm truncate">
                        {product.description || 'No description'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <span className="text-sm text-white/60 capitalize">
                    {product.product_type.replace('_', ' ')}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.is_published 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {product.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-3 flex justify-end gap-2">
                  <button
                    onClick={() => copyProductLink(product.slug)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                    title="Copy product link"
                  >
                    <Copy size={16} />
                  </button>
                  
                  <button
                    onClick={() => router.push(`/products/${product.slug}/edit`)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                    title="Edit product"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    onClick={() => router.push(`/products/${product.slug}`)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                    title="View product"
                  >
                    <Eye size={16} />
                  </button>
                  
                  <button
                    onClick={() => handleTogglePublish(product.id, product.is_published)}
                    disabled={loading === product.id}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      product.is_published
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                    }`}
                  >
                    {loading === product.id ? '...' : product.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
          <TrendingUp size={18} className="text-cyan-400" />
          Product Success Tips
        </h4>
        <ul className="space-y-2 text-sm text-white/60">
          <li>• Set clear contribution percentages for collaborators upfront</li>
          <li>• Use descriptive titles and preview images to attract buyers</li>
          <li>• Price appropriately for each tier (Community, Ally, Corporate)</li>
          <li>• Consider setting aside 10-20% for the residual pool</li>
          <li>• Regularly update products based on user feedback</li>
        </ul>
      </div>
    </div>
  );
}