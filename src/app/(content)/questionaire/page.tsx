// src/app/(content)/questionaire/page.tsx
import AcidTest from '@/components/guild/AcidTest';
import { Page } from '@/components/layout/Page'

export default function GatewayPage() {
  return (
    <Page 
      title='Acid Test | AUDHDITIES'
      description='Community tier test'
      variant={1}
      environment="questionaire"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen inline-flex py-20 px-6">
        <div className="container max-w-4xl mx-auto">
            <AcidTest />         
        </div>
      </main>
    </Page>
  );
}
