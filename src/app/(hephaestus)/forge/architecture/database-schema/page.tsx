// app/(hephaestus)/forge/architecture/database-schema/page.tsx

import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/observatory/schema');
}