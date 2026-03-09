// components/profile-dashboard/components/ChannelEditor.tsx
import { Channel } from '../ProfileDashboard';

interface ChannelEditorProps {
  channel: Channel | null;
}

export default function ChannelEditor({ channel }: ChannelEditorProps) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <h4 className="text-white font-bold mb-4">Channel Settings</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/60">Handle</label>
          <div className="text-white font-mono">@{channel?.handle}</div>
        </div>
        <div>
          <label className="text-sm text-white/60">Subscription Price (Allies)</label>
          <div className="text-white">${channel?.subscription_price_ally}/month</div>
        </div>
      </div>
    </div>
  );
}