// components/cosmic/ComponentLibrary.tsx
// Library of available components to test

"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  Square, 
  Type, 
  ToggleLeft, 
  CheckSquare, 
  Circle, 
  ChevronDown,
  Calendar,
  Image,
  Sliders
} from "lucide-react";
import { DOMAIN_COLORS } from "@/lib/constants/cosmic/colors";

export interface ComponentItem {
  id: string;
  name: string;
  category: 'basic' | 'form' | 'layout' | 'feedback' | 'navigation';
  icon: React.ReactNode;
  variants: string[];
}

export interface ComponentLibraryProps {
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
}

const components: ComponentItem[] = [
  // Basic Components
  { id: 'button', name: 'Button', category: 'basic', icon: <Square size={16} />, variants: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning'] },
  { id: 'badge', name: 'Badge', category: 'basic', icon: <Square size={16} />, variants: ['default', 'success', 'warning', 'error', 'info', 'quantum', 'cosmic', 'fire'] },
  { id: 'card', name: 'Card', category: 'basic', icon: <Square size={16} />, variants: ['default', 'interactive', 'glass', 'glow', 'elevated'] },
  
  // Form Components
  { id: 'input', name: 'Input', category: 'form', icon: <Type size={16} />, variants: ['default', 'error', 'success', 'warning', 'disabled', 'filled'] },
  { id: 'textarea', name: 'TextArea', category: 'form', icon: <Type size={16} />, variants: ['default', 'error', 'success', 'resizable'] },
  { id: 'select', name: 'Select', category: 'form', icon: <ChevronDown size={16} />, variants: ['default', 'error', 'native'] },
  { id: 'checkbox', name: 'Checkbox', category: 'form', icon: <CheckSquare size={16} />, variants: ['default', 'rounded', 'card'] },
  { id: 'radio', name: 'Radio', category: 'form', icon: <Circle size={16} />, variants: ['default', 'card', 'button'] },
  { id: 'switch', name: 'Switch', category: 'form', icon: <ToggleLeft size={16} />, variants: ['default', 'small', 'large'] },
  { id: 'slider', name: 'Slider', category: 'form', icon: <Sliders size={16} />, variants: ['default', 'range', 'discrete'] },
  
  // Layout Components
  { id: 'accordion', name: 'Accordion', category: 'layout', icon: <Square size={16} />, variants: ['default'] },
  { id: 'tabs', name: 'Tabs', category: 'layout', icon: <Square size={16} />, variants: ['default', 'line'] },
  { id: 'modal', name: 'Modal', category: 'layout', icon: <Square size={16} />, variants: ['default', 'drawer', 'sheet', 'fullscreen'] },
  
  // Feedback Components
  { id: 'alert', name: 'Alert', category: 'feedback', icon: <Square size={16} />, variants: ['default', 'destructive', 'success', 'warning'] },
  { id: 'toast', name: 'Toast', category: 'feedback', icon: <Square size={16} />, variants: ['default', 'success', 'error', 'warning'] },
  { id: 'progress', name: 'Progress', category: 'feedback', icon: <Square size={16} />, variants: ['default'] },
  { id: 'skeleton', name: 'Skeleton', category: 'feedback', icon: <Square size={16} />, variants: ['text', 'circle', 'rectangle'] },
  
  // Navigation Components
  { id: 'breadcrumb', name: 'Breadcrumb', category: 'navigation', icon: <Square size={16} />, variants: ['default'] },
  { id: 'pagination', name: 'Pagination', category: 'navigation', icon: <Square size={16} />, variants: ['simple', 'numbered', 'compact'] },
  { id: 'tabs', name: 'Tabs (Nav)', category: 'navigation', icon: <Square size={16} />, variants: ['default', 'line'] },
];

const categoryLabels: Record<ComponentItem['category'], string> = {
  basic: 'Basic Components',
  form: 'Form Elements',
  layout: 'Layout',
  feedback: 'Feedback',
  navigation: 'Navigation',
};

const categoryColors: Record<ComponentItem['category'], string> = {
  basic: DOMAIN_COLORS.quantum.base,
  form: DOMAIN_COLORS.cosmic.base,
  layout: DOMAIN_COLORS.architecture.base,
  feedback: DOMAIN_COLORS.support.base,
  navigation: DOMAIN_COLORS.bifrost.base,
};

export function ComponentLibrary({ selected, onSelect, className }: ComponentLibraryProps) {
  const grouped = components.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {} as Record<ComponentItem['category'], ComponentItem[]>);

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(grouped).map(([category, categoryComponents]) => (
        <div key={category}>
          <h3 
            className="text-sm font-medium mb-3"
            style={{ color: categoryColors[category as ComponentItem['category']] }}
          >
            {categoryLabels[category as ComponentItem['category']]}
          </h3>
          <div className="space-y-1">
            {categoryComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => onSelect(component.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3",
                  selected === component.id
                    ? "bg-quantum-purple/20 border border-quantum-purple/50"
                    : "hover:bg-white/5 border border-transparent"
                )}
              >
                <span className={cn(
                  "text-white/60",
                  selected === component.id && "text-quantum-purple"
                )}>
                  {component.icon}
                </span>
                <span className={cn(
                  "text-sm",
                  selected === component.id ? "text-white" : "text-white/80"
                )}>
                  {component.name}
                </span>
                <Badge 
                  variant="outline" 
                  size="sm"
                  className="ml-auto text-[10px]"
                >
                  {component.variants.length} variants
                </Badge>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}