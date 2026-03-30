## 📁 **UPDATED: Residual Payment System Documentation**

```markdown
# 💰 Residual Payment System Documentation

**Last Updated: March 29, 2026**

## Overview

Our residual system ensures that **everyone who contributes to a product continues to earn from it forever**. When a product sells, revenue is split between the creator, the platform, and contributors. Additionally, creators can choose to pledge a portion of their earnings to the Covenant Pool—a community dignity fund that supports all members.

## The Philosophy

We believe value should flow to everyone who helped create it. If you contributed code, design, ideas, or testing to a product, you deserve ongoing payment—not just a one-time fee.

We also believe that creators thrive when the community thrives. The Covenant Pool is a voluntary pledge that allows creators to support the sanctuary and its members.

---

## The Two Pools

| Pool | Source | Who Sets It | Where It Goes |
|------|--------|-------------|---------------|
| **Residual Pool** | Percentage of platform fee (0-50%) | Creator per product | Contributors who helped make that product |
| **Covenant Pool** | Percentage of creator earnings (0-50%) | Creator in profile settings | Community dignity fund (all active members) |

---

## How Splits Work

### Example: $100 Sale with Both Pools

```
Sale Amount ($100)
│
├── 10% Platform Fee ($10) → Operations
│
└── 90% Creator Earnings ($90)
│
├── 80% Immediate Payment ($72)  ← Creator keeps after Covenant
│
├── 20% Covenant Pool ($18)      ← Creator's voluntary pledge
│       │
│       └── Distributed equally to all active community members
│
└── (No contributors for this product, so Residual Pool not used)
```

### Example: $100 Sale with Contributors + Covenant

```
Sale Amount ($100)
│
├── 10% Platform Fee ($10) → Operations
│
└── 90% Creator Earnings ($90)
│
├── 70% Immediate Payment ($63)  ← Creator keeps after Covenant
│
├── 20% Covenant Pool ($18)      ← Creator's voluntary pledge
│       │
│       └── Distributed equally to all active community members
│
└── 10% Residual Pool ($9)       ← From platform fee (30% of $30 = $9)
        │
        ├── Contributor A (40% of pool) = $3.60
        ├── Contributor B (35% of pool) = $3.15
        └── Contributor C (25% of pool) = $2.25
```

---

## The Two Pools Explained

### 1. Residual Pool (Product-Level, Optional)

- **Source:** Percentage of platform fee (0-50%)
- **Controlled by:** Creator per product
- **Purpose:** Reward contributors who helped create this specific product
- **Distribution:** Split according to contribution percentages set by creator

**When to use:** If multiple people contributed to a product (designers, developers, testers, etc.), the creator can allocate a portion of the platform fee to pay them forever.

### 2. Covenant Pool (Profile-Level, Voluntary)

- **Source:** Percentage of creator earnings (0-50%)
- **Controlled by:** Creator in their profile settings
- **Purpose:** Support the sanctuary and its community members
- **Distribution:** Evenly among all active community members (dignity share)

**When to use:** Any creator can choose to pledge a portion of their earnings to support the community—regardless of whether they have contributors.

---

## Database Tables

### `profiles.residual_pledge_percent`
Controls what percentage of the creator's earnings goes to the Covenant Pool (default 0%, max 50%).

### `products.residual_pool_percent`
Controls what percentage of **platform fees** go to contributors (default 30%, max 50%).

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

---

## The Trigger: How It Happens Automatically

When a sale is inserted, a database trigger automatically:

1. **Calculates** platform fee (10%) and creator earnings (90%)
2. **Calculates** Covenant Pool from creator earnings (if pledge > 0)
3. **Calculates** Residual Pool from platform fee (if contributors exist)
4. **Looks up** all contributors for that product
5. **Splits** the residual pool according to their percentages
6. **Splits** the covenant pool equally among all active community members
7. **Creates** `residual_payout` records for each contributor
8. **Creates** `covenant_payout` records for community members
9. **Updates** the sale record with all split amounts

---

## Example Flows

### Scenario 1: No Contributors, No Covenant

**Product X** has:
- Price: $100
- Platform fee: 10% ($10)
- Creator earnings: 90% ($90)
- No contributors
- Creator covenant pledge: 0%

**When a sale happens:**
1. $10 → Platform operations
2. $90 → Creator

### Scenario 2: With Contributors, No Covenant

**Product X** has:
- Price: $100
- Platform fee: 10% ($10)
- Creator earnings: 90% ($90)
- Contributors: Alex (60%), Jamie (40%)
- Creator covenant pledge: 0%

**When a sale happens:**
1. $10 → Platform operations
2. $9 → Residual pool (30% of platform fee, split between contributors)
   - Alex: $5.40
   - Jamie: $3.60
3. $81 → Creator ($90 - $9 residual pool from platform fee?)

Wait—clarification: The residual pool comes from the **platform fee**, not the creator's earnings. So the creator still gets $90. The platform keeps $1 (after paying $9 to contributors).

Let me correct:

```
$100 Sale
├── $10 Platform Fee
│   ├── $7 Platform Operations (70% of fee)
│   └── $3 Residual Pool (30% of fee)
│       ├── $1.80 Alex (60%)
│       └── $1.20 Jamie (40%)
└── $90 Creator Earnings
```

### Scenario 3: With Contributors and Covenant

**Product X** has:
- Price: $100
- Platform fee: 10% ($10)
- Creator earnings: 90% ($90)
- Contributors: Alex (60%), Jamie (40%)
- Creator covenant pledge: 20% of earnings

**When a sale happens:**
1. $10 → Platform operations
2. $3 → Residual pool (30% of platform fee)
   - Alex: $1.80
   - Jamie: $1.20
3. $90 → Creator earnings
   - $72 → Creator immediate (80% after covenant)
   - $18 → Covenant Pool (20% of earnings)
     - Distributed equally to all active community members

---

## Visual Flowchart

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE RESIDUAL FLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘

                              💰 $100 SALE
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
            ┌───────────────┐               ┌───────────────┐
            │ 10% PLATFORM  │               │ 90% CREATOR   │
            │     FEE       │               │   EARNINGS    │
            │     ($10)     │               │    ($90)      │
            └───────┬───────┘               └───────┬───────┘
                    │                               │
        ┌───────────┴───────────┐       ┌───────────┴───────────┐
        │                       │       │                       │
        ▼                       ▼       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│  OPERATIONS   │       │ RESIDUAL POOL │       │   COVENANT    │
│    ($7)       │       │    (0-50%     │       │    POOL       │
│               │       │   of fee)     │       │ (0-50% of     │
│ Platform runs │       │    ($3)       │       │ earnings)     │
└───────────────┘       └───────┬───────┘       │    ($18)      │
                                │               └───────┬───────┘
                                │                       │
                                ▼                       ▼
                        ┌───────────────┐       ┌───────────────┐
                        │ CONTRIBUTORS  │       │   COMMUNITY   │
                        │  (split by    │       │   MEMBERS     │
                        │  percentage)  │       │  (equal split)│
                        │               │       │               │
                        │ Alex: $1.80   │       │ 500 members   │
                        │ Jamie: $1.20  │       │ each: $0.036  │
                        └───────────────┘       └───────────────┘
```

---

## Database Tables

### `profiles.residual_pledge_percent`
Controls what percentage of the creator's earnings goes to the Covenant Pool (default 0%, max 50%). This is a **profile setting**, not product-specific.

### `products.residual_pool_percent`
Controls what percentage of **platform fees** go to contributors (default 30%, max 50%). This is a **product setting**.

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

### `covenant_payouts` (New Table)
Records each payment to community members:

| Column | Purpose |
|:---|:---|
| `sale_id` | Which sale triggered this |
| `recipient_id` | Who gets paid |
| `amount` | How much |
| `status` | 'pending' or 'paid' |

---

## Creator Settings

In the creator's profile settings, they can set:

```
⚙️ Creator Settings
─────────────────────────────────────────────────────────
📊 Covenant Pledge

I pledge to donate [  20%  ] of my earnings to the Sanctuary Commons.

[✓] I understand that this is voluntary and can be changed at any time.
[ ] I want my pledge to be public (shows on my profile)

Current Covenant Pool size: $18 from your last sale
Total contributed to community: $342 lifetime
```

---

## Summary

| Pool | Source | Controlled By | Distribution |
|------|--------|---------------|--------------|
| **Residual Pool** | Platform fee (0-50%) | Creator per product | Contributors (by percentage) |
| **Covenant Pool** | Creator earnings (0-50%) | Creator profile | All active community members (equal) |

---

## Security & Transparency

- Only product creators can add contributors
- Contribution percentages must sum to ≤100
- Platform fee is fixed at 10% (transparent)
- Covenant pledge is visible on creator's profile (if public)
- All transactions visible in public ledger
```
