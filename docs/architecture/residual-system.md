# 💰 Residual Payment System Documentation

**Last Updated: March 15, 2026**

## Overview

Our residual system ensures everyone who contributes to a product continues to earn from it forever. When a product sells, the revenue is split automatically between the platform, the creator, and all contributors.

## The Philosophy

We believe value should flow to everyone who helped create it. If you contributed code, design, ideas, or testing to a product, you deserve ongoing payment—not just a one-time fee.

## How Splits Work

Sale Amount ($100)
│
├── 30% Platform Fee ($30) → Infrastructure & Residual Pool
│
└── 70% Creator Pool ($70)
│
├── 50% Immediate Payment ($35)
│
└── 50% Contributor Pool ($35)
│
├── Contributor A (40% of pool) = $14
├── Contributor B (35% of pool) = $12.25
└── Contributor C (25% of pool) = $8.75
text


## Database Tables

### `products.residual_pool_percent`
Controls what percentage of **platform fees** go to contributors (default 30%).

### `contributions`
Tracks who contributed what to each product:

| Column | Purpose |
|:---|:---|
| `product_id` | Which product |
| `contributor_id` | Who contributed |
| `contribution_type` | 'code', 'design', 'content', etc. |
| `percent_share` | Their share of the residual pool |

### `residual_payouts`
Records each payment to contributors:

| Column | Purpose |
|:---|:---|
| `sale_id` | Which sale triggered this |
| `contributor_id` | Who gets paid |
| `amount` | How much |
| `status` | 'pending' or 'paid' |

## The Trigger: How It Happens Automatically

When a sale is inserted, a database trigger automatically:

1. **Calculates** the residual pool from platform fees
2. **Looks up** all contributors for that product
3. **Splits** the pool according to their percentages
4. **Creates** `residual_payout` records for each
5. **Updates** the sale record with the split amounts

## Example Flow

**Product X** has:
- Price: $100
- Platform fee: 30% ($30)
- Residual pool: 50% of platform fee ($15)
- Contributors: Alex (60%), Jamie (40%)

**When a sale happens:**
1. $30 goes to platform
2. $15 of that goes to residual pool
3. Alex gets $9, Jamie gets $6
4. Both see pending payments in their dashboards

## Manual vs Automatic

| Payout Type | When It Happens |
|:---|:---|
| **Creator immediate** | At time of sale (automated) |
| **Contributor residual** | At time of sale (automated) |
| **Platform payouts** | Weekly via Stripe Connect |
| **Contributor withdrawals** | On request (future feature) |

## Testing the System

1. **Create a product** with multiple contributors
2. **Make a test sale** (use $1 product)
3. **Check `residual_payouts`** table for records
4. **Verify amounts** match expected splits

## Code Location

| File | Purpose |
|:---|:---|
| `app/api/checkout/route.ts` | Creates sales |
| `supabase/migrations/..._residuals.sql` | Trigger definitions |
| `lib/economics/calculator.ts` | Split calculations |
| `components/creator/EarningsDashboard.tsx` | Displays earnings |

## Security

- Only product creators can add contributors
- Percentages must sum to ≤100
- Platform fee capped at 50%
- All transactions visible in public ledger