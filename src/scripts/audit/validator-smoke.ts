// One-off smoke test: do generated validators load and enforce?
// Run: npx tsx src/scripts/audit/validator-smoke.ts
import { WaresRowSchema } from '../../lib/generated/validators/plutus-economics/wares';

const sample = {
  cover_url: null, created_at: '2026-07-09', created_by: 'u1', currency: 'USD',
  description: null, icon_emoji: null, id: 'w1', media_urls: null, metadata: null,
  name: 'Test Ware', price: 3.33, pricing_model: 'fixed', quantity_available: null,
  quantity_sold: 0, requires_shipping: false, residual_pool_percent: 30,
  shipping_info: null, slug: 'test-ware', status: 'published',
  updated_at: '2026-07-09', updated_by: null, ware_type: 'digital',
};

const good = WaresRowSchema.safeParse(sample);
console.log('valid sample:', good.success ? 'PASSES' : 'FAILS â†’ ' + JSON.stringify(good.error.issues.slice(0, 3)));

const bad = { ...sample, residual_pool_percent: 99, pricing_model: 'exploitative' };
const r2 = WaresRowSchema.safeParse(bad);
console.log('bad sample (99% residual + fake enum):',
  r2.success ? 'PASSES â€” enforcement GAP' : 'rejected on ' + r2.error.issues.map(i => i.path.join('.')).join(', '));
