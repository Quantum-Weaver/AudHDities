import { createServerSupabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import TicketProduct from '@/components/products/TicketProduct';

export default async function CureTicketsPage() {
  const supabase = await createServerSupabase();
  
  // Fetch the event product with contributions
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      contributions(
        *,
        profiles:contributor_id(display_name)
      )
    `)
    .eq('slug', 'the-cure-for-autism')
    .single();

  // If product doesn't exist yet, show placeholder
  if (!product) {
    return (
       <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex flex-col items-center">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">The Cure for Autism</h1>
          <p className="text-white/60">Product initializing in the Loom...</p>
          <p className="text-sm text-white/40 mt-4">Run the SQL seed to create this product</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <TicketProduct product={product} />
      </div>
    </main>
  );
}