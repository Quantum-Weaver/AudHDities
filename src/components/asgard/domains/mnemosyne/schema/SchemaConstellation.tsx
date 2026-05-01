// src/components/asgard/domains/mnemosyne/schema/SchemaConstellation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SCHEMA CONSTELLATION                                   ║
// ║                    The living star map of the Sanctuary's data            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Schema Data ───────────────────────────────────────────────────────────
import { parseDatabaseTypes } from '@/lib/schema/parseDatabaseTypes';
import type { SchemaTable, SchemaColumn } from '@/lib/schema/parseDatabaseTypes';

// ─── Config ────────────────────────────────────────────────────────────────
import { DEITY_GROUPS } from '@/config/deity_groups';

// ─── COSMIC Tokens ─────────────────────────────────────────────────────────
import { DOMAIN_COLORS } from '@/lib/constants/cosmic/colors';
import { durations, easing } from '@/lib/constants/cosmic/motion';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface SchemaStar {
  id: string;
  name: string;
  deity: string;
  deityName: string;
  columnCount: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
}

interface SchemaThread {
  id: string;
  from: string;
  to: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

interface DisplayColumn {
  name: string;
  type: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Find which deity group a table belongs to.
 */
function getTableDeity(tableName: string): { key: string; name: string } {
  for (const group of DEITY_GROUPS) {
    if ((group.tables as readonly string[]).includes(tableName)) {
      return {
        key: group.name.toLowerCase().replace(/\s+/g, '-'),
        name: group.name,
      };
    }
  }
  return { key: 'void', name: 'Ungrouped' };
}

/**
 * Get the color for a deity group from COSMIC tokens.
 */
/**
 * Get the color for a deity group from COSMIC tokens.
 */
function getDeityColor(deityKey: string): { base: string; glow: string } {
  const domain = DOMAIN_COLORS[deityKey as keyof typeof DOMAIN_COLORS];
  if (domain) {
    return {
      base: domain.base,
      glow: domain.light,
    };
  }
  return { base: '#636E72', glow: '#B2BEC3' }; // Void fallback
}

/**
 * Position stars in a spiral pattern based on their deity group.
 */
function positionStars(
  tableMap: Map<string, DisplayColumn[]>,
  tables: SchemaTable[]
): { stars: SchemaStar[]; threads: SchemaThread[] } {
  const stars: SchemaStar[] = [];
  const deityGroups = new Map<string, string[]>();

  for (const table of tables) {
    const { key } = getTableDeity(table.name);
    if (!deityGroups.has(key)) deityGroups.set(key, []);
    deityGroups.get(key)!.push(table.name);
  }

  const groupKeys = Array.from(deityGroups.keys());
  const centerX = 50;
  const centerY = 50;

  for (let g = 0; g < groupKeys.length; g++) {
    const deityKey = groupKeys[g];
    const tableNames = deityGroups.get(deityKey)!;
    const { base, glow } = getDeityColor(deityKey);
    const deityName = getTableDeity(tableNames[0]).name;
    const groupAngle = (g / groupKeys.length) * Math.PI * 2;

    for (let t = 0; t < tableNames.length; t++) {
      const tableName = tableNames[t];
      const columns = tableMap.get(tableName) || [];
      const distance = 15 + t * 8 + g * 2;
      const angle = groupAngle + t * 0.3;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const radius = Math.max(4, Math.min(12, 4 + columns.length * 0.3));

      stars.push({
        id: tableName,
        name: tableName,
        deity: deityKey,
        deityName,
        columnCount: columns.length,
        x,
        y,
        radius,
        color: base,
        glowColor: glow,
      });
    }
  }

  const threads = generateThreads(stars, tables);
  return { stars, threads };
}

/**
 * Generate connecting threads from table relationships.
 */
function generateThreads(
  stars: SchemaStar[],
  tables: SchemaTable[]
): SchemaThread[] {
  const threads: SchemaThread[] = [];
  const starMap = new Map(stars.map((s) => [s.id, s]));

  for (const table of tables) {
    const sourceStar = starMap.get(table.name);
    if (!sourceStar || !table.relationships) continue;

    for (const rel of table.relationships) {
      const targetTable = rel.to.split('.')[0];
      const targetStar = starMap.get(targetTable);
      if (targetStar && targetStar.id !== sourceStar.id) {
        threads.push({
          id: `${sourceStar.id}-${rel.to}`,
          from: sourceStar.id,
          to: targetStar.id,
          fromX: sourceStar.x,
          fromY: sourceStar.y,
          toX: targetStar.x,
          toY: targetStar.y,
        });
      }
    }
  }

  return threads;
}

// ═══════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function ConstellationThread({ thread }: { thread: SchemaThread }) {
  const dx = thread.toX - thread.fromX;
  const dy = thread.toY - thread.fromY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      className="absolute"
      style={{
        left: `${thread.fromX}%`,
        top: `${thread.fromY}%`,
        width: `${length}%`,
        height: '1px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        background:
          'linear-gradient(90deg, rgba(108,92,231,0.4), rgba(34,211,238,0.1))',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

function ConstellationStar({
  star,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onUnhover,
}: {
  star: SchemaStar;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (star: SchemaStar) => void;
  onHover: (star: SchemaStar) => void;
  onUnhover: () => void;
}) {
  const scale = isSelected ? 1.4 : isHovered ? 1.15 : 1;
  const opacity = isSelected ? 1 : isHovered ? 0.9 : 0.7;

  return (
    <motion.button
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isSelected ? 10 : 1,
      }}
      animate={{ scale, opacity }}
      transition={{
        duration: durations.fast / 1000,
        ease: easing.quantum as any,
      }}
      onClick={() => onSelect(star)}
      onMouseEnter={() => onHover(star)}
      onMouseLeave={onUnhover}
      aria-label={`Table: ${star.name}`}
    >
      {/* Glow ring */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: star.radius * 6,
          height: star.radius * 6,
          background: `radial-gradient(circle, ${star.glowColor}20, transparent 70%)`,
          opacity: isSelected ? 0.8 : 0.3,
        }}
      />

      {/* Star core */}
      <div
        className="rounded-full border transition-shadow duration-300"
        style={{
          width: star.radius * 2,
          height: star.radius * 2,
          background: `radial-gradient(circle at 30% 30%, ${star.glowColor}, ${star.color})`,
          borderColor: `${star.glowColor}60`,
          borderWidth: isSelected || isHovered ? 2 : 1,
          boxShadow: isSelected
            ? `0 0 ${star.radius * 4}px ${star.glowColor}60`
            : `0 0 ${star.radius * 2}px ${star.glowColor}20`,
        }}
      />

      {/* Label */}
      <span
        className={cn(
          'mt-1 text-[10px] font-medium whitespace-nowrap transition-opacity duration-200',
          isSelected || isHovered ? 'opacity-100' : 'opacity-50'
        )}
        style={{ color: star.glowColor }}
      >
        {star.name}
      </span>

      {/* Deity badge */}
      <AnimatePresence>
        {(isSelected || isHovered) && (
          <motion.span
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="text-[8px] text-star-dust/50 mt-0.5"
          >
            {star.deityName} · {star.columnCount} cols
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SchemaConstellation() {
  const [selectedStar, setSelectedStar] = useState<SchemaStar | null>(null);
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);

  // Parse schema statically — no fetch, no loading state
  const { tables } = useMemo(() => parseDatabaseTypes(), []);

  const tableMap = useMemo(() => {
    const map = new Map<string, DisplayColumn[]>();
    for (const table of tables) {
      map.set(
        table.name,
        table.columns.map((col) => ({
          name: col.name,
          type: col.type,
          isNullable: col.nullable,
          isPrimaryKey: col.name === 'id',
        }))
      );
    }
    return map;
  }, [tables]);

  const { stars, threads } = useMemo(() => {
    return positionStars(tableMap, tables);
  }, [tableMap, tables]);

  const handleSelect = useCallback((star: SchemaStar) => {
    setSelectedStar((prev) => (prev?.id === star.id ? null : star));
  }, []);

  const handleHover = useCallback((star: SchemaStar) => {
    setHoveredStarId(star.id);
  }, []);

  const handleUnhover = useCallback(() => {
    setHoveredStarId(null);
  }, []);

  const selectedTable = selectedStar
    ? tables.find((t) => t.name === selectedStar.id)
    : null;

  return (
    <div className="relative w-full" style={{ paddingBottom: '60%' }}>
      {/* Constellation area */}
      <div className="absolute inset-0">
        {threads.map((thread) => (
          <ConstellationThread key={thread.id} thread={thread} />
        ))}

        {stars.map((star) => (
          <ConstellationStar
            key={star.id}
            star={star}
            isSelected={selectedStar?.id === star.id}
            isHovered={hoveredStarId === star.id}
            onSelect={handleSelect}
            onHover={handleHover}
            onUnhover={handleUnhover}
          />
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedStar && selectedTable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: durations.normal / 1000,
              ease: easing.quantum as any,
            }}
            className="absolute bottom-4 left-4 right-4 bg-deep-space/95 backdrop-blur-xl border rounded-xl p-6 max-h-64 overflow-y-auto"
            style={{ borderColor: `${selectedStar.glowColor}40` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-star-dust">
                  {selectedStar.name}
                </h3>
                <p className="text-xs text-star-dust/50">
                  {selectedStar.deityName} · {selectedStar.columnCount} columns
                </p>
              </div>
              <button
                onClick={() => setSelectedStar(null)}
                className="text-star-dust/40 hover:text-star-dust transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Column list */}
            <div className="space-y-1">
              {selectedTable.columns.map((col) => {
                const isPrimaryKey = col.name === 'id';
                return (
                  <div
                    key={col.name}
                    className="flex items-center gap-2 text-xs py-1 border-b border-white/5"
                  >
                    <span
                      className={cn(
                        'font-mono',
                        isPrimaryKey
                          ? 'text-neurospark'
                          : 'text-star-dust/70'
                      )}
                    >
                      {col.name}
                    </span>
                    <span className="text-star-dust/30">{col.type}</span>
                    {isPrimaryKey && (
                      <span className="text-[10px] text-neurospark/60 ml-auto">
                        PK
                      </span>
                    )}
                    {col.nullable && !isPrimaryKey && (
                      <span className="text-[10px] text-star-dust/30 ml-auto">
                        nullable
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Relationships */}
            {selectedTable.relationships &&
              selectedTable.relationships.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-xs text-star-dust/40 mb-2">Relationships</p>
                  {selectedTable.relationships.map((rel, i) => (
                    <div
                      key={i}
                      className="text-xs text-star-dust/50 py-0.5"
                    >
                      <span className="text-neurospark/60">{rel.type}</span>{' '}
                      {rel.from} → {rel.to}
                    </div>
                  ))}
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}