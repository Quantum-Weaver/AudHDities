'use client';

import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';

const features = [
  { title: 'Screen Reader Support', description: 'Full ARIA labels, semantic HTML, and screen reader announcements for all interactive elements.', icon: '🔊', status: 'complete' },
  { title: 'Keyboard Navigation', description: 'All functionality accessible via keyboard. Tab order, focus indicators, and skip links.', icon: '⌨️', status: 'complete' },
  { title: 'High Contrast Mode', description: 'Toggle between standard and high contrast color schemes for better visibility.', icon: '🎨', status: 'complete' },
  { title: 'Reduced Motion', description: 'Respects system preferences for reduced motion. All animations can be disabled.', icon: '🔄', status: 'complete' },
  { title: 'Font Size Adjustment', description: 'Increase or decrease text size without breaking layouts.', icon: '🔤', status: 'complete' },
  { title: 'Focus Indicators', description: 'Clear, visible focus rings for keyboard navigation.', icon: '🎯', status: 'complete' },
  { title: 'Color Blindness Friendly', description: 'Color combinations tested for deuteranopia, protanopia, and tritanopia.', icon: '👁️', status: 'complete' },
  { title: 'Customizable Reading Mode', description: 'Adjust line height, letter spacing, and column width for comfortable reading.', icon: '📖', status: 'planned' },
];

export function FeatureList() {
  return (
    <Card
      data={{ id: 'accessibility-features', type: 'value', title: 'Accessibility Features', value: '' }}
      radius="lg"
      shadow="md"
      variant="default"
      className="p-6"
    >
      <h2 className="text-xl font-bold text-star-dust mb-4">Accessibility Features</h2>
      <div className="grid gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="text-2xl">{feature.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-star-dust">{feature.title}</h3>
                <Badge variant={feature.status === 'complete' ? 'success' : 'outline'} size="sm">
                  {feature.status === 'complete' ? '✓ Available' : 'Coming Soon'}
                </Badge>
              </div>
              <p className="text-sm text-star-dust/60">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}