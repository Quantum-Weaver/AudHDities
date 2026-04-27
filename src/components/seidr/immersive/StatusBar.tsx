// @/components/immersive/StatusBar.tsx
"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useStatusBar } from "@/hooks/useStatusBar";
import { getPageMetadata } from "@/lib/constants/systems/environments/page_mapping";
import { Container } from "@/components/hof/Container";
import { HStack } from "@/components/hof/Stack";
import { Spacer } from "@/components/hof/Spacer";
import { cn } from "@/lib/utils";
import { Shield, Coins, Zap, Heart, Brain, TrendingUp, Sparkles } from "lucide-react";

export interface StatusBarProps {
  className?: string;
  /** Override user data (for testing/preview) */
  userData?: Partial<{
    sovereigntyScore: number;
    energy: number;
    focus: number;
    health: number;
    currency: number;
    notifications: number;
  }>;
}

// Map metric type to icon
const metricIcons: Record<string, React.ReactNode> = {
  sovereignty: <Shield className="h-3 w-3" />,
  energy: <Zap className="h-3 w-3" />,
  focus: <Brain className="h-3 w-3" />,
  health: <Heart className="h-3 w-3" />,
  level: <TrendingUp className="h-3 w-3" />,
  experience: <Sparkles className="h-3 w-3" />,
};

export function StatusBar({ className, userData = {} }: StatusBarProps) {
  const pathname = usePathname();
  const { config, userStatus: baseUserStatus, isLoading, isTransitioning, level } = useStatusBar();
  
  // Get page metadata for location display
  const metadata = getPageMetadata(pathname);
  const pageTitle = metadata.title;
  const pageContext = metadata.subtitle;
  
  // Merge with override user data
  const userStatus = { ...baseUserStatus, ...userData };
  
  // Helper to get metric value
  const getMetricValue = (type: string): number => {
    switch (type) {
      case 'sovereignty': return userStatus.sovereigntyScore;
      case 'energy': return userStatus.energy;
      case 'focus': return userStatus.focus;
      case 'health': return userStatus.health;
      case 'experience': return 0;
      default: return 0;
    }
  };
  
  // Helper to get metric max
  const getMetricMax = (type: string): number => {
    switch (type) {
      case 'sovereignty': return 10000;
      case 'energy': return 100;
      case 'focus': return 100;
      case 'health': return 100;
      case 'experience': return 100;
      default: return 100;
    }
  };
  
  const heightClass = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }[config.height];
  
  // Don't render while loading (prevents flash)
  if (isLoading) {
    return <div className={cn("w-full bg-deep-space/60 backdrop-blur-sm border-b border-white/5", heightClass, className)} />;
  }

  return (
    <div 
      className={cn(
        "w-full bg-deep-space/60 backdrop-blur-sm border-b flex justify-center border-white/5 transition-opacity duration-300",
        isTransitioning ? "opacity-50" : "opacity-100",
        className,
        heightClass
      )}
    >
        <HStack align="center" className="h-full">
          {/* Left Section - Notifications */}
          <div className="w-24">
            {config.notificationsEnabled && userStatus.notifications > 0 && (
              <NotificationIndicator count={userStatus.notifications} />
            )}
          </div>

          {/* Spacer pushes center to actual center */}
          <Spacer />

          {/* Center Section - Location */}
          {config.showLocation && (
            <div className="text-center cursor-pointer group relative">
              <div className="text-xl cosmic-icon opacity-42 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <div className="text-sm font-bold text-white cosmic-glow">{pageTitle}</div>
                <div className="text-xs text-white/60">{pageContext}</div>
              </div>
            </div>
          )}

          {/* Spacer pushes right to edge */}
          <Spacer />

          {/* Right Section - Stats */}
          <HStack align="center" space="md" className="justify-end">
            {/* Currency */}
            {config.showCurrency && (
              <HStack align="center" space="xs">
                <Coins className="h-3 w-3 text-arcane-gold" />
                <span className="text-sm text-white font-bold">{userStatus.currency}</span>
              </HStack>
            )}
            
            {/* Level */}
            {config.showLevel && (
              <HStack align="center" space="xs">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span className="text-sm text-white/80">Lvl {level}</span>
              </HStack>
            )}
            
            {/* Dynamic Metrics from Config */}
            {config.metrics.map((metric) => {
              const value = getMetricValue(metric.type);
              const maxValue = getMetricMax(metric.type);
              const Icon = metricIcons[metric.type];
              
              // Points format (sovereignty)
              if (metric.format === 'points') {
                return (
                  <HStack key={metric.type} align="center" space="xs">
                    {Icon}
                    <span className={cn("text-sm font-bold", metric.color)}>
                      {value.toLocaleString()}
                    </span>
                  </HStack>
                );
              }
              
              // Percentage format (energy, focus, health)
              return (
                <StatusBarIndicator 
                  key={metric.type}
                  value={value} 
                  maxValue={maxValue} 
                  color={metric.color}
                  icon={Icon}
                />
              );
            })}
          </HStack>
        </HStack>
      </div>

  );
}

// Helper Components
function StatusBarIndicator({ 
  value, 
  maxValue, 
  color,
  icon 
}: { 
  value: number; 
  maxValue: number; 
  color: string;
  icon?: React.ReactNode;
}) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  return (
    <HStack align="center" space="xs">
      {icon && <span className="text-white/40">{icon}</span>}
      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-white/60">{Math.round(percentage)}%</span>
    </HStack>
  );
}

function NotificationIndicator({ count }: { count: number }) {
  if (count === 0) return null;
  
  return (
    <div className="relative">
      <div className="w-6 h-6 rounded-full bg-quantum-purple/30 border border-quantum-purple flex items-center justify-center">
        <span className="text-xs text-white">🔔</span>
      </div>
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <span className="text-[10px] text-white font-bold">{count}</span>
      </motion.div>
    </div>
  );
}