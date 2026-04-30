// src/components/forge/AuthFlowHero.tsx
'use client';

import { motion } from 'framer-motion';
import { User, Mail, Link, LogIn, ArrowRight } from 'lucide-react';

const steps = [
  { icon: User, label: 'Sign Up', description: 'Enter email', color: 'cyan' },
  { icon: Mail, label: 'Send Magic Link', description: 'Supabase Auth', color: 'purple' },
  { icon: Link, label: 'Click Link', description: 'Verify email', color: 'pink' },
  { icon: LogIn, label: 'Logged In', description: 'Redirect to dashboard', color: 'green' },
];

export function FlowDiagram() {
  return (
    <div className="py-12">
      <div className="relative flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`w-24 h-24 rounded-full bg-${step.color}-500/20 border border-${step.color}-500/30 flex items-center justify-center mx-auto mb-3`}>
              <step.icon className={`text-${step.color}-400`} size={32} />
            </div>
            <div className="text-center">
              <div className="text-star-dust font-bold">{step.label}</div>
              <div className="text-star-dust/40 text-sm">{step.description}</div>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 -right-6">
                <ArrowRight className="text-star-dust/20" size={24} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}