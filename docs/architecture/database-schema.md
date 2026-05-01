# 🏛️ Database Schema Documentation

**Last Updated: March 15, 2026**

## Overview

Our database is built on Supabase (PostgreSQL) with Row Level Security (RLS) ensuring users can only access their own data. This document explains the core tables and their relationships.

## Core Tables

### 👤 `profiles`
Extends Supabase auth.users with application-specific user data.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key, references auth.users |
| `username` | TEXT | Unique public handle |
| `display_name` | TEXT | Name shown in UI |
| `avatar_url` | TEXT | Profile picture |
| `bio` | TEXT | User description |
| `is_creator` | BOOLEAN | Can they list products? |
| `is_vendor` | BOOLEAN | Can they sell? |
| `is_admin` | BOOLEAN | Full system access |
| `created_at` | TIMESTAMPTZ | Account creation |

**Relationships:**
- One profile can have many products (as creator)
- One profile can have many sales (as buyer)

### 📦 `products`
Digital and physical items for sale.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key |
| `creator_id` | UUID | References profiles.id |
| `title` | TEXT | Product name |
| `description` | TEXT | Product details |
| `price_community` | DECIMAL | Discounted price |
| `price_ally` | DECIMAL | Standard price |
| `price_corporate` | DECIMAL | Premium price |
| `residual_pool_percent` | INTEGER | % to contributors |
| `is_published` | BOOLEAN | Visible to public? |
| `created_at` | TIMESTAMPTZ | Listing date |

**Relationships:**
- Belongs to one creator (profiles)
- Can have many sales

### 💰 `sales`
Records every transaction.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key |
| `product_id` | UUID | References products.id |
| `buyer_id` | UUID | References profiles.id |
| `tier_applied` | user_tier | Which price tier used |
| `amount_cents` | INTEGER | Total in cents |
| `platform_fee_cents` | INTEGER | Our cut |
| `creator_earnings_cents` | INTEGER | Goes to creator |
| `payment_status` | TEXT | 'pending', 'completed' |
| `created_at` | TIMESTAMPTZ | Transaction time |

**Relationships:**
- Belongs to one product
- Belongs to one buyer

### 📊 `residual_payouts`
Ongoing payments to contributors.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key |
| `sale_id` | UUID | References sales.id |
| `contributor_id` | UUID | References profiles.id |
| `amount` | DECIMAL | Payment amount |
| `status` | TEXT | 'pending', 'paid' |
| `paid_at` | TIMESTAMPTZ | When sent |
| `created_at` | TIMESTAMPTZ | Record created |

**Relationships:**
- Belongs to one sale
- Belongs to one contributor

## Row Level Security (RLS)

### Profiles Table
- `SELECT`: Anyone can view public profiles
- `UPDATE`: Users can only update their own profile
- `INSERT`: Automatic on signup via trigger

### Products Table
- `SELECT`: Anyone can view published products
- `INSERT`: Only creators can add products
- `UPDATE`: Only product creators can edit

### Sales Table
- `SELECT`: Buyer and product creator only
- `INSERT`: Only via checkout process

## Triggers & Functions

### `handle_new_user()`
Automatically creates a profile row when a user signs up via Supabase Auth.

### `calculate_sale_splits()`
Before insert on sales, calculates platform fees and creator earnings.

## TypeScript Integration

Generated types live at `src/types/supabase/database.types.ts`. Import them in your code:

```typescript
import type { Database } from '@/types/supabase/database.types'
export type Product = Database['public']['Tables']['products']['Row']
# 🏛️ Database Schema Documentation

**Last Updated: March 15, 2026**

## Overview

Our database is built on Supabase (PostgreSQL) with Row Level Security (RLS) ensuring users can only access their own data. This document explains the core tables and their relationships.

## Core Tables

### 👤 `profiles`
Extends Supabase auth.users with application-specific user data.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key, references auth.users |
| `username` | TEXT | Unique public handle |
| `display_name` | TEXT | Name shown in UI |
| `avatar_url` | TEXT | Profile picture |
| `bio` | TEXT | User description |
| `is_creator` | BOOLEAN | Can they list products? |
| `is_vendor` | BOOLEAN | Can they sell? |
| `is_admin` | BOOLEAN | Full system access |
| `created_at` | TIMESTAMPTZ | Account creation |

**Relationships:**
- One profile can have many products (as creator)
- One profile can have many sales (as buyer)

### 📦 `products`
Digital and physical items for sale.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key |
| `creator_id` | UUID | References profiles.id |
| `title` | TEXT | Product name |
| `description` | TEXT | Product details |
| `price_community` | DECIMAL | Discounted price |
| `price_ally` | DECIMAL | Standard price |
| `price_corporate` | DECIMAL | Premium price |
| `residual_pool_percent` | INTEGER | % to contributors |
| `is_published` | BOOLEAN | Visible to public? |
| `created_at` | TIMESTAMPTZ | Listing date |

**Relationships:**
- Belongs to one creator (profiles)
- Can have many sales

### 💰 `sales`
Records every transaction.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key |
| `product_id` | UUID | References products.id |
| `buyer_id` | UUID | References profiles.id |
| `tier_applied` | user_tier | Which price tier used |
| `amount_cents` | INTEGER | Total in cents |
| `platform_fee_cents` | INTEGER | Our cut |
| `creator_earnings_cents` | INTEGER | Goes to creator |
| `payment_status` | TEXT | 'pending', 'completed' |
| `created_at` | TIMESTAMPTZ | Transaction time |

**Relationships:**
- Belongs to one product
- Belongs to one buyer

### 📊 `residual_payouts`
Ongoing payments to contributors.

| Column | Type | Description |
|:---|:---|:---|
| `id` | UUID | Primary key |
| `sale_id` | UUID | References sales.id |
| `contributor_id` | UUID | References profiles.id |
| `amount` | DECIMAL | Payment amount |
| `status` | TEXT | 'pending', 'paid' |
| `paid_at` | TIMESTAMPTZ | When sent |
| `created_at` | TIMESTAMPTZ | Record created |

**Relationships:**
- Belongs to one sale
- Belongs to one contributor

## Row Level Security (RLS)

### Profiles Table
- `SELECT`: Anyone can view public profiles
- `UPDATE`: Users can only update their own profile
- `INSERT`: Automatic on signup via trigger

### Products Table
- `SELECT`: Anyone can view published products
- `INSERT`: Only creators can add products
- `UPDATE`: Only product creators can edit

### Sales Table
- `SELECT`: Buyer and product creator only
- `INSERT`: Only via checkout process

## Triggers & Functions

### `handle_new_user()`
Automatically creates a profile row when a user signs up via Supabase Auth.

### `calculate_sale_splits()`
Before insert on sales, calculates platform fees and creator earnings.

## TypeScript Integration

Generated types live at `src/types/supabase/database.types.ts`. Import them in your code:

```typescript
import type { Database } from '@/types/supabase/database.types'
export type Product = Database['public']['Tables']['products']['Row']