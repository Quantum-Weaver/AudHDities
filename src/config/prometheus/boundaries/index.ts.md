/**
 * @system PROMETHEUS
 * @config Boundary Rules
 * @purpose Vetting rules and generation boundaries
 * @created 2026-04-12
 */

import type { BoundaryRule } from '@/scripts/system/prometheus/vetting';
import { ProtocolLevel } from '@/lib/encryption/';

/**
 * Boundary configuration
 * Defines what PROMETHEUS may and may not generate
 */
export const boundaries: BoundaryConfig = {
  // Allowed patterns - always generatable
  allowedPatterns: [
    'constants',
    'types',
    'validators',
    'utils',
    'api',
    'hooks'
  ],
  
  // Forbidden patterns - never generatable
  forbiddenPatterns: [
    // Security-sensitive patterns
    'auth-secrets',
    'private-keys',
    'passwords',
    'tokens',
    
    // Destructive patterns
    'drop-database',
    'delete-all',
    'rm-rf',
    'format-drive'
  ],
  
  // Restricted paths - require special handling
  restrictedPaths: [
    {
      pathPattern: /^@\/lib\/encryption\//,
      level: 'RESTRICTED',
      reason: 'Encryption module - requires security review',
      requiresApproval: true,
      encryptionLevel: ProtocolLevel.HIGH
    },
    {
      pathPattern: /^@\/config\/secrets\//,
      level: 'FORBIDDEN',
      reason: 'Secrets must be managed via environment variables'
    },
    {
      pathPattern: /\.env/,
      level: 'FORBIDDEN',
      reason: 'Environment files must not be generated'
    },
    {
      pathPattern: /^prisma\/migrations\//,
      level: 'RESTRICTED',
      reason: 'Database migrations require careful review',
      requiresApproval: true
    }
  ],
  
  // Custom boundary rules
  rules: [
    {
      type: 'allow',
      pattern: 'constants',
      reason: 'Constants are safe to generate'
    },
    {
      type: 'allow',
      pattern: 'types',
      reason: 'Type definitions are safe to generate'
    },
    {
      type: 'forbid',
      pattern: 'auth-secrets',
      reason: 'Never generate authentication secrets'
    },
    {
      type: 'restrict',
      pathPattern: 'src/lib/encryption',
      reason: 'Encryption code requires security review'
    }
  ]
};

export interface BoundaryConfig {
  allowedPatterns: string[];
  forbiddenPatterns: string[];
  restrictedPaths: RestrictedPath[];
  rules: BoundaryRule[];
}

export interface RestrictedPath {
  pathPattern: RegExp;
  level: 'ALLOWED' | 'RESTRICTED' | 'FORBIDDEN';
  reason: string;
  requiresApproval?: boolean;
  encryptionLevel?: ProtocolLevel;
}

// File content sensitivity checks
export const SENSITIVE_PATTERNS = [
  /API[_-]?KEY/i,
  /SECRET/i,
  /PASSWORD/i,
  /TOKEN/i,
  /PRIVATE[_-]?KEY/i,
  /CREDENTIALS/i
];

// Maximum file sizes by pattern
export const SIZE_LIMITS = {
  constants: 1024 * 10,      // 10KB
  types: 1024 * 50,          // 50KB
  validators: 1024 * 20,     // 20KB
  utils: 1024 * 100,         // 100KB
  api: 1024 * 200,           // 200KB
  hooks: 1024 * 50           // 50KB
};

// Approval workflow configuration
export const APPROVAL_WORKFLOW = {
  enabled: true,
  requiredForLevels: ['RESTRICTED'],
  approvers: ['admin', 'security', 'lead-developer'],
  timeout: 3600000 // 1 hour
};

// TODO: Add dynamic rule loading
// TODO: Implement rule inheritance
// TODO: Add environment-specific boundaries
// TODO: Create boundary audit logging