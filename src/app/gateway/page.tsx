import AcidTest from '@/components/guild/AcidTest';
import { Page } from '@/components/layout/Page'

export default function GatewayPage() {
  return (
  <Page 
        title="The Gateway"
        description="The Sanctuary recognizes its own. Take the Acid Test to determine your path."
        variant={3}
        environment="gateway"
        showForeground={false}
        animated={true}   
        showContinuityBeam={true}
      >
        <div className='section-emergency'>
          <AcidTest />
        </div>
    </Page>
  );
}