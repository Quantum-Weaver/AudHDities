// src/components/products/ProductGrid.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3x3, Eye, LayoutList, ChevronDown, Package, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES, getProductCategoryLabel } from '@/types/categories';
import type { Product } from '@/types/supabase/tables/products';

// Derive product type options from the source of truth
const productTypeOptions = [
  { value: 'all', label: 'All Types' },
  ...PRODUCT_CATEGORIES.map(cat => ({ 
    value: cat.value, 
    label: cat.label 
  })),
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
];

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  variant?: 'marketplace' | 'dashboard' | 'admin';
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onPublish?: (product: Product) => void;
  emptyMessage?: string;
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
}

export function ProductGrid({ 
  products,
  loading = false,
  variant = 'marketplace',
  showActions = false,
  onEdit,
  onDelete,
  onPublish,
  emptyMessage = 'No products found.',
  className,
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
}: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = product.title?.toLowerCase().includes(query);
      const matchesDescription = product.description?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription) return false;
    }
    
    // Type filter
    if (selectedType !== 'all' && product.product_type !== selectedType) return false;
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      case 'oldest':
        return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
      case 'price_low': {
        const priceA = a.price_ally;
        const priceB = b.price_ally;
        return (priceA || 0) - (priceB || 0);
      }
      case 'price_high': {
        const priceA = a.price_ally;
        const priceB = b.price_ally;
        return (priceB || 0) - (priceA || 0);
      }
      case 'name_asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'name_desc':
        return (b.title || '').localeCompare(a.title || '');
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/5 rounded-xl aspect-video mb-4" />
            <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
          <Search size={32} className="text-white/20" />
        </div>
        <h3 className="text-white font-bold mb-2">No products found</h3>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          {searchQuery || selectedType !== 'all' 
            ? "Try adjusting your filters to see more products."
            : emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filter Bar */}
      {(showFilters || showSearch) && (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-1 gap-2 w-full md:w-auto">
            {showSearch && (
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
            
            {showFilters && (
              <Button
                variant="outline"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="md:hidden"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {showViewToggle && (
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'grid' 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'text-white/40 hover:text-white'
                  )}
                  title="Grid view"
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list' 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'text-white/40 hover:text-white'
                  )}
                  title="List view"
                >
                  <LayoutList size={16} />
                </button>
              </div>
            )}
            
            {showFilters && (
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-8 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-cyan-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Filter Chips (Desktop) */}
      {showFilters && (
        <div className="hidden md:flex flex-wrap gap-2">
          <span className="text-sm text-white/40 mr-2">Type:</span>
          {productTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedType(option.value)}
              className={cn(
                'px-3 py-1 rounded-full text-sm transition-colors',
                selectedType === option.value
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Filter Chips (Mobile) */}
      {showFilters && showFiltersMobile && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 border-t border-white/10">
              <div className="text-sm text-white/40 mb-2">Product Type</div>
              <div className="flex flex-wrap gap-2">
                {productTypeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedType(option.value)}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm transition-colors',
                      selectedType === option.value
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Active Filters */}
      {(searchQuery || selectedType !== 'all') && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-white/40">Active filters:</span>
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-white">
                <X size={12} />
              </button>
            </Badge>
          )}
          {selectedType !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              {productTypeOptions.find(o => o.value === selectedType)?.label}
              <button onClick={() => setSelectedType('all')} className="ml-1 hover:text-white">
                <X size={12} />
              </button>
            </Badge>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
            }}
            className="text-xs text-cyan-400 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
      
      {/* Results Count */}
      <div className="text-sm text-white/40">
        Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
      </div>
      
      {/* Product Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${selectedType}-${sortBy}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          )}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {viewMode === 'grid' ? (
                <ProductCard
                  product={product}
                  variant={variant}
                  showActions={showActions}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPublish={onPublish}
                />
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group">
                  <div className="flex gap-4">
                    {/* Image thumbnail */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      {product.preview_image ? (
                        <img 
                          src={product.preview_image} 
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package size={24} className="text-white/40" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-white/40 line-clamp-1">
                            {product.description || 'No description'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.is_published ? (
                            <Badge variant="success" size="sm">Published</Badge>
                          ) : (
                            <Badge variant="outline" size="sm">Draft</Badge>
                          )}
                          {showActions && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => onEdit?.(product)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/40 hover:text-cyan-400"
                              >
                                <Eye size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-cyan-400 font-medium">
                          ${product.price_ally}
                        </span>
                        {product.residual_pool_percent && product.residual_pool_percent > 0 && (
                          <span className="text-xs text-white/30">
                            {product.residual_pool_percent}% to contributors
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}