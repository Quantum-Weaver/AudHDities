// components/bifrost/Section.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SECTION COMPONENT                                      ║
// ║                    The chapter in the story of a page                     ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/hof/Container';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  SectionProps,
  SectionSpacing,
  SectionVariant,
  SectionTitleAlign,
  SectionHeaderProps,
  SectionDividerProps,
  SectionGroupProps,
} from '@/types/components/bifrost/section.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SECTION_SPACING,
  SECTION_VARIANTS,
  SECTION_TITLE_ALIGN,
  SECTION_SPACING_MAP,
} from '@/lib/constants/components/bifrost/section.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  sectionVariants,
  sectionTitleVariants,
  sectionDescriptionVariants,
  sectionHeaderVariants,
  sectionDividerVariants,
} from '@/lib/constants/components/bifrost/section.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  resolveSectionSpacing,
  composeSectionClasses,
} from '@/lib/utils/components/bifrost/section.utils';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION
// ═══════════════════════════════════════════════════════════════════════════

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      spacing = SECTION_SPACING.LG,
      variant = SECTION_VARIANTS.DEFAULT,
      containerSize = 'xl',
      withContainer = true,
      noTopSpacing = false,
      noBottomSpacing = false,
      bordered = false,
      separator = false,
      title,
      description,
      titleAlign = SECTION_TITLE_ALIGN.CENTER,
      className,
      ...props
    },
    ref
  ) => {
    const variantClass = sectionVariants({ variant, bordered, separator });
    const spacingClass = resolveSectionSpacing(spacing, noTopSpacing, noBottomSpacing);
    const separatorClass = sectionVariants({ variant, bordered, separator });

    const baseClasses = composeSectionClasses({
      variantClass,
      spacingClass,
      bordered,
      separatorClass: separator ? separatorClass : '',
      className,
    });

    const titleContent = title && (
      <div className={sectionHeaderVariants({ align: titleAlign, hasContainer: withContainer })}>
        <h2 className={sectionTitleVariants({ align: titleAlign })}>
          {title}
        </h2>
        {description && (
          <p className={sectionDescriptionVariants({ align: titleAlign })}>
            {description}
          </p>
        )}
      </div>
    );

    const bodyContent = (
      <>
        {titleContent}
        {children}
      </>
    );

    return (
      <section ref={ref} className={baseClasses} {...props}>
        {withContainer ? (
          <Container size={containerSize}>{bodyContent}</Container>
        ) : (
          bodyContent
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const MutedSection = React.forwardRef<
  HTMLElement,
  Omit<SectionProps, 'variant'>
>((props, ref) => (
  <Section ref={ref} variant={SECTION_VARIANTS.MUTED} {...props} />
));
MutedSection.displayName = 'MutedSection';

export const GlowSection = React.forwardRef<
  HTMLElement,
  Omit<SectionProps, 'variant'>
>((props, ref) => (
  <Section ref={ref} variant={SECTION_VARIANTS.GLOW} {...props} />
));
GlowSection.displayName = 'GlowSection';

export const GradientSection = React.forwardRef<
  HTMLElement,
  Omit<SectionProps, 'variant'>
>((props, ref) => (
  <Section ref={ref} variant={SECTION_VARIANTS.GRADIENT} {...props} />
));
GradientSection.displayName = 'GradientSection';

export const GlassSection = React.forwardRef<
  HTMLElement,
  Omit<SectionProps, 'variant'>
>((props, ref) => (
  <Section ref={ref} variant={SECTION_VARIANTS.GLASS} {...props} />
));
GlassSection.displayName = 'GlassSection';

export const HeroSection = React.forwardRef<
  HTMLElement,
  Omit<SectionProps, 'spacing' | 'withContainer'>
>((props, ref) => (
  <Section
    ref={ref}
    spacing={SECTION_SPACING['2XL']}
    withContainer={false}
    {...props}
  />
));
HeroSection.displayName = 'HeroSection';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, align = SECTION_TITLE_ALIGN.CENTER, className }, ref) => (
    <div ref={ref} className={cn(sectionHeaderVariants({ align, hasContainer: false }), className)}>
      <h2 className={sectionTitleVariants({ align })}>{title}</h2>
      {description && (
        <p className={sectionDescriptionVariants({ align })}>{description}</p>
      )}
    </div>
  )
);
SectionHeader.displayName = 'SectionHeader';

export const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className }, ref) => (
    <div ref={ref} className={cn(sectionDividerVariants(), 'py-8', className)}>
      <div className={sectionDividerVariants({ className: 'mx-auto' })} />
    </div>
  )
);
SectionDivider.displayName = 'SectionDivider';

export const SectionGroup = React.forwardRef<HTMLDivElement, SectionGroupProps>(
  ({ children, spacing = SECTION_SPACING.LG, className }, ref) => {
    const spacingClass = SECTION_SPACING_MAP[spacing];

    return (
      <div ref={ref} className={cn('space-y-0', className)}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={spacingClass}>
            {child}
            {index < React.Children.count(children) - 1 && <SectionDivider />}
          </div>
        ))}
      </div>
    );
  }
);
SectionGroup.displayName = 'SectionGroup';

// ═══════════════════════════════════════════════════════════════════════════
// RE-EXPORT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type {
  SectionSpacing,
  SectionVariant,
  SectionTitleAlign,
} from '@/types/components/bifrost/section.types';