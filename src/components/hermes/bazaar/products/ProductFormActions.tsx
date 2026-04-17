// src/components/products/ProductFormActions.tsx
'use client';

import { Button } from '@/components/ui/Button';

interface ProductFormActionsProps {
  isSubmitting: boolean;
  loading: boolean;
  mode: 'create' | 'edit';
  onCancel: () => void;
}

export function ProductFormActions({
  isSubmitting,
  loading,
  mode,
  onCancel
}: ProductFormActionsProps) {
  return (
    <div className="flex gap-4 pt-4">
      <Button
        type="submit"
        disabled={isSubmitting || loading}
        className="flex-1"
      >
        {isSubmitting || loading 
          ? (mode === 'create' ? 'Creating...' : 'Saving...') 
          : (mode === 'create' ? 'Create Product' : 'Save Changes')}
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}