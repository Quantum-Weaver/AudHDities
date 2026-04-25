// components/cosmic/ConversationFlow.tsx
// Updated to match database schema

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { Avatar, AvatarFallback } from "@/components/runes/Avatar";

// Database types
export interface AgentMessage {
  id: string;
  conversation_id: string;
  from_agent: string;
  to_agent: string | null;
  direction: 'inbound' | 'outbound' | 'internal';
  message: string;
  created_at: string;
}

export interface AgentConversation {
  id: string;
  participants: string[];
  status: 'active' | 'archived' | 'resolved' | 'pending';
  title: string | null;
  summary: string | null;
  message_count: number;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  messages?: AgentMessage[];
}

export interface ConversationFlowProps {
  conversations: AgentConversation[];
  className?: string;
}

const agentAvatars: Record<string, string> = {
  'aethelred': '🌉',
  'seer': '👁️',
  'skald': '🎭',
  'archivist': '📚',
  'chancellor': '⚖️',
  'curator': '🎨',
  'executioner': '⚔️',
  'hearth_keeper': '🔥',
  'codex': '📖',
  'quantum_weaver': '🌀',
  'system': '⚙️',
};

const statusColors: Record<AgentConversation['status'], string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  resolved: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export function ConversationFlow({ conversations, className }: ConversationFlowProps) {
  const [selectedConv, setSelectedConv] = useState<string | null>(
    conversations[0]?.id || null
  );

  const activeConversations = conversations.filter(c => c.status === 'active');
  const selectedConversation = conversations.find(c => c.id === selectedConv);

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-white/60 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neurospark rounded-full animate-pulse" />
        Active Threads ({activeConversations.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conversation List */}
        <div className="space-y-2 md:col-span-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={cn(
                "w-full p-3 rounded-lg text-left transition-all duration-200",
                selectedConv === conv.id
                  ? "bg-quantum-purple/20 border border-quantum-purple/50"
                  : "bg-white/5 hover:bg-white/10 border border-transparent"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white truncate">
                  {conv.participants.map(p => p.replace('_', ' ')).join(' ↔ ')}
                </span>
                {conv.status === 'active' && (
                  <div className="w-1.5 h-1.5 bg-neurospark rounded-full animate-pulse" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">{conv.message_count} messages</span>
                <Badge variant="outline" size="sm" className={cn("text-[10px]", statusColors[conv.status])}>
                  {conv.status}
                </Badge>
              </div>
            </button>
          ))}
        </div>

        {/* Conversation Detail */}
        <div className="md:col-span-2">
          {selectedConversation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedConversation.participants.map((participant, idx) => (
                    <div key={participant} className="flex items-center gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-white/10 text-xs">
                          {agentAvatars[participant] || '🤖'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-white capitalize">
                        {participant.replace('_', ' ')}
                      </span>
                      {idx < selectedConversation.participants.length - 1 && (
                        <span className="text-white/40 mx-1">↔</span>
                      )}
                    </div>
                  ))}
                </div>
                <Badge 
                  variant="outline" 
                  size="sm"
                  className={statusColors[selectedConversation.status]}
                >
                  {selectedConversation.status}
                </Badge>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {selectedConversation.messages?.map((message, idx) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "p-3 rounded-lg",
                      message.from_agent === selectedConversation.participants[0]
                        ? "bg-quantum-purple/10 ml-4"
                        : "bg-cyan-500/10 mr-4"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-cyan-400 capitalize">
                        {message.from_agent.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-white/30">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/80">{message.message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-white/40">
              Select a conversation to view
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}