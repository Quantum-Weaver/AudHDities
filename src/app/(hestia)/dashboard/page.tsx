// app/dashboard/page.tsx
// Redirect to the new Vessel page

import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/vessel');
}