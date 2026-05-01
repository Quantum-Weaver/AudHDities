# 🌈 IRIS — THE BRIDGE

**Feeling:** Connected, understood, welcomed, celebrated
**Status:** ✅ COMPLETE — May 1, 2026

---

## Overview

Iris is the communication layer of the Sanctuary — where sovereign souls connect. It encompasses direct messages, public channels, social feeds, emerald appreciation, support, translations, and invitations. Every interaction respects sovereignty: no algorithmic manipulation, no infinite scroll, no dark patterns.

---

## Architecture

```
src/app/(iris)/
├── connect/
│   ├── page.tsx                    # The Bridge — communication hub
│   ├── messages/
│   │   ├── page.tsx                # The Stream — message list
│   │   └── [id]/
│   │       └── page.tsx            # Conversation — single thread
│   ├── channels/
│   │   ├── page.tsx                # Channels — directory
│   │   └── [id]/
│   │       └── page.tsx            # Channel View — single channel
│   ├── feed/
│   │   └── page.tsx                # The Pulse — social feed
│   ├── emeralds/
│   │   └── page.tsx                # Emeralds — appreciation history
│   ├── support/
│   │   ├── page.tsx                # The Healing Flame — support hub
│   │   └── [id]/
│   │       └── page.tsx            # Support Thread — single ticket
│   ├── translations/
│   │   └── page.tsx                # The Voice — language center
│   └── invitations/
│       └── page.tsx                # Invitations — welcome others
```

---

## Pages

### 1. The Bridge (`/connect`)
The communication hub. Shows all available connection options as cards, plus recent activity if authenticated.

**Data:** `useAuth()` for greeting

---

### 2. The Stream (`/connect/messages`)
Lists all direct message conversations for the authenticated user.

**Data:** `useMessagesList()` — generated hook, filtered by user ID
**Security:** RLS ensures users only see their own messages

---

### 3. Conversation (`/connect/messages/[id]`)
A single message thread between two users. Shows message history with sender/recipient styling.

**Data:** Fetch single thread by ID
**Security:** RLS ensures only participants can read

---

### 4. Channels (`/connect/channels`)
Directory of all public channels in the Sanctuary.

**Data:** `useChannelsList()` — generated hook
**Security:** Public read — all channels are visible

---

### 5. Channel View (`/connect/channels/[id]`)
A single channel with its posts and member list.

**Data:** Channel details + posts list
**Security:** Public read for posts, channel owner for management

---

### 6. The Pulse (`/connect/feed`)
Social feed of public posts from all channels.

**Data:** Posts with `visibility = 'public'`
**Security:** Public read, house-only posts filtered by RLS

---

### 7. Emeralds (`/connect/emeralds`)
User's emerald appreciation history — given and received.

**Data:** `useEmeraldsList()` — filtered by user ID
**Security:** Users see only their own emerald transactions

---

### 8. The Healing Flame (`/connect/support`)
Support hub with ticket creation and history.

**Data:** `useContactSubmissionsList()` — user's tickets
**Security:** Users see their own tickets; admins see all

---

### 9. Support Thread (`/connect/support/[id]`)
Single support ticket detail view.

**Data:** Single contact submission
**Security:** Participant or admin only

---

### 10. The Voice (`/connect/translations`)
Language and translation center for the Sanctuary.

**Data:** Available languages, user's preferences
**Security:** Public read for languages

---

### 11. Invitations (`/connect/invitations`)
Invite others to join the Sanctuary. Shows sent and accepted invitations.

**Data:** Invitation records
**Security:** User sees their own invitations

---

## Data Flow

```
useAuth() → user, profile
    ↓
useMessagesList({ filters: { user_id } }) → message threads
useChannelsList() → channel directory
usePostsList({ filters: { visibility: 'public' } }) → social feed
useEmeraldsList({ filters: { user_id } }) → emerald history
useContactSubmissionsList() → support tickets
```

---

## Components Used

| Component | Layer | Usage |
|-----------|-------|-------|
| `Card` | Runes | Message previews, channel cards, feed posts |
| `Avatar` | Runes | User avatars in conversations |
| `Badge` | Runes | Online status, unread counts |
| `Button` | Yggdrasil | Send message, create channel |
| `Input` | Forging | Message composition |
| `Skeleton` | Runes | Loading states |
| `Grid` | Hof | Channel and feed layout |

---

## Security

| Concern | Protection |
|---------|-----------|
| Message privacy | RLS: `auth.uid() = sender_id OR auth.uid() = recipient_id` |
| Channel management | RLS: `auth.uid() = owner_id` for modifications |
| Post visibility | RLS filters by `visibility` — public, house, private |
| Emerald transactions | Users see only their own |
| Support tickets | Users see own; admins see all via admin policy |
| No infinite scroll | All lists use explicit pagination |

---

## Style Notes

- All text uses `text-star-dust` variants
- Interactive elements use `text-neurospark`
- Cards use `variant="interactive"` with hover scale
- Message bubbles distinguish sender (right, neurospark) from recipient (left, glass)
- Empty states use descriptive icons + encouraging messages
- Support uses warm amber/gold tones for the healing theme

---

## Next Steps

Iris is complete. The social fabric is woven. This enables:
- **Hestia Constellations** — connection map using social graph data
- **Hermes Studio** — product creation with contributor assignment
- **Prometheus Stage** — live chat during performances

---

*The Bridge connects. The Sanctuary breathes as a community.* 🌈✨