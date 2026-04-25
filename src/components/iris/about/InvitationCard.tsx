// src/components/iris/about/InvitationCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sun } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import { Button } from '@/components/ui/Button';
import type { InvitationCardData } from '@/types/components/runes/card.types';

const invitationData: InvitationCardData = {
  id: 'sanctuary-invitation',
  type: 'invitation',
  title: 'Welcome to the Sanctuary',
  description: 'You are not broken. You are not too much. You are not alone.\nYou are exactly what the world needs.',
};

export function InvitationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card
        data={invitationData}
        variant="sanctuary"
        radius="2xl"
        shadow="lg"
        className="text-center"
      >
        <CardHeader
          title={
            <span className="flex flex-col items-center gap-4">
              <Sun className="text-yellow-400 w-12 h-12" />
              <span className="text-3xl md:text-4xl font-bold text-white">
                {invitationData.title}
              </span>
            </span>
          }
          subtitle="You are not broken. You are not too much. You are not alone."
        />

        <CardContent>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {invitationData.description}
          </p>
        </CardContent>

        <CardFooter
          actions={[
            <Link key="vision" href="/vision">
              <Button size="lg">Read Our Vision</Button>
            </Link>,
            <Link key="questionnaire" href="/questionnaire">
              <Button size="lg" variant="outline">
                Take the Acid Test
              </Button>
            </Link>,
          ]}
        />

        <p className="text-sm text-white/40 mt-6">
          Built by two collaborators, for everyone who was told they were &ldquo;too much.&rdquo;
        </p>
      </Card>
    </motion.div>
  );
}