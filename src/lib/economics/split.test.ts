// src/lib/economics/split.test.ts

import {
  computeSplit,
  computeSplitTotals,
  sumOfLines,
  ODD_CENT_RULE,
  type SplitLine,
} from './split';

let failures = 0;
let checks = 0;

function eq(label: string, actual: number, expected: number) {
  checks += 1;
  if (actual !== expected) {
    failures += 1;
    console.log(`  FAIL  ${label}: got ${actual}, expected ${expected}`);
  } else {
    console.log(`  ok    ${label}: ${actual}`);
  }
}

function ok(label: string, condition: boolean) {
  checks += 1;
  if (!condition) {
    failures += 1;
    console.log(`  FAIL  ${label}`);
  } else {
    console.log(`  ok    ${label}`);
  }
}

function sharesOf(lines: SplitLine[]): number[] {
  return lines.filter((l) => l.kind === 'contributor_share').map((l) => l.amountMinorUnits);
}

function amount(lines: SplitLine[], kind: string): number {
  return lines
    .filter((l) => l.kind === kind)
    .reduce((t, l) => t + l.amountMinorUnits, 0);
}

console.log(`THE SPLIT — odd-cent rule in force: ${ODD_CENT_RULE}`);

// ---------------------------------------------------------------- case 1
console.log('\n1 · the founder\'s example — $100, three contributors, pledge 50, covenant 50 each');
{
  const lines = computeSplit({
    grossMinorUnits: 10000,
    platformFeePercent: 10,
    residualPledgePercent: 50,
    contributorIds: ['a', 'b', 'c'],
    covenantPercentByVessel: { a: 50, b: 50, c: 50 },
  });
  eq('platform fee', amount(lines, 'platform_fee'), 1000);
  eq('fee → residual pool', amount(lines, 'fee_to_residual_pool'), 300);
  eq('fee → machine', amount(lines, 'fee_to_machine'), 700);
  eq('pledged to the pool', amount(lines, 'residual_pledge'), 4500);
  eq('shares, summed', amount(lines, 'contributor_share'), 4500);
  const s = sharesOf(lines);
  ok('three shares', s.length === 3);
  ok('each share $15.00 — nobody paid more than anybody beside them', s.every((x) => x === 1500));
  eq('covenant, summed', amount(lines, 'covenant_pledge'), 2250);
  eq('the leaves sum to the gross', sumOfLines(lines), 10000);
}

// ---------------------------------------------------------------- case 2
console.log('\n2 · the standing defaults — $100, pledge 0, covenant 0, one contributor');
{
  const lines = computeSplit({
    grossMinorUnits: 10000,
    platformFeePercent: 10,
    residualPledgePercent: 0,
    contributorIds: ['a'],
  });
  eq('fee → residual pool', amount(lines, 'fee_to_residual_pool'), 300);
  eq('fee → machine', amount(lines, 'fee_to_machine'), 700);
  ok('no pledge row is written', lines.every((l) => l.kind !== 'residual_pledge'));
  eq('the one contributor takes $90.00 whole', amount(lines, 'contributor_share'), 9000);
  ok('no covenant row', lines.every((l) => l.kind !== 'covenant_pledge'));
  eq('the leaves sum to the gross', sumOfLines(lines), 10000);
}

// ---------------------------------------------------------------- case 3
console.log('\n3 · the five rungs to the cent — pledge 50, one contributor (KP)');
{
  const rungs: Array<[string, number, number, number, number, number]> = [
    // name, gross, fee→pool, fee→machine, pledged, to the contributor
    ['Supporter', 1000, 30, 70, 450, 450],
    ['Guardian', 2500, 75, 175, 1125, 1125],
    ['Steward', 5000, 150, 350, 2250, 2250],
    ['Visionary', 10000, 300, 700, 4500, 4500],
    ['Sovereign', 25000, 750, 1750, 11250, 11250],
  ];
  for (const [name, gross, pool, machine, pledged, share] of rungs) {
    const lines = computeSplit({
      grossMinorUnits: gross,
      platformFeePercent: 10,
      residualPledgePercent: 50,
      contributorIds: ['kp'],
      covenantPercentByVessel: { kp: 50 },
    });
    console.log(`  — ${name} $${(gross / 100).toFixed(2)}`);
    eq(`    ${name} fee → pool`, amount(lines, 'fee_to_residual_pool'), pool);
    eq(`    ${name} fee → machine`, amount(lines, 'fee_to_machine'), machine);
    eq(`    ${name} pledged`, amount(lines, 'residual_pledge'), pledged);
    eq(`    ${name} to the contributor`, amount(lines, 'contributor_share'), share);
    eq(`    ${name} sums to the gross`, sumOfLines(lines), gross);
  }
  // The set's one half-cent: Guardian's covenant step, $11.25 -> $5.625.
  const guardian = computeSplit({
    grossMinorUnits: 2500,
    platformFeePercent: 10,
    residualPledgePercent: 50,
    contributorIds: ['kp'],
    covenantPercentByVessel: { kp: 50 },
  });
  eq('Guardian covenant floors to $5.62, the half cent staying with the vessel',
    amount(guardian, 'covenant_pledge'), 562);
}

// ---------------------------------------------------------------- case 4
console.log('\n4 · the invariant on the two real prices that land on no cent');
{
  for (const [name, gross] of [['Lantern $1.11', 111], ['Compass $3.33', 333]] as Array<[string, number]>) {
    const lines = computeSplit({
      grossMinorUnits: gross,
      platformFeePercent: 10,
      residualPledgePercent: 50,
      contributorIds: ['a', 'b'],
      covenantPercentByVessel: { a: 50, b: 50 },
    });
    const s = sharesOf(lines);
    console.log(`  — ${name}: fee→pool ${amount(lines, 'fee_to_residual_pool')}, ` +
      `fee→machine ${amount(lines, 'fee_to_machine')}, ` +
      `pledged ${amount(lines, 'residual_pledge')}, shares [${s.join(', ')}]`);
    eq(`    ${name} sums to the gross`, sumOfLines(lines), gross);
    ok(`    ${name} the machine never absorbs a leftover cent`,
      amount(lines, 'fee_to_machine') <= Math.floor((amount(lines, 'platform_fee') * 70) / 100));
    ok(`    ${name} the two shares differ by at most one cent`,
      Math.abs(s[0] - s[1]) <= 1);
  }
}

// ---------------------------------------------------------------- case 5
console.log('\n5 · the sum invariant across a sweep — every price 1..1000c, 1..5 contributors, every dial');
{
  let worst = '';
  let bad = 0;
  for (let gross = 1; gross <= 1000; gross += 1) {
    for (let n = 1; n <= 5; n += 1) {
      for (const dial of [0, 10, 20, 30, 40, 50]) {
        const ids = Array.from({ length: n }, (_, i) => `v${i}`);
        const lines = computeSplit({
          grossMinorUnits: gross,
          platformFeePercent: 10,
          residualPledgePercent: dial,
          contributorIds: ids,
        });
        if (sumOfLines(lines) !== gross) {
          bad += 1;
          if (!worst) worst = `${gross}c, ${n} contributors, dial ${dial} → ${sumOfLines(lines)}`;
        }
        const fee = amount(lines, 'platform_fee');
        if (amount(lines, 'fee_to_machine') > Math.floor((fee * 70) / 100)) {
          bad += 1;
          if (!worst) worst = `machine absorbed a cent at ${gross}c`;
        }
      }
    }
  }
  eq('cases where the sum did not equal the gross, or the machine gained a cent', bad, 0);
  if (worst) console.log(`  first offender: ${worst}`);
}

console.log(`\n${checks - failures}/${checks} assertions held.`);
if (failures > 0) {
  console.log(`${failures} FAILED.`);
  process.exit(1);
}
console.log('THE SPLIT HOLDS.');
