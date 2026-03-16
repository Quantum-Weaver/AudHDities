# 🧠 Neurodivergent UX Design Philosophy

**Last Updated: March 15, 2026**

## Our Core Belief

AUDHDITIES is built **by** neurodivergent minds, **for** neurodivergent minds. We don't design for the "average user"—we design for the beautiful spectrum of human cognition.

## Principles

### 1. Clarity Over Cleverness

| ❌ Avoid | ✅ Use Instead |
|:---|:---|
| Witty microcopy | Direct instructions |
| Hidden navigation | Visible menus |
| Surprising animations | Predictable interactions |
| Industry jargon | Plain language |

### 2. Choice, Not Overwhelm

- Provide **options**, not ultimatums
- Defaults should work for most users
- Advanced settings are tucked away but accessible
- "More options" links instead of endless forms

### 3. Pacing Control

- No auto-playing media
- No timed actions (unless clearly communicated)
- Save drafts automatically
- "Save and continue later" on multi-step processes

### 4. Sensory Respect

⚠️ Flashing animations: OFF by default
🔊 Sound notifications: OPT-IN
🎨 High contrast mode: AVAILABLE
🖱️ Reduced motion: RESPECTED
text


### 5. Executive Function Support

| Feature | Purpose |
|:---|:---|
| **Visual timers** | Time awareness without anxiety |
| **Progress saving** | Never lose work |
| **Clear next steps** | What to do now? |
| **Default suggestions** | Reduce decision fatigue |
| **Batch actions** | Do similar things together |

## Implementation Guide

### Colors

```css
/* High contrast mode overrides */
@media (prefers-contrast: more) {
  :root {
    --text-primary: #000000;
    --text-secondary: #1a1a1a;
    --border-regular: 2px solid currentColor;
  }
}

Motion
css

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

Focus
css

/* Always visible focus indicators */
*:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

Fonts

    Minimum text size: 16px

    Line height: at least 1.5

    Maximum line length: 70 characters

    Dyslexia-friendly font option (OpenDyslexic)

Form Design
Text Inputs

    Clear labels (not just placeholders)

    Helper text with examples

    Character count when relevant

    Auto-save while typing

Select/Dropdown

    Searchable when >5 options

    Grouped categories

    Default selected when appropriate

Buttons

    Descriptive text (not just "Submit")

    Confirmation before destructive actions

    Loading states with cancel option

Error Messages

    What happened (in plain language)

    Why it happened (if known)

    How to fix it (specific steps)

    No technical codes for users

Testing with Real Users

Before launching new features:

    Test with 3-5 neurodivergent users

    Watch them use it (no instructions)

    Ask: "What would you do next?"

    **Note where they pause or get confused"

    Fix and test again

Checklist for New Features

    Can users control the pace?

    Is there a way to save progress?

    Are there flashing or moving elements?

    Can users turn off auto-play?

    Is the language plain and direct?

    Are next steps obvious?

    Is there a "more info" option?

    Does it work with reduced motion?

    Is there sufficient color contrast?

    Can keyboard users navigate it?

Our Commitment

We will continue to learn and improve. This document evolves as we understand more about what our users need.

If you're neurodivergent and using AUDHDITIES, your feedback is not just welcome—it's essential.

Report issues, suggest improvements, and help us build a sanctuary that truly works for all minds.