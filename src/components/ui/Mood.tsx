// src/components/ui/Mood.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { 
  Battery, 
  BatteryCharging, 
  BatteryWarning,
  Heart,
  Zap,
  Wind,
  Moon,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Smile,
  Frown,
  Meh,
  Eye,
  Volume2,
  VolumeX,
  Activity,
  Coffee,
  Brain,
  Sparkles
} from 'lucide-react';

export type MoodType = 
  | 'energy'
  | 'focus'
  | 'sensory'
  | 'emotional'
  | 'spoons'
  | 'custom';

export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SensoryState = 
  | 'overwhelmed'
  | 'sensitive'
  | 'neutral'
  | 'calm'
  | 'seeking';

export interface MoodProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type of mood/state to display */
  type?: MoodType;
  
  /** Current level (1-10) */
  level?: MoodLevel;
  
  /** Custom label */
  label?: string;
  
  /** Show numerical value */
  showValue?: boolean;
  
  /** Size of the component */
  size?: 'sm' | 'md' | 'lg';
  
  /** Visual variant */
  variant?: 'default' | 'subtle' | 'vibrant' | 'minimal';
  
  /** Sensory state (for sensory type) */
  sensoryState?: SensoryState;
  
  /** Custom icon (for custom type) */
  customIcon?: React.ReactNode;
  
  /** Interactive mode (allows clicking to set level) */
  interactive?: boolean;
  
  /** Callback when level changes (interactive mode) */
  onLevelChange?: (level: MoodLevel) => void;
  
  /** Show as a button (for selection) */
  asButton?: boolean;
  
  /** Selected state (for buttons) */
  selected?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Optional helper text */
  helperText?: string;
  
  /** Reduced motion preference (for ND users) */
  reducedMotion?: boolean;
}

const Mood = React.forwardRef<HTMLDivElement, MoodProps>(
  ({ 
    className,
    type = 'energy',
    level = 5,
    label,
    showValue = false,
    size = 'md',
    variant = 'default',
    sensoryState = 'neutral',
    customIcon,
    interactive = false,
    onLevelChange,
    asButton = false,
    selected = false,
    disabled = false,
    helperText,
    reducedMotion = false,
    ...props 
  }, ref) => {
    
    const [hoverLevel, setHoverLevel] = React.useState<MoodLevel | null>(null);
    const displayLevel = hoverLevel ?? level;

    // Size styles
    const sizeStyles = {
      sm: {
        container: 'p-2',
        icon: 'h-4 w-4',
        value: 'text-xs',
        label: 'text-xs',
        bar: 'h-1',
        dot: 'h-2 w-2',
      },
      md: {
        container: 'p-3',
        icon: 'h-5 w-5',
        value: 'text-sm',
        label: 'text-sm',
        bar: 'h-1.5',
        dot: 'h-2.5 w-2.5',
      },
      lg: {
        container: 'p-4',
        icon: 'h-6 w-6',
        value: 'text-base',
        label: 'text-base',
        bar: 'h-2',
        dot: 'h-3 w-3',
      },
    };

    // Variant styles
    const variantStyles = {
      default: {
        container: 'bg-white/5 border border-white/10',
        icon: 'text-white/80',
        label: 'text-white/60',
        value: 'text-white',
        bar: 'bg-white/10',
        fill: 'bg-cyan-400',
        dot: 'bg-cyan-400',
        hover: 'hover:bg-white/10',
      },
      subtle: {
        container: 'bg-transparent border border-white/5',
        icon: 'text-white/60',
        label: 'text-white/40',
        value: 'text-white/80',
        bar: 'bg-white/5',
        fill: 'bg-cyan-400/60',
        dot: 'bg-cyan-400/60',
        hover: 'hover:bg-white/5',
      },
      vibrant: {
        container: 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30',
        icon: 'text-cyan-400',
        label: 'text-white/70',
        value: 'text-white',
        bar: 'bg-white/10',
        fill: 'bg-gradient-to-r from-purple-400 to-cyan-400',
        dot: 'bg-cyan-400',
        hover: 'hover:from-purple-500/30 hover:to-cyan-500/30',
      },
      minimal: {
        container: 'bg-transparent border-0',
        icon: 'text-white/40',
        label: 'text-white/30',
        value: 'text-white/60',
        bar: 'bg-white/5',
        fill: 'bg-white/40',
        dot: 'bg-white/40',
        hover: '',
      },
    };

    // Sensory state icons and colors
    const sensoryConfig = {
      overwhelmed: {
        icon: CloudLightning,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        label: 'Overwhelmed',
      },
      sensitive: {
        icon: Volume2,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        label: 'Sensitive',
      },
      neutral: {
        icon: Activity,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        label: 'Neutral',
      },
      calm: {
        icon: Wind,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        label: 'Calm',
      },
      seeking: {
        icon: Eye,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        label: 'Seeking',
      },
    };

    // Type icons
    const typeIcons = {
      energy: Battery,
      focus: Brain,
      sensory: sensoryConfig[sensoryState].icon,
      emotional: Heart,
      spoons: Coffee,
      custom: () => customIcon || Sparkles,
    };

    const IconComponent = typeIcons[type] as any;

    // Level to color mapping
    const getLevelColor = (lvl: number) => {
      if (lvl <= 3) return 'text-red-400';
      if (lvl <= 6) return 'text-yellow-400';
      if (lvl <= 8) return 'text-green-400';
      return 'text-cyan-400';
    };

    // Level to icon mapping for specific types
    const getEnergyIcon = (lvl: number) => {
      if (lvl <= 3) return BatteryWarning;
      if (lvl <= 7) return Battery;
      return BatteryCharging;
    };

    const EnergyIcon = type === 'energy' ? getEnergyIcon(displayLevel) : IconComponent;

    // Handle level change (interactive)
    const handleLevelClick = (newLevel: MoodLevel) => {
      if (!interactive || disabled) return;
      onLevelChange?.(newLevel);
    };

    const handleMouseEnter = (lvl: MoodLevel) => {
      if (!interactive || disabled || reducedMotion) return;
      setHoverLevel(lvl);
    };

    const handleMouseLeave = () => {
      if (!interactive || disabled) return;
      setHoverLevel(null);
    };

    const sizeStyle = sizeStyles[size];
    const variantStyle = variantStyles[variant];
    const SensoryIcon = sensoryConfig[sensoryState].icon;

    // Base component
    const MoodContent = (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          sizeStyle.container,
          variantStyle.container,
          asButton && 'cursor-pointer',
          asButton && !disabled && variantStyle.hover,
          asButton && selected && 'ring-2 ring-cyan-400',
          disabled && 'opacity-50 cursor-not-allowed',
          interactive && 'select-none',
          className
        )}
        onClick={asButton ? () => handleLevelClick(level) : undefined}
        role={asButton ? 'button' : 'status'}
        tabIndex={asButton && !disabled ? 0 : undefined}
        aria-label={label || `${type} level ${level}`}
        aria-disabled={disabled}
        {...props}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={cn(
            'flex items-center justify-center',
            type === 'sensory' && sensoryConfig[sensoryState].color,
            variantStyle.icon
          )}>
            {type === 'sensory' ? (
              <SensoryIcon className={sizeStyle.icon} />
            ) : type === 'energy' ? (
              <EnergyIcon className={sizeStyle.icon} />
            ) : (
              <IconComponent className={sizeStyle.icon} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Label row */}
            <div className="flex items-center justify-between mb-1">
              <span className={cn(
                'capitalize',
                sizeStyle.label,
                variantStyle.label
              )}>
                {label || (type === 'sensory' 
                  ? sensoryConfig[sensoryState].label 
                  : type)}
              </span>
              {showValue && (
                <span className={cn(
                  'font-mono',
                  sizeStyle.value,
                  getLevelColor(displayLevel)
                )}>
                  {displayLevel}/10
                </span>
              )}
            </div>

            {/* Level bar */}
            {type !== 'sensory' && (
              <div className="relative">
                <div className={cn(
                  'w-full rounded-full overflow-hidden',
                  sizeStyle.bar,
                  variantStyle.bar
                )}>
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      variantStyle.fill,
                      reducedMotion && 'duration-0'
                    )}
                    style={{ width: `${(displayLevel / 10) * 100}%` }}
                  />
                </div>

                {/* Interactive dots */}
                {interactive && (
                  <div 
                    className="absolute inset-0 flex justify-between -top-1"
                    onMouseLeave={handleMouseLeave}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        className={cn(
                          'w-4 h-4 rounded-full transition-all',
                          'focus:outline-none focus:ring-2 focus:ring-cyan-400',
                          lvl <= displayLevel
                            ? cn(variantStyle.dot, 'opacity-100')
                            : 'bg-transparent opacity-0 group-hover:opacity-30 hover:opacity-100',
                          disabled && 'pointer-events-none'
                        )}
                        onClick={() => handleLevelClick(lvl as MoodLevel)}
                        onMouseEnter={() => handleMouseEnter(lvl as MoodLevel)}
                        aria-label={`Set level to ${lvl}`}
                        disabled={disabled}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sensory state uses dots instead of bar */}
            {type === 'sensory' && (
              <div className="flex gap-1 mt-1">
                {Object.entries(sensoryConfig).map(([state, config]) => (
                  <button
                    key={state}
                    type="button"
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      state === sensoryState
                        ? cn('w-4', config.color.replace('text', 'bg'))
                        : 'bg-white/20 hover:bg-white/40',
                      disabled && 'pointer-events-none'
                    )}
                    onClick={() => onLevelChange?.(state as any)}
                    aria-label={`Set sensory state to ${config.label}`}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Helper text */}
        {helperText && (
          <p className={cn(
            'mt-2 text-xs',
            variantStyle.label
          )}>
            {helperText}
          </p>
        )}
      </div>
    );

    return MoodContent;
  }
);

Mood.displayName = 'Mood';

export { Mood };