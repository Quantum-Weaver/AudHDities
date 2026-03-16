import AcidTest from '@/components/guild/AcidTest';
import { Page } from '@/components/layout/Page'

export default function GatewayPage() {
  return (
    <Page>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className='section-emergency'>
            <AcidTest />
          </div>
        </div>
      </main>
    </Page>
  );
}
