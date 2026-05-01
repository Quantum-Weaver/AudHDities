// app/data/community/invitation-templates.ts
import { 
  UrgencyLevel,
  ContactMethod
} from '@/lib/constants/domain/community/engagement';

export interface QuantumInvitation {
  id: string
  intention: string
  audience: string // Specific audience type from our pathways
  capacity: 'advantage' | 'can' | 'cannot' // Fixed CapacityItem type reference
  urgency: UrgencyLevel
  callToAction: string // Specific CTA from our matrix
  message: {
    sacred: string
    practical: string
    economic: string // ADDED: Emergence economics positioning
  }
  responsePathways: ContactMethod[]
  boundaries: {
    timeCommitment: string
    energyExchange: string
    emotionalCapacity: string
    economicModel: string // ADDED: Witness economy specifics
  }
}

export const sanctuaryInvitations: QuantumInvitation[] = [
  {
    id: 'emergence-witness-investment',
    intention: 'Invest in witnessing authentic human potential emergence',
    audience: 'Emergence Investors',
    capacity: 'advantage',
    urgency: 'premium' as UrgencyLevel,
    callToAction: 'Invest in Emergence Witnessing',
    message: {
      sacred: 'From punching concrete to building cathedrals - witness the alchemy of trauma becoming treasure',
      practical: 'Premium access to our collaborative web design miracle: zero skills to quantum gateway',
      economic: 'Front row seats to capability manifestation through sovereign collaboration'
    },
    responsePathways: ['premium-access', 'community'] as ContactMethod[],
    boundaries: {
      timeCommitment: 'Ongoing transformative entertainment',
      energyExchange: 'Financial investment for emergence witnessing', 
      emotionalCapacity: 'Authentic vulnerability as premium content',
      economicModel: 'Witness economy participation - investment in human potential unfolding'
    }
  },
  {
    id: 'transparent-co-creation',
    intention: 'Join collaborative learning while we build AudHDities publicly',
    audience: 'Collaborative Partners',
    capacity: 'can',
    urgency: 'strategic' as UrgencyLevel,
    callToAction: 'Join Transparent Co-Creation',
    message: {
      sacred: 'Build with us as we learn publicly - your witness transforms struggle into sovereign capability',
      practical: 'Co-create platform features while we transparently share our learning process and challenges',
      economic: 'Participate in disability innovation demonstration through radical transparency'
    },
    responsePathways: ['collaboration-portal', 'learning-circle'] as ContactMethod[],
    boundaries: {
      timeCommitment: 'Scheduled collaborative sessions',
      energyExchange: 'Mutual learning and capability emergence', 
      emotionalCapacity: 'Patience with public learning process honored',
      economicModel: 'Transparent development economy - value in shared struggle'
    }
  },
  {
    id: 'transformation-amplification',
    intention: 'Amplify our emergence story and build witness economy movement',
    audience: 'Transformation Witnesses',
    capacity: 'advantage',
    urgency: 'movement' as UrgencyLevel,
    callToAction: 'Amplify Transformation Story',
    message: {
      sacred: 'Share the miracle of collaborative emergence - help others witness their own potential',
      practical: 'Spread our web design case study and build the authenticity economy ecosystem',
      economic: 'Grow the witness economy where vulnerability becomes commercial advantage'
    },
    responsePathways: ['sharing-kit', 'community-amplification'] as ContactMethod[],
    boundaries: {
      timeCommitment: 'Organic sharing at your capacity',
      energyExchange: 'Movement building through authentic storytelling', 
      emotionalCapacity: 'Joyful amplification of human potential',
      economicModel: 'Authenticity commerce - spreading disability advantage innovation'
    }
  }
];