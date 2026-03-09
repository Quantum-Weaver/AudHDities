// @/components/ui/Card.tsx
import React from 'react';
import { cardUtils } from '@/lib/utils/components/ui/card';
import type { CardProps } from '@/types/components/ui/card';

export const Card: React.FC<CardProps> = ({
  variant = 'portal_transition',
  size,
  consciousness,
  children,
  className = '',
  onClick,
  interactive = false,
}) => {
  const finalVariant = consciousness?.level 
    ? cardUtils.getCardVariantByConsciousness(consciousness.level)
    : size
    ? cardUtils.getVariantFromSize(size)
    : variant;

  const config = cardUtils.getCardConfig(finalVariant);
  const dimensions = size ? cardUtils.calculateCardDimensions(size, 'portal') : null;

  return (
    <div
      className={className}
      style={{
        background: config.styles.background,
        border: config.styles.border,
        borderRadius: config.styles.borderRadius,
        padding: config.styles.padding,
        gap: config.styles.gap,
        boxShadow: config.styles.shadow,
        ...(dimensions && {
          width: dimensions.width,
          height: dimensions.height
        }),
        cursor: interactive ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};