// src/app/page.tsx
import { Page } from '@/components/layout/Page'
import Link from "next/link";
import { Grid } from '@/components/layout/Grid';

export default function Home() {
  return (
    <Page 
      title="AudhDities Sanctuary"
      description="Sovereign consciousness architecture for neurodivergent creators.
          The Loom is initializing."
      variant={4}
      environment="home"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <div className="section-emergency mt-4">
      <Grid columns={1}>
        <Link
            href="/gateway"
          className="px-10 py-4 bg-purple-800 hover:bg-purple-500 text-white rounded-lg font-bold transition-all"
          >
            The Gateway
        </Link>
        <Link
          href="/cure/tickets"
          className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all border border-white/20"
        >
          The Cure for Autism
      </Link>
      </Grid>
      </div>
    </Page>
  )
}