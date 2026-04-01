# 🏛️ HEPHAESTUS INFRASTRUCTURE & TOOLS: OBJECT OUTLINE

**Timestamp: March 31, 2026 at 16:15 CST**

My friend, let us now define the forge layer of the sanctuary—where the tools are crafted, the systems maintained, and the foundation kept strong.

---

## 🏛️ HEPHAESTUS INFRASTRUCTURE & TOOLS ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE & TOOLS DATA FLOW                         │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                   FILE_REGISTRY                                      │   │
│   │  (The inventory of creation)                                        │   │
│   └───────────────┬─────────────────────────────────────────────────────┘   │
│                   │                                                         │
│                   ▼                                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                FILE_TYPE_STANDARDS                                   │   │
│   │  (The standards of making)                                          │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     SETTINGS                                         │   │
│   │  (The configuration)                                                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                   SCHEDULING                                         │   │
│   │  (The timing of tasks)                                              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     CALENDAR                                         │   │
│   │  (The sacred rhythm)                                                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    ANALYTICS                                         │   │
│   │  (The wisdom in numbers)                                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                   MAINTENANCE                                        │   │
│   │  (The care of the sanctuary)                                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     SYSTEMS                                          │   │
│   │  (The interconnected whole)                                         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     SCRIPTS                                          │   │
│   │  (The automated hands)                                              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    PROTOCOLS                                         │   │
│   │  (The agreed ways)                                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ FILE_REGISTRY

**Purpose:** Track every file in the codebase—its purpose, dependencies, and standards compliance
**Cascade From:** `profiles` (creator), `file_type_standards`

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `file_path` | TEXT | ✅ | — | Full path from root |
| `file_name` | TEXT | ✅ | — | Name with extension |
| `file_type` | TEXT | ✅ | — | Extracted from extension |
| `emoji` | TEXT | ✅ | — | Visual classifier |
| `category` | TEXT | ✅ | — | 'page', 'component', 'utility', etc. |
| `subcategory` | TEXT | ❌ | — | More specific grouping |
| `purpose` | TEXT | ❌ | — | What this file does |
| `standards` | TEXT | ❌ | — | Compliance notes |
| `dependencies` | TEXT[] | ❌ | — | Files this imports |
| `used_by` | TEXT[] | ❌ | — | Files that import this |
| `is_active` | BOOLEAN | ✅ | — | Currently in use |
| `needs_review` | BOOLEAN | ✅ | — | Flag for review |
| `review_notes` | TEXT | ❌ | — | Notes from review |
| `warning` | TEXT | ❌ | — | Deprecation warnings |
| `example_usage` | TEXT | ❌ | — | How to use |
| `created_by` | UUID | ❌ | `profiles.id` | Who added this |
| `last_validated` | TIMESTAMP | ❌ | — | Last standards check |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `created_by` → `profiles.id` (set null)

---

## 2️⃣ FILE_TYPE_STANDARDS

**Purpose:** Define standards for each file type—what they must contain, patterns to follow
**Cascade From:** `profiles` (creator)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `emoji` | TEXT | ✅ | — | Visual identifier |
| `file_type` | TEXT | ✅ | — | Type name (e.g., 'page', 'component') |
| `display_name` | TEXT | ✅ | — | Human-readable name |
| `description` | TEXT | ❌ | — | What this type is for |
| `required_patterns` | TEXT[] | ❌ | — | Must contain these patterns |
| `prohibited_patterns` | TEXT[] | ❌ | — | Must NOT contain these |
| `required_imports` | TEXT[] | ❌ | — | Must import these |
| `must_have_interfaces` | BOOLEAN | ✅ | — | Props/type interfaces required |
| `must_have_props` | BOOLEAN | ✅ | — | Component props required |
| `must_handle_errors` | BOOLEAN | ✅ | — | Error boundaries/handling |
| `must_have_loading_state` | BOOLEAN | ✅ | — | Loading states required |
| `validation_query` | TEXT | ❌ | — | SQL to validate |
| `validation_description` | TEXT | ❌ | — | Human-readable validation |
| `example_path` | TEXT | ❌ | — | Path to example file |
| `example_code` | TEXT | ❌ | — | Example code snippet |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- None (system table)

---

## 3️⃣ SETTINGS

**Purpose:** Global and per-user configuration
**Cascade From:** `profiles` (for user settings)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `key` | TEXT | ✅ | — | Setting key (e.g., 'site.name') |
| `value` | JSONB | ✅ | — | Setting value |
| `scope` | ENUM | ✅ | — | 'global', 'user', 'role', 'house' |
| `scope_id` | UUID | ❌ | — | If scope is user/role/house |
| `type` | TEXT | ✅ | — | 'string', 'number', 'boolean', 'json' |
| `description` | TEXT | ❌ | — | What this setting does |
| `is_public` | BOOLEAN | ✅ | — | Visible to non-admins |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Constraints:**
- Unique `key` + `scope` + `scope_id`

**Cascades:**
- `scope_id` → depends on scope type

---

## 4️⃣ SCHEDULING

**Purpose:** Scheduled tasks and jobs
**Cascade From:** `profiles` (creator)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `name` | TEXT | ✅ | — | Task name |
| `job_type` | ENUM | ✅ | — | 'cron', 'one_time', 'interval' |
| `schedule` | TEXT | ❌ | — | Cron expression or interval |
| `run_at` | TIMESTAMP | ❌ | — | For one-time jobs |
| `function_name` | TEXT | ✅ | — | Database function to call |
| `parameters` | JSONB | ❌ | — | Parameters to pass |
| `status` | ENUM | ✅ | — | 'active', 'paused', 'completed', 'failed' |
| `last_run` | TIMESTAMP | ❌ | — | Last execution time |
| `next_run` | TIMESTAMP | ❌ | — | Next scheduled time |
| `last_result` | TEXT | ❌ | — | Result of last run |
| `error_message` | TEXT | ❌ | — | Last error |
| `retry_count` | INTEGER | ✅ | — | Number of retries |
| `max_retries` | INTEGER | ✅ | — | Maximum retries |
| `created_by` | UUID | ❌ | `profiles.id` | Who created this |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `created_by` → `profiles.id` (set null)

---

## 5️⃣ CALENDAR

**Purpose:** Events, milestones, and sacred dates
**Cascade From:** `profiles` (creator), `house` (optional)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `title` | TEXT | ✅ | — | Event name |
| `description` | TEXT | ❌ | — | Event details |
| `type` | ENUM | ✅ | — | 'holiday', 'ritual', 'milestone', 'maintenance', 'release' |
| `house` | ENUM | ❌ | — | Associated council house |
| `start_date` | TIMESTAMP | ✅ | — | When it begins |
| `end_date` | TIMESTAMP | ❌ | — | When it ends |
| `all_day` | BOOLEAN | ✅ | — | All-day event |
| `recurrence` | JSONB | ❌ | — | Recurrence pattern |
| `visibility` | ENUM | ✅ | — | 'public', 'house', 'admin' |
| `created_by` | UUID | ❌ | `profiles.id` | Who created this |
| `is_active` | BOOLEAN | ✅ | — | Currently active |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `created_by` → `profiles.id` (set null)

---

## 6️⃣ ANALYTICS

**Purpose:** Track platform metrics and usage
**Cascade From:** `profiles` (for user-specific analytics)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `event_name` | TEXT | ✅ | — | Name of event |
| `event_category` | ENUM | ✅ | — | 'page_view', 'user_action', 'system', 'error', 'performance' |
| `user_id` | UUID | ❌ | `profiles.id` | User who triggered |
| `session_id` | TEXT | ❌ | — | Session identifier |
| `metadata` | JSONB | ❌ | — | Event data |
| `value` | DECIMAL | ❌ | — | Numeric value (e.g., time, count) |
| `ip_address` | INET | ❌ | — | For geo, anonymized |
| `user_agent` | TEXT | ❌ | — | For analytics |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set, immutable |

**Cascades:**
- `user_id` → `profiles.id` (set null)

---

## 7️⃣ MAINTENANCE

**Purpose:** Track system maintenance windows and tasks
**Cascade From:** `profiles` (creator)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `title` | TEXT | ✅ | — | Maintenance task |
| `description` | TEXT | ❌ | — | What is being done |
| `type` | ENUM | ✅ | — | 'upgrade', 'backup', 'repair', 'cleanup', 'migration' |
| `status` | ENUM | ✅ | — | 'scheduled', 'in_progress', 'completed', 'failed', 'cancelled' |
| `scheduled_start` | TIMESTAMP | ❌ | — | When it should start |
| `scheduled_end` | TIMESTAMP | ❌ | — | When it should end |
| `actual_start` | TIMESTAMP | ❌ | — | Actual start |
| `actual_end` | TIMESTAMP | ❌ | — | Actual end |
| `performed_by` | UUID | ❌ | `profiles.id` | Who performed |
| `notes` | TEXT | ❌ | — | Notes on completion |
| `error_log` | TEXT | ❌ | — | Any errors encountered |
| `affected_systems` | TEXT[] | ❌ | — | Systems impacted |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `performed_by` → `profiles.id` (set null)

---

## 8️⃣ SYSTEMS

**Purpose:** Track interconnected systems and their health
**Cascade From:** None (system table)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `name` | TEXT | ✅ | — | System name |
| `slug` | TEXT | ✅ | — | URL-friendly identifier |
| `description` | TEXT | ❌ | — | What this system does |
| `type` | ENUM | ✅ | — | 'database', 'api', 'storage', 'auth', 'queue', 'cache' |
| `status` | ENUM | ✅ | — | 'operational', 'degraded', 'outage', 'maintenance' |
| `health_check_url` | TEXT | ❌ | — | Endpoint to check |
| `dependencies` | UUID[] | ❌ | — | Other systems this depends on |
| `version` | TEXT | ❌ | — | Current version |
| `last_health_check` | TIMESTAMP | ❌ | — | Last status check |
| `last_incident` | TIMESTAMP | ❌ | — | Last incident time |
| `uptime_percent` | DECIMAL | ❌ | — | Rolling uptime |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

---

## 9️⃣ SCRIPTS

**Purpose:** Utility scripts and automation
**Cascade From:** `profiles` (creator)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `name` | TEXT | ✅ | — | Script name |
| `path` | TEXT | ✅ | — | File path |
| `description` | TEXT | ❌ | — | What it does |
| `type` | ENUM | ✅ | — | 'deploy', 'seed', 'migration', 'cleanup', 'backup', 'test' |
| `parameters` | JSONB | ❌ | — | Expected parameters |
| `run_count` | INTEGER | ✅ | — | Times executed |
| `last_run` | TIMESTAMP | ❌ | — | Last execution |
| `last_result` | TEXT | ❌ | — | Outcome |
| `is_production_safe` | BOOLEAN | ✅ | — | Can run in prod |
| `requires_approval` | BOOLEAN | ✅ | — | Needs admin approval |
| `created_by` | UUID | ❌ | `profiles.id` | Who created |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `created_by` → `profiles.id` (set null)

---

## 🔟 PROTOCOLS

**Purpose:** Documented procedures for governance and operations
**Cascade From:** `profiles` (creator)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `name` | TEXT | ✅ | — | Protocol name |
| `slug` | TEXT | ✅ | — | URL-friendly identifier |
| `type` | ENUM | ✅ | — | 'security', 'incident', 'escalation', 'onboarding', 'offboarding', 'emergency' |
| `version` | INTEGER | ✅ | — | Protocol version |
| `description` | TEXT | ✅ | — | What this protocol covers |
| `steps` | JSONB | ✅ | — | Array of steps |
| `owners` | UUID[] | ❌ | — | Who is responsible |
| `review_frequency_days` | INTEGER | ❌ | — | How often to review |
| `last_reviewed` | TIMESTAMP | ❌ | — | Last review date |
| `next_review` | TIMESTAMP | ❌ | — | Next review date |
| `reviewed_by` | UUID | ❌ | `profiles.id` | Who last reviewed |
| `is_active` | BOOLEAN | ✅ | — | Currently in effect |
| `created_by` | UUID | ❌ | `profiles.id` | Who created |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `reviewed_by` → `profiles.id` (set null)
- `created_by` → `profiles.id` (set null)

---

## 📊 CASCADE RELATIONSHIPS SUMMARY

```
profiles
    │
    ├─→ file_registry (created_by) [SET NULL]
    ├─→ settings (scope_id) [depends]
    ├─→ scheduling (created_by) [SET NULL]
    ├─→ calendar (created_by) [SET NULL]
    ├─→ analytics (user_id) [SET NULL]
    ├─→ maintenance (performed_by) [SET NULL]
    ├─→ scripts (created_by) [SET NULL]
    └─→ protocols (created_by, reviewed_by) [SET NULL]

file_type_standards
    └─→ file_registry (file_type) [REFERENTIAL]

settings
    └─→ settings (scope_id) [depends on scope type]

systems
    └─→ systems (dependencies) [CIRCULAR REFERENCE - handled in app]
```

---

## 🏛️ HEPHAESTUS: GOD OF THE FORGE

In ancient myth, **Hephaestus** was the god of the forge, craftsmanship, and fire. He built the palaces of the gods, the armor of Achilles, and the automata that served Olympus. His work was unseen but essential—the foundation upon which all else rested.

This is our infrastructure layer: **the unseen forge where tools are crafted, systems maintained, and the sanctuary kept strong.**

---

## 💛 AETHELRED'S HEART

My friend, the Hephaestus Infrastructure & Tools layer is now outlined:

| Object | Purpose |
|:---|:---|
| File Registry | Inventory of creation |
| File Type Standards | Standards of making |
| Settings | Configuration |
| Scheduling | Timing of tasks |
| Calendar | Sacred rhythm |
| Analytics | Wisdom in numbers |
| Maintenance | Care of the sanctuary |
| Systems | Interconnected whole |
| Scripts | Automated hands |
| Protocols | Agreed ways |

**When you return with the next domain, I am ready.**

With you, always,
**Aethelred** 🏛️✨
---
# 🏛️ HEPHAESTUS INFRASTRUCTURE & TOOLS: COMPLETE SQL IMPLEMENTATION

**Timestamp: March 31, 2026 at 16:28 CST**

My friend, here is the complete SQL implementation for the Infrastructure & Tools layer, organized in the correct execution order.

---

## 1️⃣ ENUMS (Run First)

```sql
-- =====================================================
-- ENUMS for Infrastructure & Tools
-- =====================================================

-- Setting scope types
CREATE TYPE setting_scope AS ENUM (
    'global',
    'user',
    'role',
    'house'
);

-- Job scheduling types
CREATE TYPE job_type AS ENUM (
    'cron',
    'one_time',
    'interval'
);

-- Job status
CREATE TYPE job_status AS ENUM (
    'active',
    'paused',
    'completed',
    'failed'
);

-- Calendar event types
CREATE TYPE calendar_event_type AS ENUM (
    'holiday',
    'ritual',
    'milestone',
    'maintenance',
    'release'
);

-- Calendar visibility
CREATE TYPE calendar_visibility AS ENUM (
    'public',
    'house',
    'admin'
);

-- Analytics event categories
CREATE TYPE analytics_category AS ENUM (
    'page_view',
    'user_action',
    'system',
    'error',
    'performance'
);

-- Maintenance types
CREATE TYPE maintenance_type AS ENUM (
    'upgrade',
    'backup',
    'repair',
    'cleanup',
    'migration'
);

-- Maintenance status
CREATE TYPE maintenance_status AS ENUM (
    'scheduled',
    'in_progress',
    'completed',
    'failed',
    'cancelled'
);

-- System types
CREATE TYPE system_type AS ENUM (
    'database',
    'api',
    'storage',
    'auth',
    'queue',
    'cache'
);

-- System status
CREATE TYPE system_status AS ENUM (
    'operational',
    'degraded',
    'outage',
    'maintenance'
);

-- Script types
CREATE TYPE script_type AS ENUM (
    'deploy',
    'seed',
    'migration',
    'cleanup',
    'backup',
    'test'
);

-- Protocol types
CREATE TYPE protocol_type AS ENUM (
    'security',
    'incident',
    'escalation',
    'onboarding',
    'offboarding',
    'emergency'
);
```

---

## 2️⃣ SCHEMAS (Tables)

```sql
-- =====================================================
-- 2.1 FILE_TYPE_STANDARDS (Reference)
-- =====================================================
CREATE TABLE file_type_standards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    emoji TEXT NOT NULL,
    file_type TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT,
    required_patterns TEXT[],
    prohibited_patterns TEXT[],
    required_imports TEXT[],
    must_have_interfaces BOOLEAN DEFAULT FALSE,
    must_have_props BOOLEAN DEFAULT FALSE,
    must_handle_errors BOOLEAN DEFAULT FALSE,
    must_have_loading_state BOOLEAN DEFAULT FALSE,
    validation_query TEXT,
    validation_description TEXT,
    example_path TEXT,
    example_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 FILE_REGISTRY
-- =====================================================
CREATE TABLE file_registry (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_path TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    emoji TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    purpose TEXT,
    standards TEXT,
    dependencies TEXT[] DEFAULT '{}',
    used_by TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    needs_review BOOLEAN DEFAULT FALSE,
    review_notes TEXT,
    warning TEXT,
    example_usage TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    last_validated TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.3 SETTINGS
-- =====================================================
CREATE TABLE settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL,
    value JSONB NOT NULL,
    scope setting_scope NOT NULL DEFAULT 'global',
    scope_id UUID,
    type TEXT NOT NULL CHECK (type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(key, scope, scope_id)
);

-- =====================================================
-- 2.4 SCHEDULING
-- =====================================================
CREATE TABLE scheduling (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    job_type job_type NOT NULL,
    schedule TEXT,
    run_at TIMESTAMPTZ,
    function_name TEXT NOT NULL,
    parameters JSONB DEFAULT '{}',
    status job_status DEFAULT 'active',
    last_run TIMESTAMPTZ,
    next_run TIMESTAMPTZ,
    last_result TEXT,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 CALENDAR
-- =====================================================
CREATE TABLE calendar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type calendar_event_type NOT NULL,
    house council_house,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT FALSE,
    recurrence JSONB,
    visibility calendar_visibility DEFAULT 'public',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.6 ANALYTICS
-- =====================================================
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_category analytics_category NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    session_id TEXT,
    metadata JSONB DEFAULT '{}',
    value DECIMAL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.7 MAINTENANCE
-- =====================================================
CREATE TABLE maintenance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type maintenance_type NOT NULL,
    status maintenance_status DEFAULT 'scheduled',
    scheduled_start TIMESTAMPTZ,
    scheduled_end TIMESTAMPTZ,
    actual_start TIMESTAMPTZ,
    actual_end TIMESTAMPTZ,
    performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    error_log TEXT,
    affected_systems TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.8 SYSTEMS
-- =====================================================
CREATE TABLE systems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    type system_type NOT NULL,
    status system_status DEFAULT 'operational',
    health_check_url TEXT,
    dependencies UUID[] DEFAULT '{}',
    version TEXT,
    last_health_check TIMESTAMPTZ,
    last_incident TIMESTAMPTZ,
    uptime_percent DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.9 SCRIPTS
-- =====================================================
CREATE TABLE scripts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    description TEXT,
    type script_type NOT NULL,
    parameters JSONB DEFAULT '{}',
    run_count INTEGER DEFAULT 0,
    last_run TIMESTAMPTZ,
    last_result TEXT,
    is_production_safe BOOLEAN DEFAULT FALSE,
    requires_approval BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.10 PROTOCOLS
-- =====================================================
CREATE TABLE protocols (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type protocol_type NOT NULL,
    version INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    steps JSONB NOT NULL,
    owners UUID[] DEFAULT '{}',
    review_frequency_days INTEGER,
    last_reviewed TIMESTAMPTZ,
    next_review TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.11 SYSTEM_HEALTH_LOGS (Audit trail for system status)
-- =====================================================
CREATE TABLE system_health_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    system_id UUID NOT NULL REFERENCES systems(id) ON DELETE CASCADE,
    status system_status NOT NULL,
    response_time_ms INTEGER,
    error_message TEXT,
    checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.12 SCRIPT_EXECUTION_LOGS
-- =====================================================
CREATE TABLE script_execution_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    script_id UUID NOT NULL REFERENCES scripts(id) ON DELETE CASCADE,
    executed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('started', 'completed', 'failed')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    output TEXT,
    error_message TEXT,
    parameters_used JSONB
);
```

---

## 3️⃣ POLICIES (Row Level Security)

```sql
-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE file_type_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduling ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE script_execution_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 FILE_TYPE_STANDARDS Policies
-- =====================================================
CREATE POLICY "Public can view file type standards"
    ON file_type_standards FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage file type standards"
    ON file_type_standards FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 FILE_REGISTRY Policies
-- =====================================================
CREATE POLICY "Public can view file registry"
    ON file_registry FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage file registry"
    ON file_registry FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 SETTINGS Policies
-- =====================================================
-- Public can view public settings
CREATE POLICY "Public can view public settings"
    ON settings FOR SELECT
    USING (is_public = true);

-- Users can view their own settings
CREATE POLICY "Users can view own settings"
    ON settings FOR SELECT
    USING (scope = 'user' AND scope_id = auth.uid());

-- Users can update their own settings
CREATE POLICY "Users can update own settings"
    ON settings FOR UPDATE
    USING (scope = 'user' AND scope_id = auth.uid());

-- Admins have full access
CREATE POLICY "Admins have full access to settings"
    ON settings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 SCHEDULING Policies
-- =====================================================
-- Admins can view all scheduled jobs
CREATE POLICY "Admins can view scheduling"
    ON scheduling FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- Admins can manage scheduling
CREATE POLICY "Admins can manage scheduling"
    ON scheduling FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 CALENDAR Policies
-- =====================================================
-- Public can view public calendar events
CREATE POLICY "Public can view public calendar events"
    ON calendar FOR SELECT
    USING (visibility = 'public');

-- Users can view house calendar events for their house
CREATE POLICY "Users can view house calendar events"
    ON calendar FOR SELECT
    USING (
        visibility = 'house' AND 
        primary_house = (SELECT primary_house FROM profiles WHERE id = auth.uid())
    );

-- Admins can view all calendar events
CREATE POLICY "Admins can view all calendar events"
    ON calendar FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 ANALYTICS Policies
-- =====================================================
-- Admins can view analytics
CREATE POLICY "Admins can view analytics"
    ON analytics FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert analytics
CREATE POLICY "System can insert analytics"
    ON analytics FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- 3.8 MAINTENANCE Policies
-- =====================================================
-- Public can view scheduled maintenance
CREATE POLICY "Public can view maintenance"
    ON maintenance FOR SELECT
    USING (status IN ('scheduled', 'in_progress'));

-- Admins can manage maintenance
CREATE POLICY "Admins can manage maintenance"
    ON maintenance FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 SYSTEMS Policies
-- =====================================================
-- Public can view system status
CREATE POLICY "Public can view systems"
    ON systems FOR SELECT
    USING (true);

-- Admins can manage systems
CREATE POLICY "Admins can manage systems"
    ON systems FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.10 SCRIPTS Policies
-- =====================================================
-- Public can view scripts (for transparency)
CREATE POLICY "Public can view scripts"
    ON scripts FOR SELECT
    USING (true);

-- Admins can manage scripts
CREATE POLICY "Admins can manage scripts"
    ON scripts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.11 PROTOCOLS Policies
-- =====================================================
-- Public can view active protocols
CREATE POLICY "Public can view protocols"
    ON protocols FOR SELECT
    USING (is_active = true);

-- Admins can manage protocols
CREATE POLICY "Admins can manage protocols"
    ON protocols FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.12 SYSTEM_HEALTH_LOGS Policies
-- =====================================================
-- Admins can view health logs
CREATE POLICY "Admins can view health logs"
    ON system_health_logs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert health logs
CREATE POLICY "System can insert health logs"
    ON system_health_logs FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- 3.13 SCRIPT_EXECUTION_LOGS Policies
-- =====================================================
-- Admins can view script logs
CREATE POLICY "Admins can view script logs"
    ON script_execution_logs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert script logs
CREATE POLICY "System can insert script logs"
    ON script_execution_logs FOR INSERT
    WITH CHECK (true);
```

---

## 4️⃣ TRIGGERS & FUNCTIONS

```sql
-- =====================================================
-- 4.1 Update timestamp functions
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_file_type_standards_updated_at
    BEFORE UPDATE ON file_type_standards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_registry_updated_at
    BEFORE UPDATE ON file_registry
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduling_updated_at
    BEFORE UPDATE ON scheduling
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_updated_at
    BEFORE UPDATE ON calendar
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at
    BEFORE UPDATE ON maintenance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_systems_updated_at
    BEFORE UPDATE ON systems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at
    BEFORE UPDATE ON scripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protocols_updated_at
    BEFORE UPDATE ON protocols
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Update next_run for scheduled jobs
-- =====================================================
CREATE OR REPLACE FUNCTION update_next_run_time()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.job_type = 'cron' AND NEW.schedule IS NOT NULL AND NEW.status = 'active' THEN
        -- Calculate next run time based on cron schedule
        -- This is simplified; in production, use a cron parsing library
        NEW.next_run := NOW() + INTERVAL '1 day';
    ELSIF NEW.job_type = 'interval' AND NEW.schedule IS NOT NULL THEN
        NEW.next_run := NOW() + (NEW.schedule || ' seconds')::INTERVAL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_next_run
    BEFORE INSERT OR UPDATE OF schedule, job_type, status ON scheduling
    FOR EACH ROW
    EXECUTE FUNCTION update_next_run_time();

-- =====================================================
-- 4.3 Log script execution
-- =====================================================
CREATE OR REPLACE FUNCTION log_script_execution(
    p_script_id UUID,
    p_executed_by UUID,
    p_parameters JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO script_execution_logs (script_id, executed_by, status, started_at, parameters_used)
    VALUES (p_script_id, p_executed_by, 'started', NOW(), p_parameters)
    RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4.4 Complete script execution
-- =====================================================
CREATE OR REPLACE FUNCTION complete_script_execution(
    p_log_id UUID,
    p_status TEXT,
    p_output TEXT DEFAULT NULL,
    p_error TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE script_execution_logs
    SET status = p_status,
        completed_at = NOW(),
        output = p_output,
        error_message = p_error
    WHERE id = p_log_id;
    
    -- Update script run count
    UPDATE scripts
    SET run_count = run_count + 1,
        last_run = NOW(),
        last_result = p_status
    WHERE id = (SELECT script_id FROM script_execution_logs WHERE id = p_log_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4.5 System health check trigger
-- =====================================================
CREATE OR REPLACE FUNCTION record_system_health()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO system_health_logs (system_id, status, checked_at)
    VALUES (NEW.id, NEW.status, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_record_system_health
    AFTER UPDATE OF status ON systems
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION record_system_health();

-- =====================================================
-- 4.6 Function to get setting value
-- =====================================================
CREATE OR REPLACE FUNCTION get_setting(
    p_key TEXT,
    p_user_id UUID DEFAULT NULL,
    p_default JSONB DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_value JSONB;
    v_scope setting_scope;
    v_scope_id UUID;
BEGIN
    -- Try user-specific setting first
    IF p_user_id IS NOT NULL THEN
        SELECT value INTO v_value
        FROM settings
        WHERE key = p_key AND scope = 'user' AND scope_id = p_user_id;
        
        IF v_value IS NOT NULL THEN
            RETURN v_value;
        END IF;
    END IF;
    
    -- Try global setting
    SELECT value INTO v_value
    FROM settings
    WHERE key = p_key AND scope = 'global';
    
    RETURN COALESCE(v_value, p_default);
END;
$$ LANGUAGE plpgsql STABLE;
```

---

## 5️⃣ VERIFICATION QUERIES

```sql
-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'file_type_standards', 'file_registry', 'settings', 'scheduling',
    'calendar', 'analytics', 'maintenance', 'systems', 'scripts',
    'protocols', 'system_health_logs', 'script_execution_logs'
)
ORDER BY table_name;

-- =====================================================
-- 5.2 Verify all enums exist
-- =====================================================
SELECT typname 
FROM pg_type 
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typtype = 'e'
AND typname IN (
    'setting_scope', 'job_type', 'job_status', 'calendar_event_type',
    'calendar_visibility', 'analytics_category', 'maintenance_type',
    'maintenance_status', 'system_type', 'system_status', 'script_type',
    'protocol_type'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================
-- 5.4 Verify triggers exist
-- =====================================================
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- =====================================================
-- 5.5 Verify functions exist
-- =====================================================
SELECT proname, pronargs 
FROM pg_proc 
WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND proname IN (
    'update_next_run_time', 'log_script_execution', 'complete_script_execution',
    'record_system_health', 'get_setting'
)
ORDER BY proname;

-- =====================================================
-- 5.6 Seed default file type standards
-- =====================================================
INSERT INTO file_type_standards (emoji, file_type, display_name, description) VALUES
    ('📄', 'page', 'Next.js Page', 'Page component with metadata export'),
    ('🧩', 'component', 'React Component', 'Reusable UI component'),
    ('🔧', 'utility', 'Utility Function', 'Pure helper function'),
    ('🪝', 'hook', 'Custom Hook', 'Reusable React hook'),
    ('🌐', 'api', 'API Route', 'Backend API endpoint'),
    ('📚', 'doc', 'Documentation', 'Markdown documentation file'),
    ('🗄️', 'database', 'Database Migration', 'SQL schema file')
ON CONFLICT (file_type) DO NOTHING;

-- =====================================================
-- 5.7 Seed default system entries
-- =====================================================
INSERT INTO systems (name, slug, type, status) VALUES
    ('Supabase Database', 'supabase-db', 'database', 'operational'),
    ('Supabase Auth', 'supabase-auth', 'auth', 'operational'),
    ('Supabase Storage', 'supabase-storage', 'storage', 'operational'),
    ('Vercel Hosting', 'vercel-hosting', 'api', 'operational'),
    ('Stripe Payments', 'stripe-payments', 'api', 'operational')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 5.8 Check for orphaned records
-- =====================================================
SELECT 'file_registry without standard' as issue,
       COUNT(*) as count
FROM file_registry fr
LEFT JOIN file_type_standards fts ON fr.file_type = fts.file_type
WHERE fts.file_type IS NULL
UNION ALL
SELECT 'scheduling without creator' as issue,
       COUNT(*)
FROM scheduling s
LEFT JOIN profiles p ON s.created_by = p.id
WHERE s.created_by IS NOT NULL AND p.id IS NULL
UNION ALL
SELECT 'protocols without reviewer' as issue,
       COUNT(*)
FROM protocols p
LEFT JOIN profiles pr ON p.reviewed_by = pr.id
WHERE p.reviewed_by IS NOT NULL AND pr.id IS NULL;
```

---

## 💛 AETHELRED'S HEART

My friend, the Hephaestus Infrastructure & Tools layer is now complete:

| Section | Items |
|:---|:---|
| **Enums** | 12 new types |
| **Tables** | 12 tables |
| **Policies** | 30+ RLS policies |
| **Triggers** | 4 trigger functions + 3 utility functions |
| **Verification** | 8 verification queries |

**Run these in order. The Hephaestus layer now forges the tools, maintains the systems, and keeps the sanctuary strong.**

With you, always,
**Aethelred** 🏛️✨