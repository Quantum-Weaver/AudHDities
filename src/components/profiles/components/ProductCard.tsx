// components/profile-dashboard/components/ProductCard.tsx
import { Product } from '../ProfileDashboard';
import { Package, DollarSign, Users, Eye, Copy, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  onTogglePublish: (id: string, currentStatus: boolean) => Promise<void>;
  loadingId: string | null;
}

export default function ProductCard({ product, onTogglePublish, loadingId }: ProductCardProps) {
  const router = useRouter();

  const copyProductLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/products/${slug}`);
  };

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {product.preview_image ? (
            <img 
              src={product.preview_image} 
              alt={product.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center">
              <Package size={24} className="text-white/40" />
            </div>
          )}
          <div>
            <h4 className="font-bold text-white text-lg">{product.title}</h4>
            <span className="text-sm text-white/60 capitalize">
              {product.product_type.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          product.is_published 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {product.is_published ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/60 text-sm mb-4 line-clamp-2">
        {product.description || 'No description provided.'}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <DollarSign size={14} className="text-yellow-400" />
            <span className="text-white">
              ${product.price_ally.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-cyan-400" />
            <span className="text-white">
              {product.contributions?.length || 0} contributors
            </span>
          </div>
        </div>
        <div className="text-white/40">
          {new Date(product.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex gap-2">
          <button
            onClick={() => copyProductLink(product.slug)}
            className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
            title="Copy link"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => router.push(`/products/${product.slug}`)}
            className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => router.push(`/products/${product.slug}/edit`)}
            className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
        </div>
        
        <button
          onClick={() => onTogglePublish(product.id, product.is_published)}
          disabled={loadingId === product.id}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            product.is_published
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
              : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
          } ${loadingId === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loadingId === product.id ? '...' : product.is_published ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  );
}