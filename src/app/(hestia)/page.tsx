// Example: app/(hestia)/page.tsx
import { Page } from '@/components/layout/Page';
import { resolveEnvironment } from '@/lib/constants/systems/environments';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function HomePage() {
  const session = await auth();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  // Build context from session and request
  const context = {
    userTier: session?.user?.user_tier,
    sovereigntyScore: session?.user?.sovereignty_score,
    timeOfDay: getTimeOfDay(),
    currentRoute: pathname,
    pageType: 'home',
  };
  
  // Resolve environment dynamically
  const environment = resolveEnvironment({
    context,
    route: pathname,
  });
  
  return (
    <Page 
      variant={environment.variant}
      environment={environment.key}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      {/* Page content */}
    </Page>
  );
}

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
}