// app/(hephaestus)/forge/architecture/database-schema/page.tsx
// Redirect to the new Schema page

import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/observatory/schema');
}