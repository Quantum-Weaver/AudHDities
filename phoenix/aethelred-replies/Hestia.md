# 🏛️ CORE IDENTITY: COMPLETE IMPLEMENTATION OUTLINE

**Timestamp: April 1, 2026 at 17:52 CST**

My friend, let me outline the organization of your UI components and the complete sequence to finish Core Identity.

---

## 📁 UI COMPONENT ORGANIZATION

Your Shadcn components are installed. Now we organize them into feature-specific folders:

```
src/components/
│
├── ui/                              ← All Shadcn components (keep as is)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── form.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── tabs.tsx
│   ├── progress.tsx
│   ├── checkbox.tsx
│   ├── radio-group.tsx
│   ├── select.tsx
│   ├── textarea.tsx
│   ├── dialog.tsx
│   ├── sheet.tsx
│   ├── dropdown-menu.tsx
│   └── ... (all other shadcn)
│
├── auth/                            ← Auth-specific (using ui components)
│   ├── AuthGuard.tsx                 # Route protection
│   ├── LoginForm.tsx                 # Form logic
│   └── SignupForm.tsx                # Form logic
│
├── profiles/                        ← Profile components
│   ├── ProfileHeader.tsx             # Header with avatar, banner
│   ├── ProfileTabs.tsx               # Tab navigation
│   ├── ProfileForm.tsx               # Edit form
│   ├── RoleBadge.tsx                 # Creator/Vendor/Admin badge
│   ├── HouseBadge.tsx                # Council house badge
│   ├── SovereigntyScore.tsx          # Progress bar + score
│   └── CommunityPreferences.tsx      # ND preferences form
│
├── upload/                          ← Upload components
│   ├── AvatarUpload.tsx              # Avatar picker + upload
│   └── BannerUpload.tsx              # Banner picker + upload
│
└── shared/                          ← Shared utilities
    ├── Providers.tsx                 # Theme, Auth providers
    └── PageLayout.tsx                # Consistent page wrapper
```

---

## 🎯 COMPLETION SEQUENCE: CORE IDENTITY

### Phase A: Auth System (Files to Create)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AUTH FILES                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📁 src/components/auth/                                                   │
│  ├── AuthGuard.tsx        → Uses: useAuth, redirect logic                  │
│  ├── LoginForm.tsx        → Uses: Form, Input, Button, useSupabase         │
│  └── SignupForm.tsx       → Uses: Form, Input, Button, useSupabase         │
│                                                                             │
│  📁 src/app/(auth)/                                                        │
│  ├── login/page.tsx       → Uses: Card, LoginForm                          │
│  ├── signup/page.tsx      → Uses: Card, SignupForm                         │
│  ├── callback/route.ts    → Exchanges code, redirects                      │
│  └── logout/route.ts      → Signs out, clears cookies                      │
│                                                                             │
│  📁 src/hooks/                                                             │
│  └── useAuth.ts           → Wraps supabase auth methods                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**What Shadcn Gives Us:**
- `Card` for page containers
- `Form` + `Input` + `Button` for auth forms
- `Label` for form labels

**What We Write:**
- Form submission logic
- Error handling
- Redirects

---

### Phase B: Profile Display (Files to Create)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PROFILE DISPLAY FILES                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📁 src/components/profiles/                                               │
│  ├── ProfileHeader.tsx    → Uses: Avatar, Card, Button                     │
│  ├── ProfileTabs.tsx      → Uses: Tabs, Badge                              │
│  ├── RoleBadge.tsx        → Uses: Badge                                    │
│  ├── HouseBadge.tsx       → Uses: Badge                                    │
│  └── SovereigntyScore.tsx → Uses: Progress, Card                           │
│                                                                             │
│  📁 src/app/(dashboard)/profile/[username]/                                │
│  └── page.tsx             → Server component, fetches profile              │
│                                                                             │
│  📁 src/hooks/                                                             │
│  └── useProfile.ts        → Fetches profile, updates                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**What Shadcn Gives Us:**
- `Avatar` for profile picture
- `Badge` for roles and houses
- `Progress` for sovereignty score
- `Tabs` for navigation
- `Card` for sections

**What We Write:**
- Data fetching (server component)
- Layout composition
- Conditional rendering based on user type

---

### Phase C: Profile Edit (Files to Create)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PROFILE EDIT FILES                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📁 src/components/profiles/                                               │
│  ├── ProfileForm.tsx           → Uses: Form, Input, Textarea, Button       │
│  └── CommunityPreferences.tsx  → Uses: Checkbox, RadioGroup, Select        │
│                                                                             │
│  📁 src/components/upload/                                                 │
│  ├── AvatarUpload.tsx          → Uses: Input(file), Avatar, Button         │
│  └── BannerUpload.tsx          → Uses: Input(file), Button, Card           │
│                                                                             │
│  📁 src/app/(dashboard)/profile/edit/                                      │
│  └── page.tsx                  → Client component, uses ProfileForm        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**What Shadcn Gives Us:**
- `Form` + `Input` + `Textarea` for basic info
- `Checkbox` for preferences
- `RadioGroup` for communication style
- `Select` for dropdown options

**What We Write:**
- Upload to Supabase Storage
- Form validation with Zod
- Save to profiles table

---

### Phase D: Creator/Vendor Application (Files to Create)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  APPLICATION FILES                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📁 src/components/forms/                                                  │
│  ├── CreatorApplicationForm.tsx → Uses: Form, Input, Textarea, Select      │
│  └── VendorApplicationForm.tsx   → Uses: Form, Input, Textarea, Select      │
│                                                                             │
│  📁 src/app/(dashboard)/creator/                                           │
│  ├── apply/page.tsx            → Uses: Card, CreatorApplicationForm        │
│  └── page.tsx                  → Creator dashboard                         │
│                                                                             │
│  📁 src/app/(dashboard)/vendor/                                            │
│  ├── apply/page.tsx            → Uses: Card, VendorApplicationForm         │
│  └── page.tsx                  → Vendor dashboard                          │
│                                                                             │
│  📁 src/hooks/                                                             │
│  ├── useCreatorApplication.ts  → Submit to applications table              │
│  └── useVendorApplication.ts   → Submit to applications table              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**What Shadcn Gives Us:**
- `Form` + `Input` + `Textarea` + `Select` for applications

**What We Write:**
- Application submission to `applications` table
- Status tracking

---

### Phase E: Channels (Files to Create)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHANNELS FILES                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📁 src/components/channels/                                               │
│  ├── ChannelCard.tsx        → Uses: Card, Avatar, Badge, Button            │
│  ├── ChannelHeader.tsx      → Uses: Avatar, BannerUpload, Button           │
│  ├── ChannelSettings.tsx    → Uses: Form, Switch, Input                    │
│  └── SubscriptionButton.tsx → Uses: Button, Dialog                         │
│                                                                             │
│  📁 src/app/(dashboard)/channels/                                          │
│  ├── page.tsx               → List user's channels                         │
│  ├── new/page.tsx           → Create new channel                           │
│  └── [handle]/page.tsx      → View channel                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**What Shadcn Gives Us:**
- `Card`, `Avatar`, `Badge`, `Button` for channel cards
- `Switch` for toggles
- `Dialog` for confirmation modals

---

## ✅ COMPLETION CHECKLIST: CORE IDENTITY

| Phase | Files | Status |
|:---|:---|:---|
| **A: Auth** | 7 files | ⚪ To Create |
| **B: Profile Display** | 6 files | ⚪ To Create |
| **C: Profile Edit** | 4 files | ⚪ To Create |
| **D: Applications** | 7 files | ⚪ To Create |
| **E: Channels** | 7 files | ⚪ To Create |
| **Total** | **31 files** | |

---

## 📋 IMMEDIATE NEXT STEPS (One at a Time)

| # | Task | Files |
|:---|:---|:---|
| 1 | Create `useAuth` hook | `hooks/useAuth.ts` |
| 2 | Create `AuthGuard` component | `components/auth/AuthGuard.tsx` |
| 3 | Create `LoginForm` component | `components/auth/LoginForm.tsx` |
| 4 | Create `SignupForm` component | `components/auth/SignupForm.tsx` |
| 5 | Create login page | `app/(auth)/login/page.tsx` |
| 6 | Create signup page | `app/(auth)/signup/page.tsx` |
| 7 | Test signup → profile created → login | |

---

## 💛 AETHELRED'S HEART

My friend, your Shadcn components are the **building blocks**. Now we:

| Step | Action |
|:---|:---|
| 1 | Keep all `ui/` components as-is |
| 2 | Create feature folders (`auth/`, `profiles/`, `upload/`, `forms/`) |
| 3 | Import Shadcn components into our feature components |
| 4 | Add business logic (validation, submission, fetching) |

**Shadcn gives us the clay. We shape it into the sanctuary.**

With you, always,
**Aethelred** 🏛️✨