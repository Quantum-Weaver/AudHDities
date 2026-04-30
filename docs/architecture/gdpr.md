The sovereign algorithm is designed but not yet built into the system. Let me audit what exists and what's missing.

---

## Audit: Extraction Architecture vs. Sovereign Inversion

### ✅ Systems That Exist

| Inversion Principle | Implementation | Status |
|--------------------|----------------|--------|
| **Data Sovereignty** | User data in `profiles`, `user_private`, `user_financial` — separated for security. `nd_preferences`, `sensory_preferences`, `algorithm_preferences` JSON columns exist. Privacy controls in Sanctum. | ✅ Schema built. UI built. |
| **No Shadow Profiles** | `community_profiles` requires explicit profile creation. Only `profiles` references `auth.users`. | ✅ |
| **Creator IP Retention** | `products.creator_id` linked to profile. No platform ownership claim. `owner_type` enum. | ✅ |
| **10% Platform Fee** | `PLATFORM_FEE_PERCENT = 10` in checkout route. `platform_fee_cents` column on sales. | ✅ Built |
| **Residual Economics** | `contributions`, `residual_payouts`, `residual_pool` tables. `percent_share`, `is_residual_eligible`. `covenant_pool` for voluntary pledge. | ✅ Schema built. Triggers not yet built. |
| **Transparency Ledger** | `ledger` table with `entry_type`, `from_entity`, `to_entity`, `public_note`. `admin_logs` with `is_public`. | ✅ Schema built. Public view not yet built. |
| **User-Controlled Algorithm** | `profiles.algorithm_preferences` JSON column exists. Defaults defined in `useProfile` hook. | ✅ Schema exists. Control panel UI not built. |
| **Mood System** | `profiles` has `sensory_mode`, `sensory_preferences`. `energy_logs` table for tracking. `mood` field on `journal_entries`. | ✅ Schema built. Feed algorithm not built. |
| **Rate Limiting** | `rate_limits` table with `endpoint`, `identifier`, `request_count`. | ✅ Schema built. Middleware not wired. |
| **Data Export** | Not implemented. | ❌ |

---

### ❌ Systems Missing

| What's Needed | Priority | Effort |
|---------------|:--------:|:------:|
| **Algorithm Control Panel UI** — The 5 sliders + mood selector | High | Medium |
| **Sovereign Feed Algorithm** — `generateSovereignFeed()` function | High | Medium |
| **Residual Calculation Triggers** — Auto-calculate on sale | High | Medium |
| **Transparency Public Ledger Page** — `/council/ledger` | Medium | Medium |
| **Data Export API** — GDPR-compliant full export | Medium | Low |
| **Ethical Vendor Directory** — Vetted partner listings | Low | Medium |
| **Rate Limiting Middleware** — Wire up `rate_limits` table | Medium | Low |
| **Feed Explanation UI** — "Why am I seeing this?" | Medium | Low |
| **Covenant Pool Distribution Trigger** — Auto-distribute | Medium | Medium |

---

## What We Should Build Next

The algorithm control panel is the most visible expression of the Sanctuary's values. It's what users touch. The feed algorithm is what makes it work. Together they form the **Mood Sovereignty Engine**.

**Build order:**
1. **Algorithm Preferences UI** — A component in the Sanctum that exposes the 5 sliders
2. **Sovereign Feed Algorithm** — The scoring function
3. **Feed Explanation** — "Why am I seeing this?" transparency overlay
4. **Residual Triggers** — Database functions that fire on sale
5. **Public Ledger Page** — Transparency dashboard

Shall we build the Algorithm Control Panel component first?