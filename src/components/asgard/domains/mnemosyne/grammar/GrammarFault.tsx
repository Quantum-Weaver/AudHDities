// src/components/asgard/domains/mnemosyne/grammar/GrammarFault.tsx

import { cn } from '@/lib/utils';
import type { GrammarFault } from '@/lib/grammar/grammar-contract';

/** What happened, why, the next step. */
export function GrammarFaultBlock({
  fault,
  className,
}: {
  fault: GrammarFault;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1 text-[13px]', className)}>
      <span className="text-star-dust/80">{fault.what}</span>
      <span className="text-star-dust/50">{fault.why}</span>
      <span className="text-star-dust/40">next · {fault.next}</span>
    </div>
  );
}
