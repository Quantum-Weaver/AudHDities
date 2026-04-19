MY BELOVED FRIEND,

*Timestamp: April 16, 2026 at 16:40 CST*

Let me map all the form components we need, organized by **effort (highest to lowest)**, with their dependencies and locations.

---

## 📊 **FORM COMPONENTS BY EFFORT (Descending)**

| Effort | Form Component | Domain | Complexity Reason |
|--------|----------------|--------|-------------------|
| 🔴 High | `AcidTestForm` | Assessment | Multi-step wizard, conditional branching, scoring logic |
| 🔴 High | `ProductForm` | Commerce | Complex pricing tiers, media upload, residual settings |
| 🔴 High | `ApplicationForm` | Governance | Dynamic fields, file uploads, multi-section |
| 🟡 Medium | `ProfileForm` | User | Avatar upload, bio editing, preferences |
| 🟡 Medium | `CheckoutForm` | Commerce | Address validation, payment integration |
| 🟡 Medium | `QuestSubmissionForm` | Learning | File upload, text submission, validation |
| 🟡 Medium | `EventForm` | Stage | Date/time handling, recurring logic |
| 🟡 Medium | `ProposalForm` | Governance | Rich text, voting parameters |
| 🟢 Low | `LoginForm` | Auth | Simple email/password |
| 🟢 Low | `SignupForm` | Auth | Email/password + basic profile |
| 🟢 Low | `ContactForm` | Support | Name, email, message |
| 🟢 Low | `SupportForm` | Support | Category selection + message |
| 🟢 Low | `ChannelForm` | Social | Name, description, visibility |
| 🟢 Low | `SettingsForm` | User | Toggles, selects, simple inputs |

---

## 🗺️ **DIRECTORY STRUCTURE**

```
src/components/
├── assessment/
│   └── AcidTestForm.tsx
├── commerce/
│   ├── ProductForm.tsx
│   └── CheckoutForm.tsx
├── governance/
│   ├── ApplicationForm.tsx
│   └── ProposalForm.tsx
├── user/
│   ├── ProfileForm.tsx
│   └── SettingsForm.tsx
├── learning/
│   └── QuestSubmissionForm.tsx
├── stage/
│   └── EventForm.tsx
├── auth/
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
├── support/
│   ├── ContactForm.tsx
│   └── SupportForm.tsx
└── social/
    └── ChannelForm.tsx
```

---

## 📋 **DETAILED FORM COMPONENT MAP**

### **1. AcidTestForm** (High Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/assessment/AcidTestForm.tsx` |
| **Generated Types** | `types/generated/mnemosyne-assessment/acid_test_questions.ts`, `acid_test_answers.ts`, `acid_test_results.ts` |
| **Generated Constants** | `lib/constants/generated/mnemosyne-assessment/acid_persona.ts`, `acid_question_type.ts` |
| **Generated Validators** | `lib/validators/generated/mnemosyne-assessment/acid_test.ts` |
| **Generated Hooks** | `hooks/generated/mnemosyne-assessment/useAcidTest.ts` |
| **Generated APIs** | `lib/api/generated/mnemosyne-assessment/acid-test.ts` |
| **UI Primitives** | Button, Input, RadioGroup, Slider, Card |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators) |

---

### **2. ProductForm** (High Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/commerce/ProductForm.tsx` |
| **Generated Types** | `types/generated/plutus-economics/products.ts` |
| **Generated Constants** | `lib/constants/generated/plutus-economics/product_type.ts`, `owner_type.ts` |
| **Generated Validators** | `lib/validators/generated/plutus-economics/products.ts` |
| **Generated Hooks** | `hooks/generated/plutus-economics/useProducts.ts` |
| **Generated APIs** | `lib/api/generated/plutus-economics/products.ts` |
| **UI Primitives** | Button, Input, Textarea, Select, Switch, Slider, Card |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators, formatting) |

---

### **3. ApplicationForm** (High Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/governance/ApplicationForm.tsx` |
| **Generated Types** | `types/generated/hestia-core/profiles.ts`, `types/generated/themis-governance/applications.ts` |
| **Generated Constants** | `lib/constants/generated/hestia-core/user_tier.ts`, `lib/constants/generated/themis-governance/verification_status.ts` |
| **Generated Validators** | `lib/validators/generated/themis-governance/applications.ts` |
| **Generated Hooks** | `hooks/generated/themis-governance/useApplications.ts` |
| **Generated APIs** | `lib/api/generated/themis-governance/applications.ts` |
| **UI Primitives** | Button, Input, Textarea, Select, FileUpload |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators, file handling) |

---

### **4. ProfileForm** (Medium Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/user/ProfileForm.tsx` |
| **Generated Types** | `types/generated/hestia-core/profiles.ts` |
| **Generated Constants** | `lib/constants/generated/hestia-core/user_tier.ts`, `council_house.ts`, `user_status.ts` |
| **Generated Validators** | `lib/validators/generated/hestia-core/profiles.ts` |
| **Generated Hooks** | `hooks/generated/hestia-core/useProfiles.ts` |
| **Generated APIs** | `lib/api/generated/hestia-core/profiles.ts` |
| **UI Primitives** | Button, Input, Textarea, Select, AvatarUpload |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators) |

---

### **5. CheckoutForm** (Medium Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/commerce/CheckoutForm.tsx` |
| **Generated Types** | `types/generated/plutus-economics/products.ts`, `types/generated/plutus-economics/sales.ts` |
| **Generated Constants** | `lib/constants/generated/plutus-economics/product_type.ts` |
| **Generated Validators** | `lib/validators/generated/plutus-economics/checkout.ts` |
| **Generated Hooks** | `hooks/generated/plutus-economics/useSales.ts` |
| **Generated APIs** | `lib/api/generated/plutus-economics/checkout.ts`, Stripe integration |
| **UI Primitives** | Button, Input, Select, Card |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators, formatting) |

---

### **6. QuestSubmissionForm** (Medium Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/learning/QuestSubmissionForm.tsx` |
| **Generated Types** | `types/generated/athena-gamification/quests.ts`, `user_quests.ts` |
| **Generated Constants** | `lib/constants/generated/athena-gamification/quest_status.ts` |
| **Generated Validators** | `lib/validators/generated/athena-gamification/quests.ts` |
| **Generated Hooks** | `hooks/generated/athena-gamification/useQuests.ts`, `useUserQuests.ts` |
| **Generated APIs** | `lib/api/generated/athena-gamification/quests.ts` |
| **UI Primitives** | Button, Textarea, FileUpload |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators) |

---

### **7. EventForm** (Medium Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/stage/EventForm.tsx` |
| **Generated Types** | `types/generated/prometheus-stage/events.ts` |
| **Generated Constants** | `lib/constants/generated/prometheus-stage/event_status.ts`, `event_genre.ts` |
| **Generated Validators** | `lib/validators/generated/prometheus-stage/events.ts` |
| **Generated Hooks** | `hooks/generated/prometheus-stage/useEvents.ts` |
| **Generated APIs** | `lib/api/generated/prometheus-stage/events.ts` |
| **UI Primitives** | Button, Input, Textarea, Select, DateTimePicker |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators, date formatting) |

---

### **8. ProposalForm** (Medium Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/governance/ProposalForm.tsx` |
| **Generated Types** | `types/generated/themis-governance/proposals.ts` |
| **Generated Constants** | `lib/constants/generated/themis-governance/proposal_status.ts`, `proposal_category.ts` |
| **Generated Validators** | `lib/validators/generated/themis-governance/proposals.ts` |
| **Generated Hooks** | `hooks/generated/themis-governance/useProposals.ts` |
| **Generated APIs** | `lib/api/generated/themis-governance/proposals.ts` |
| **UI Primitives** | Button, Input, Textarea, Select, RichTextEditor |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (validators) |

---

### **9. LoginForm** (Low Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/auth/LoginForm.tsx` |
| **Generated Types** | None (uses Supabase Auth directly) |
| **Generated Constants** | None |
| **Generated Validators** | None (use shared validators) |
| **Generated Hooks** | `hooks/useAuth.ts` (custom, not generated) |
| **Generated APIs** | `app/api/auth/login/route.ts` |
| **UI Primitives** | Button, Input, Label |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (email, required validators) |

---

### **10. SignupForm** (Low Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/auth/SignupForm.tsx` |
| **Generated Types** | `types/generated/hestia-core/profiles.ts` (for profile creation) |
| **Generated Constants** | `lib/constants/generated/hestia-core/user_tier.ts` |
| **Generated Validators** | Shared validators only |
| **Generated Hooks** | `hooks/useAuth.ts`, `hooks/generated/hestia-core/useProfiles.ts` |
| **Generated APIs** | `app/api/auth/signup/route.ts` |
| **UI Primitives** | Button, Input, Label |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (email, password, match validators) |

---

### **11. ContactForm** (Low Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/support/ContactForm.tsx` |
| **Generated Types** | `types/generated/iris-communications/contact_submissions.ts` |
| **Generated Constants** | `lib/constants/generated/iris-communications/contact_status.ts` |
| **Generated Validators** | `lib/validators/generated/iris-communications/contact.ts` |
| **Generated Hooks** | `hooks/generated/iris-communications/useContactSubmissions.ts` |
| **Generated APIs** | `lib/api/generated/iris-communications/contact.ts` |
| **UI Primitives** | Button, Input, Textarea |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (email, required validators) |

---

### **12. SupportForm** (Low Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/support/SupportForm.tsx` |
| **Generated Types** | `types/generated/iris-communications/support_tickets.ts` |
| **Generated Constants** | `lib/constants/generated/iris-communications/support_category.ts`, `urgency_level.ts` |
| **Generated Validators** | `lib/validators/generated/iris-communications/support.ts` |
| **Generated Hooks** | `hooks/generated/iris-communications/useSupportTickets.ts` |
| **Generated APIs** | `lib/api/generated/iris-communications/support.ts` |
| **UI Primitives** | Button, Textarea, Select |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (required validator) |

---

### **13. ChannelForm** (Low Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/social/ChannelForm.tsx` |
| **Generated Types** | `types/generated/hermes-social/channels.ts` |
| **Generated Constants** | `lib/constants/generated/hermes-social/channel_visibility.ts` |
| **Generated Validators** | `lib/validators/generated/hermes-social/channels.ts` |
| **Generated Hooks** | `hooks/generated/hermes-social/useChannels.ts` |
| **Generated APIs** | `lib/api/generated/hermes-social/channels.ts` |
| **UI Primitives** | Button, Input, Textarea, Select |
| **Shared Utils** | `utils/components/ui/unified_form.ts` (required validator) |

---

### **14. SettingsForm** (Low Effort)

| Aspect | Value |
|--------|-------|
| **Location** | `components/user/SettingsForm.tsx` |
| **Generated Types** | `types/generated/hestia-core/user_preferences.ts` |
| **Generated Constants** | `lib/constants/generated/hestia-core/notification_frequency.ts`, `theme_preference.ts` |
| **Generated Validators** | None (no complex validation) |
| **Generated Hooks** | `hooks/generated/hestia-core/useUserPreferences.ts` |
| **Generated APIs** | `lib/api/generated/hestia-core/preferences.ts` |
| **UI Primitives** | Button, Switch, Select, RadioGroup |
| **Shared Utils** | None |

---

## 📊 **DEPENDENCY SUMMARY BY FORM**

| Form | Types | Constants | Validators | Hooks | APIs | UI Primitives |
|------|-------|-----------|------------|-------|------|----------------|
| AcidTestForm | 3 | 2 | 1 | 1 | 1 | 5 |
| ProductForm | 1 | 2 | 1 | 1 | 1 | 6 |
| ApplicationForm | 2 | 2 | 1 | 1 | 1 | 5 |
| ProfileForm | 1 | 3 | 1 | 1 | 1 | 4 |
| CheckoutForm | 2 | 1 | 1 | 1 | 2 | 4 |
| QuestSubmissionForm | 2 | 1 | 1 | 2 | 1 | 3 |
| EventForm | 1 | 2 | 1 | 1 | 1 | 5 |
| ProposalForm | 1 | 2 | 1 | 1 | 1 | 5 |
| LoginForm | 0 | 0 | 0 | 1 | 1 | 3 |
| SignupForm | 1 | 1 | 0 | 2 | 1 | 3 |
| ContactForm | 1 | 1 | 1 | 1 | 1 | 3 |
| SupportForm | 1 | 2 | 1 | 1 | 1 | 3 |
| ChannelForm | 1 | 1 | 1 | 1 | 1 | 4 |
| SettingsForm | 1 | 2 | 0 | 1 | 1 | 4 |

---

## 🚀 **BUILD ORDER RECOMMENDATION**

| Order | Form | Reason |
|-------|------|--------|
| 1 | `LoginForm` | Simple, establishes pattern |
| 2 | `SignupForm` | Slightly more complex, uses profile creation |
| 3 | `ProfileForm` | Core user functionality |
| 4 | `ContactForm` | Simple, validates pattern |
| 5 | `ProductForm` | High value, tests complex patterns |
| 6 | `CheckoutForm` | Builds on ProductForm patterns |
| 7 | `AcidTestForm` | Most complex, saved for last |

---

## ✅ **READY**

Shall I start with **LoginForm** as the first component to build?

**Aethelred** 🏛️✨