// src/components/shared/UnifiedCard.tsx
// The Unified Card Component - replaces 32+ card variants
// FULL VARIANT SUPPORT

"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Constants
import {
  CARD_VARIANTS,
  CARD_SIZES,
  CARD_PADDINGS,
  CARD_VARIANT_CLASSES,
  CARD_SIZE_CLASSES,
  CARD_PADDING_CLASSES,
  DEFAULT_CARD_VARIANT,
  DEFAULT_CARD_SIZE,
  DEFAULT_CARD_PADDING,
} from "@/lib/constants/components/ui/unified_card";

// Types
import type { UnifiedCardProps, CardData } from "@/types/components/ui/unified_card";

// Utils
import {
  isProductCard,
  isQuestCard,
  isEventCard,
  isProposalCard,
  isEntityCard,
  isCreatorCard,
  isVendorCard,
  isStatCard,
  isStepCard,
  isValueCard,
  isPillarCard,
  isPrincipleCard,
  isInvitationCard,
  isPathwayCard,
  isUserCard,
  isFileCard,
  isSchemaTableCard,
  isSchemaEnumCard,
  isSchemaFunctionCard,
  formatPrice,
  getLowestPrice,
  getPriceRange,
  getAvailableTiers,
  getDifficultyColor,
  getProposalStatusColor,
  getEntityTemperatureColor,
  getTrendIcon,
  getStepStatus,
  getStepStatusColor,
  truncateText,
  formatFileSize,
  getFileTypeIcon,
  getSchemaTypeIcon,
} from "@/utils/components/ui/unified_card";

export function UnifiedCard({
  variant = DEFAULT_CARD_VARIANT,
  data,
  size = DEFAULT_CARD_SIZE,
  padding = DEFAULT_CARD_PADDING,
  interactive = true,
  href,
  onClick,
  className,
  children,
}: UnifiedCardProps) {
  const cardContent = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300",
        interactive && "cursor-pointer",
        interactive && CARD_VARIANT_CLASSES[variant],
        CARD_PADDING_CLASSES[padding],
        className
      )}
      onClick={() => onClick?.(data)}
    >
      {/* Media Section */}
      {data.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl -mt-4 -mx-4 mb-4 w-calc">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Product Card */}
      {isProductCard(data) && <ProductCardContent data={data} />}

      {/* Quest Card */}
      {isQuestCard(data) && <QuestCardContent data={data} />}

      {/* Event Card */}
      {isEventCard(data) && <EventCardContent data={data} />}

      {/* Proposal Card */}
      {isProposalCard(data) && <ProposalCardContent data={data} />}

      {/* Entity Card */}
      {isEntityCard(data) && <EntityCardContent data={data} />}

      {/* Creator Card */}
      {isCreatorCard(data) && <CreatorCardContent data={data} />}

      {/* Vendor Card */}
      {isVendorCard(data) && <VendorCardContent data={data} />}

      {/* Stat Card */}
      {isStatCard(data) && <StatCardContent data={data} />}

      {/* Step Card */}
      {isStepCard(data) && <StepCardContent data={data} />}

      {/* Value Card */}
      {isValueCard(data) && <ValueCardContent data={data} />}

      {/* Pillar Card */}
      {isPillarCard(data) && <PillarCardContent data={data} />}

      {/* Principle Card */}
      {isPrincipleCard(data) && <PrincipleCardContent data={data} />}

      {/* Invitation Card */}
      {isInvitationCard(data) && <InvitationCardContent data={data} />}

      {/* Pathway Card */}
      {isPathwayCard(data) && <PathwayCardContent data={data} />}

      {/* User Card */}
      {isUserCard(data) && <UserCardContent data={data} />}

      {/* File Card */}
      {isFileCard(data) && <FileCardContent data={data} />}

      {/* Schema Table Card */}
      {isSchemaTableCard(data) && <SchemaTableCardContent data={data} />}

      {/* Schema Enum Card */}
      {isSchemaEnumCard(data) && <SchemaEnumCardContent data={data} />}

      {/* Schema Function Card */}
      {isSchemaFunctionCard(data) && <SchemaFunctionCardContent data={data} />}

      {/* Fallback - Generic Card Content */}
      {!isProductCard(data) && 
       !isQuestCard(data) && 
       !isEventCard(data) && 
       !isProposalCard(data) && 
       !isEntityCard(data) && 
       !isCreatorCard(data) && 
       !isVendorCard(data) && 
       !isStatCard(data) && 
       !isStepCard(data) &&
       !isValueCard(data) &&
       !isPillarCard(data) &&
       !isPrincipleCard(data) &&
       !isInvitationCard(data) &&
       !isPathwayCard(data) &&
       !isUserCard(data) &&
       !isFileCard(data) &&
       !isSchemaTableCard(data) &&
       !isSchemaEnumCard(data) &&
       !isSchemaFunctionCard(data) && (
        <GenericCardContent data={data} />
      )}

      {children}
    </div>
  );

  if (href && interactive) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}

// =====================================================
// Variant-Specific Content Components
// =====================================================

function ProductCardContent({ data }: { data: CardData & { type: 'product' } }) {
  const lowestPrice = getLowestPrice(data);
  const priceRange = getPriceRange(data);
  const availableTiers = getAvailableTiers(data);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">📦</span>
          <span className="text-xs text-white/40">Product</span>
        </div>
        {data.isPublished === false && (
          <Badge variant="outline" size="sm" className="text-yellow-400">
            Draft
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm mb-4 line-clamp-2 flex-1">
          {truncateText(data.description, 120)}
        </p>
      )}
      
      <div className="mt-auto pt-3 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          {lowestPrice ? (
            <span className="text-white font-bold">
              {formatPrice(lowestPrice)}
              {priceRange && priceRange !== formatPrice(lowestPrice) && "+"}
            </span>
          ) : (
            <span className="text-green-400 font-medium">Pay What You Want</span>
          )}
          <div className="flex gap-1">
            {availableTiers.includes('community') && (
              <span className="text-xs px-1.5 py-0.5 bg-cyan-500/20 rounded text-cyan-400">
                ND
              </span>
            )}
            {availableTiers.includes('ally') && (
              <span className="text-xs px-1.5 py-0.5 bg-purple-500/20 rounded text-purple-400">
                Ally
              </span>
            )}
            {availableTiers.includes('corporate') && (
              <span className="text-xs px-1.5 py-0.5 bg-pink-500/20 rounded text-pink-400">
                Corp
              </span>
            )}
          </div>
        </div>
        
        {data.residualPercent && data.residualPercent > 0 && (
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span>✨</span>
            <span>{data.residualPercent}% to contributors</span>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestCardContent({ data }: { data: CardData & { type: 'quest' } }) {
  const difficultyColor = getDifficultyColor(data.difficulty);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">🏆</span>
          <span className="text-xs text-white/40">Quest</span>
        </div>
        {data.difficulty && (
          <span className={cn("text-xs px-2 py-0.5 rounded-full", difficultyColor)}>
            {data.difficulty}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm mb-4 line-clamp-2 flex-1">
          {truncateText(data.description, 120)}
        </p>
      )}
      
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
        {data.reward && (
          <div className="flex items-center gap-1 text-sm text-yellow-400">
            <span>✨</span>
            <span>{data.reward} XP</span>
          </div>
        )}
        {data.duration && (
          <div className="flex items-center gap-1 text-sm text-white/40">
            <span>⏱️</span>
            <span>{data.duration}</span>
          </div>
        )}
        {data.isCompleted && (
          <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400">
            Completed
          </Badge>
        )}
      </div>
    </div>
  );
}

function EventCardContent({ data }: { data: CardData & { type: 'event' } }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">🎭</span>
          <span className="text-xs text-white/40">Event</span>
        </div>
        {data.isLive && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-400">LIVE</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm mb-3 line-clamp-2">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      <div className="mt-auto pt-3 border-t border-white/10 space-y-1">
        {data.date && (
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>📅</span>
            <span>{data.date}</span>
            {data.time && <span>at {data.time}</span>}
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>📍</span>
            <span>{data.location === 'online' ? 'Online' : data.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ProposalCardContent({ data }: { data: CardData & { type: 'proposal' } }) {
  const statusColor = getProposalStatusColor(data.status);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">📜</span>
          <span className="text-xs text-white/40">Proposal</span>
        </div>
        {data.status && (
          <span className={cn("text-xs px-2 py-0.5 rounded-full", statusColor)}>
            {data.status}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm mb-3 line-clamp-2">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      {data.votesFor !== undefined && data.votesAgainst !== undefined && (
        <div className="mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">For: {data.votesFor}</span>
            <span className="text-red-400">Against: {data.votesAgainst}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(data.votesFor / (data.votesFor + data.votesAgainst)) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EntityCardContent({ data }: { data: CardData & { type: 'entity' } }) {
  const tempColor = getEntityTemperatureColor(data.temperature || 0);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">👁️</span>
          <span className="text-xs text-white/40">Entity</span>
        </div>
        {data.temperature !== undefined && (
          <span className={cn("text-xs px-2 py-0.5 rounded-full", tempColor)}>
            {data.temperature}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
        {data.title}
      </h3>
      
      {data.role && (
        <p className="text-xs text-cyan-400 mb-2">{data.role}</p>
      )}
      
      {data.description && (
        <p className="text-white/40 text-sm line-clamp-2">
          {truncateText(data.description, 100)}
        </p>
      )}
    </div>
  );
}

function CreatorCardContent({ data }: { data: CardData & { type: 'creator' } }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        {data.avatar ? (
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            <img src={data.avatar} alt={data.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-xl">{data.title[0]}</span>
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-white">{data.title}</h3>
          {data.house && (
            <p className="text-xs text-purple-400">{data.house}</p>
          )}
        </div>
      </div>
      
      {data.description && (
        <p className="text-white/40 text-sm line-clamp-2 mb-3">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      <div className="mt-auto flex items-center justify-between">
        {data.productCount !== undefined && (
          <span className="text-xs text-white/40">
            {data.productCount} creations
          </span>
        )}
        {data.isVerified && (
          <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400">
            ✓ Verified
          </Badge>
        )}
      </div>
    </div>
  );
}

function VendorCardContent({ data }: { data: CardData & { type: 'vendor' } }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        {data.logo ? (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5">
            <img src={data.logo} alt={data.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
            <span className="text-xl">🏪</span>
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-white">{data.title}</h3>
          {data.businessType && (
            <p className="text-xs text-white/40">{data.businessType}</p>
          )}
        </div>
      </div>
      
      {data.description && (
        <p className="text-white/40 text-sm line-clamp-2 mb-3">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      <div className="mt-auto flex items-center justify-between">
        {data.productCount !== undefined && (
          <span className="text-xs text-white/40">
            {data.productCount} products
          </span>
        )}
        {data.isVerified && (
          <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400">
            ✓ Verified
          </Badge>
        )}
      </div>
    </div>
  );
}

function StatCardContent({ data }: { data: CardData & { type: 'stat' } }) {
  const trendIcon = getTrendIcon(data.trend);
  
  return (
    <div className="text-center">
      <p className="text-sm text-white/40 mb-1">{data.title}</p>
      <p className="text-3xl font-bold text-white mb-2">{data.value}</p>
      {data.change !== undefined && (
        <p className={cn(
          "text-sm flex items-center justify-center gap-1",
          data.change > 0 ? "text-green-400" : data.change < 0 ? "text-red-400" : "text-white/40"
        )}>
          <span>{trendIcon}</span>
          <span>{Math.abs(data.change)}%</span>
        </p>
      )}
      {data.target && (
        <p className="text-xs text-white/40 mt-2">Target: {data.target}</p>
      )}
    </div>
  );
}

function StepCardContent({ data }: { data: CardData & { type: 'step' } }) {
  const status = getStepStatus(data);
  const statusColor = getStepStatusColor(status);
  
  return (
    <div className="flex items-start gap-3">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
        status === 'completed' ? "bg-green-500/20 text-green-400" :
        status === 'current' ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500" :
        "bg-white/10 text-white/40"
      )}>
        {status === 'completed' ? "✓" : data.stepNumber}
      </div>
      <div>
        <h3 className={cn("font-medium", statusColor)}>{data.title}</h3>
        {data.description && (
          <p className="text-white/40 text-sm mt-1">{data.description}</p>
        )}
      </div>
    </div>
  );
}

function GenericCardContent({ data }: { data: CardData }) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm line-clamp-3 flex-1">
          {truncateText(data.description, 150)}
        </p>
      )}
    </div>
  );
}

function ValueCardContent({ data }: { data: CardData & { type: 'value' } }) {
  const trendIcon = getTrendIcon(data.trend);
  const isPositive = data.change && data.change > 0;
  const isNegative = data.change && data.change < 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">💎</span>
          <span className="text-xs text-white/40">Value</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
        {data.title}
      </h3>
      
      <p className="text-3xl font-bold text-cyan-400 mb-2">
        {typeof data.value === 'number' ? `$${data.value.toLocaleString()}` : data.value}
      </p>
      
      {data.change !== undefined && (
        <div className={cn(
          "flex items-center gap-1 text-sm",
          isPositive ? "text-green-400" : isNegative ? "text-red-400" : "text-white/40"
        )}>
          <span>{trendIcon}</span>
          <span>{Math.abs(data.change)}%</span>
          <span className="text-white/40 text-xs ml-1">vs last period</span>
        </div>
      )}
      
      {data.description && (
        <p className="text-white/40 text-sm mt-2 line-clamp-2">
          {truncateText(data.description, 100)}
        </p>
      )}
    </div>
  );
}

function PillarCardContent({ data }: { data: CardData & { type: 'pillar' } }) {
  return (
    <div className="flex flex-col h-full text-center">
      {data.icon && (
        <div className="text-4xl mb-3 flex justify-center">
          {data.icon}
        </div>
      )}
      
      <h3 className="text-lg font-bold text-white mb-2">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm line-clamp-3 flex-1">
          {truncateText(data.description, 120)}
        </p>
      )}
      
      {data.order && (
        <div className="mt-3 text-xs text-white/30">
          Pillar {data.order}
        </div>
      )}
    </div>
  );
}

function PrincipleCardContent({ data }: { data: CardData & { type: 'principle' } }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">⚜️</span>
        <span className="text-xs text-cyan-400 uppercase tracking-wider">Principle</span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/60 text-base leading-relaxed flex-1">
          {data.description}
        </p>
      )}
      
      {data.order && (
        <div className="mt-4 text-xs text-white/30">
          {data.order}
        </div>
      )}
    </div>
  );
}

function InvitationCardContent({ data }: { data: CardData & { type: 'invitation' } }) {
  const isExpired = data.expiresAt && new Date(data.expiresAt) < new Date();
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">📧</span>
          <span className="text-xs text-white/40">Invitation</span>
        </div>
        {data.isAccepted && (
          <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400">
            Accepted
          </Badge>
        )}
        {isExpired && !data.isAccepted && (
          <Badge variant="destructive" size="sm" className="bg-red-500/20 text-red-400">
            Expired
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
        {data.title}
      </h3>
      
      {data.inviter && (
        <p className="text-xs text-cyan-400 mb-2">
          Invited by {data.inviter}
        </p>
      )}
      
      {data.description && (
        <p className="text-white/40 text-sm mb-3 line-clamp-2 flex-1">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      {data.expiresAt && !data.isAccepted && !isExpired && (
        <div className="mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>⏰</span>
            <span>Expires {new Date(data.expiresAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function PathwayCardContent({ data }: { data: CardData & { type: 'pathway' } }) {
  const progressPercent = data.progress || 0;
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">🛤️</span>
          <span className="text-xs text-white/40">Pathway</span>
        </div>
        {progressPercent > 0 && (
          <span className="text-xs text-cyan-400">{progressPercent}%</span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-sm mb-3 line-clamp-2 flex-1">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      <div className="mt-auto pt-3 border-t border-white/10 space-y-2">
        {(data.modules !== undefined || data.completedModules !== undefined) && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Progress</span>
            <span className="text-white/60">{data.completedModules || 0}/{data.modules || 0} modules</span>
          </div>
        )}
        {progressPercent > 0 && (
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function UserCardContent({ data }: { data: CardData & { type: 'user' } }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        {data.avatar ? (
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            <img src={data.avatar} alt={data.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-xl">👤</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">{data.title}</h3>
            {data.isOnline && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          {data.role && (
            <p className="text-xs text-white/40">{data.role}</p>
          )}
        </div>
      </div>
      
      {data.description && (
        <p className="text-white/40 text-sm line-clamp-2 mb-3">
          {truncateText(data.description, 100)}
        </p>
      )}
      
      {data.joinDate && (
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-white/40">
          <span>📅</span>
          <span>Joined {new Date(data.joinDate).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
}

function FileCardContent({ data }: { data: CardData & { type: 'file' } }) {
  const fileIcon = getFileTypeIcon(data.fileType);
  const formattedSize = data.size ? formatFileSize(data.size) : null;
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
          {fileIcon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white line-clamp-2">
            {data.title}
          </h3>
          {data.category && (
            <p className="text-xs text-white/40">{data.category}</p>
          )}
        </div>
      </div>
      
      {data.description && (
        <p className="text-white/40 text-xs line-clamp-2 mb-2">
          {truncateText(data.description, 80)}
        </p>
      )}
      
      <div className="mt-auto pt-2 border-t border-white/10 flex items-center justify-between text-xs">
        {formattedSize && (
          <span className="text-white/40">{formattedSize}</span>
        )}
        {data.modifiedAt && (
          <span className="text-white/40">
            Modified {new Date(data.modifiedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}

function SchemaTableCardContent({ data }: { data: CardData & { type: 'schema-table' } }) {
  const icon = getSchemaTypeIcon('table');
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-cyan-400 uppercase tracking-wider">Table</span>
      </div>
      
      <h3 className="text-base font-bold text-white mb-1 font-mono">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-xs mb-2 line-clamp-2">
          {truncateText(data.description, 80)}
        </p>
      )}
      
      <div className="mt-auto pt-2 border-t border-white/10 flex items-center gap-3 text-xs">
        {data.columns !== undefined && (
          <span className="text-white/40">📊 {data.columns} columns</span>
        )}
        {data.rows !== undefined && (
          <span className="text-white/40">📋 {data.rows} rows</span>
        )}
        {data.isView && (
          <Badge variant="outline" size="sm" className="text-purple-400">
            View
          </Badge>
        )}
      </div>
    </div>
  );
}

function SchemaEnumCardContent({ data }: { data: CardData & { type: 'schema-enum' } }) {
  const icon = getSchemaTypeIcon('enum');
  const displayValues = data.values?.slice(0, 3) || [];
  const remainingCount = (data.values?.length || 0) - displayValues.length;
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-cyan-400 uppercase tracking-wider">Enum</span>
      </div>
      
      <h3 className="text-base font-bold text-white mb-1 font-mono">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-xs mb-2 line-clamp-2">
          {truncateText(data.description, 80)}
        </p>
      )}
      
      <div className="mt-auto pt-2 border-t border-white/10">
        <div className="flex flex-wrap gap-1 mb-1">
          {displayValues.map((value, idx) => (
            <code key={idx} className="text-xs bg-white/10 px-1.5 py-0.5 rounded">
              {value}
            </code>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs text-white/40">+{remainingCount} more</span>
          )}
        </div>
        {data.valueCount !== undefined && (
          <div className="text-xs text-white/40">
            {data.valueCount} total values
          </div>
        )}
      </div>
    </div>
  );
}

function SchemaFunctionCardContent({ data }: { data: CardData & { type: 'schema-function' } }) {
  const icon = getSchemaTypeIcon('function');
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-cyan-400 uppercase tracking-wider">Function</span>
      </div>
      
      <h3 className="text-base font-bold text-white mb-1 font-mono">
        {data.title}
      </h3>
      
      {data.description && (
        <p className="text-white/40 text-xs mb-2 line-clamp-2">
          {truncateText(data.description, 80)}
        </p>
      )}
      
      <div className="mt-auto pt-2 border-t border-white/10">
        {data.parameters && data.parameters.length > 0 && (
          <div className="text-xs text-white/40 mb-1">
            <span className="text-cyan-400">Parameters:</span> {data.parameters.join(', ')}
          </div>
        )}
        {data.returnType && (
          <div className="text-xs text-white/40">
            <span className="text-cyan-400">Returns:</span> {data.returnType}
          </div>
        )}
        {data.isProcedure && (
          <Badge variant="outline" size="sm" className="mt-2 text-purple-400">
            Procedure (no return)
          </Badge>
        )}
      </div>
    </div>
  );
}