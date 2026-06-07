# Bee-Aura AI — UI Design System Specification

## Design Philosophy
**Dark Premium. Functional. On Brand.**

The Bee-Aura design system is **product-first**: form follows function. The dark premium aesthetic reinforces trust and focus. Every color, spacing, and type choice serves the lead recovery workflow.

---

## Color System

### Primary Palette (Dark Mode)

#### Neutrals
| Token | Hex | Usage | Contrast |
|-------|-----|-------|----------|
| `neutral-black` | `#000000` | Page background, deep contrast | AA |
| `neutral-950` | `#0f0f0f` | Card backgrounds, elevated surfaces | AAA |
| `neutral-900` | `#1a1a1a` | Panel backgrounds | AAA |
| `neutral-800` | `#2a2a2a` | Borders, dividers | AA |
| `neutral-700` | `#404040` | Disabled text, tertiary elements | AA |
| `neutral-400` | `#a0a0a0` | Secondary text | AA |
| `neutral-200` | `#e5e5e5` | Primary text | AAA |
| `neutral-100` | `#f5f5f5` | High contrast text, headings | AAA |
| `neutral-white` | `#ffffff` | Accent highlights (rare) | AAA |

#### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success-dark` | `#10b981` | Positive actions, completed states |
| `success-light` | `#d1fae5` | Success backgrounds, light indicators |
| `warning-dark` | `#f59e0b` | Cautions, pending actions |
| `warning-light` | `#fef3c7` | Warning backgrounds |
| `error-dark` | `#ef4444` | Critical, destructive, overdue |
| `error-light` | `#fee2e2` | Error backgrounds |
| `info-dark` | `#3b82f6` | Information, due soon |
| `info-light` | `#dbeafe` | Info backgrounds |
| `secondary-dark` | `#8b5cf6` | Brand accent, highlights (optional) |
| `secondary-light` | `#ede9fe` | Brand backgrounds |

### Color Application Rules

#### Text
- **Primary text**: `neutral-100` on `neutral-black`
- **Secondary text**: `neutral-400` on `neutral-black`
- **Disabled text**: `neutral-700` on any background
- **Link color**: `info-dark` (`#3b82f6`)
- **Link hover**: `secondary-dark` (`#8b5cf6`)

#### Backgrounds
- **Page**: `neutral-black`
- **Panels/Cards**: `neutral-950` (light on dark, not shadowed)
- **Elevated surfaces**: `neutral-900`
- **Hover states**: `neutral-800` tint
- **Selected states**: `secondary-dark` with opacity (20%)

#### Indicators
- **Success**: `success-dark` text on `success-light` background
- **Warning**: `warning-dark` text on `warning-light` background
- **Error**: `error-dark` text on `error-light` background
- **Info**: `info-dark` text on `info-light` background

#### Badges & Tags
- Status badges use semantic colors (green for active, yellow for pending, red for overdue)
- Badge background: light version of color
- Badge text: dark version of color

---

## Typography

### Type Scale
```
Heading 1: 32px / 40px line-height / font-weight 700 / letter-spacing -0.5px
Heading 2: 24px / 32px line-height / font-weight 700 / letter-spacing -0.25px
Heading 3: 20px / 28px line-height / font-weight 600 / letter-spacing 0px
Heading 4: 16px / 24px line-height / font-weight 600 / letter-spacing 0px

Body Large: 16px / 24px line-height / font-weight 400 / letter-spacing 0px
Body: 14px / 20px line-height / font-weight 400 / letter-spacing 0px
Body Small: 12px / 16px line-height / font-weight 400 / letter-spacing 0px
Body Tiny: 11px / 16px line-height / font-weight 400 / letter-spacing 0px

Mono: 13px / 20px line-height / font-weight 500 / font-family 'Courier New' or 'Menlo'
```

### Font Family
- **Default**: System stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Ubuntu'`
- **Mono**: `'Courier New', 'Menlo', 'Monaco', monospace`

### Weight Scale
- **700** = Bold (headings, emphasis)
- **600** = Semibold (subheadings, labels)
- **500** = Medium (mono, small emphasis)
- **400** = Regular (body text, default)

### Line Height
- **Headings**: 1.25x (tighter, commanding)
- **Body**: 1.5x (readable, comfortable)
- **Mono**: 1.5x (code readability)

---

## Spacing System

**4px base unit grid**

```
4px    = xs
8px    = sm
12px   = md
16px   = lg
24px   = xl
32px   = 2xl
48px   = 3xl
64px   = 4xl
```

### Application
- **Interior padding** (inside cards/panels): 12px–24px
- **Panel margins**: 16px–32px apart
- **Section spacing**: 32px–48px between major sections
- **Text spacing**: 8px between label + input
- **Button padding**: 8px (top/bottom) × 16px (left/right) = 8×16

---

## Component Rules

### Panels & Cards
- **Dark premium style**: Light text on dark `neutral-950` background
- **No shadows** — Use `neutral-800` border instead (`1px solid #2a2a2a`)
- **Minimum width**: 280px (no skinny cards)
- **Corner radius**: 6px–8px (subtle, not rounded)
- **Interior padding**: 16px–24px
- **Spacing between panels**: 16px–24px

### Buttons
| State | Background | Text | Border | Padding |
|-------|-----------|------|--------|---------|
| Default | `secondary-dark` | `neutral-100` | none | 8px 16px |
| Hover | `secondary-dark` + 10% lighter | `neutral-100` | none | 8px 16px |
| Active | `secondary-dark` + 20% lighter | `neutral-100` | none | 8px 16px |
| Disabled | `neutral-700` | `neutral-700` | none | 8px 16px |
| Ghost | transparent | `secondary-dark` | 1px `secondary-dark` | 8px 16px |
| Ghost Hover | `secondary-dark` (20% opacity) | `secondary-dark` | 1px `secondary-dark` | 8px 16px |

**Icon buttons**: Square (24px × 24px) or circular (32px × 32px)

### Input Fields
- **Background**: `neutral-900`
- **Border**: 1px solid `neutral-800`
- **Focus border**: 2px solid `info-dark`
- **Padding**: 8px 12px
- **Label**: `neutral-400`, small size (12px)
- **Placeholder text**: `neutral-600`

### Tables & Data Grids
- **Header background**: `neutral-900`
- **Header text**: `neutral-100`, semibold
- **Row background**: `neutral-950` (alternating: `neutral-900` for every other row)
- **Row hover**: `neutral-800` tint
- **Cell padding**: 12px
- **Row height**: 44px minimum
- **Column sorting**: Use arrow icon next to header text

### Lists & List Items
- **Background**: `neutral-950`
- **Text**: `neutral-100`
- **Hover**: `neutral-800` background
- **Selected**: `secondary-dark` (20% opacity)
- **Spacing**: 12px vertical between items
- **Padding**: 12px per item

### Badges
- **Size**: Small (11px text, 4px × 12px padding)
- **Active badge**: green (`success-dark` text on `success-light`)
- **Pending badge**: yellow (`warning-dark` text on `warning-light`)
- **Overdue badge**: red (`error-dark` text on `error-light`)
- **Info badge**: blue (`info-dark` text on `info-light`)
- **Corner radius**: 3px (sharp, not rounded)

### Charts & Data Visualizations
- **Color scheme**: Use semantic colors only
- **No gradients** (solid colors only)
- **No 3D effects**
- **Grid lines**: `neutral-800`, optional, subtle
- **Labels**: `neutral-200`, Body Small size
- **Data-driven only** (no decorative flourishes)

### Form Validation
- **Error state**: Red border (2px `error-dark`)
- **Error text**: `error-dark`, Body Small below input
- **Success state**: Green border (1px `success-dark`)
- **Warning state**: Yellow border (1px `warning-dark`)

---

## Layout Rules

### Desktop / Laptop (1280px–1440px)
- **Primary target**: Normal laptop screens (1280px–1440px wide)
- **Page width**: Full-width with comfortable margins (16px–32px per side)
- **Main content**: Max 1200px for readability
- **Sidebar**: Fixed left sidebar (200px–240px wide) for navigation
- **Panels**: Multi-column layout (2–4 columns depending on view)
- **Minimum card width**: 280px
- **Text line length**: 50–75 characters (optimal reading)
- **No single-column layouts** at normal laptop widths

### Responsive Breakpoints
- **Laptop**: 1280px–1440px+ (primary target)
- **Tablet**: 768px–1023px
- **Mobile**: 320px–767px (secondary target, not primary focus)

### Responsive Rules
- **No single-column layouts at 1440px**
- **Cards scale with container**, not fixed width
- **Text never wraps to one word per line** (consider truncation instead)
- **Sidebar collapses on tablet/mobile** (hamburger menu)
- **Modal dialogs center on screen** with 20px margin
- **Tables scroll horizontally** on small screens

### Navigation
- **Sidebar navigation**: Fixed left, always visible on desktop
- **Active state**: Highlight current route with `secondary-dark` background
- **Navigation spacing**: 8px padding per item, 4px vertical gap
- **Footer navigation**: Optional, secondary links only (settings, help)

---

## Component Behaviors

### Hover States
- **All interactive elements** (buttons, links, rows) show hover state
- **Hover indicator**: Lighten background by 10% or add `neutral-800` tint
- **Duration**: 200ms ease-in-out transition

### Focus States
- **Keyboard navigation**: All buttons, inputs, links must have visible focus
- **Focus indicator**: 2px solid `info-dark` outline (not removed)
- **Offset from element**: 2px

### Loading States
- **Skeleton loading**: `neutral-800` pulse animation (optional)
- **Spinner**: Rotating icon in `secondary-dark` color
- **Disabled state**: All controls disabled during load

### Empty States
- **Message**: "No data yet" or contextual message
- **Icon**: Optional, muted `neutral-600`
- **Call-to-action**: Secondary button to create/import data

### Feedback Messages (Toasts/Alerts)
- **Success**: Green badge style + `neutral-100` text on `neutral-950`
- **Warning**: Yellow badge style + `neutral-100` text on `neutral-950`
- **Error**: Red badge style + `neutral-100` text on `neutral-950`
- **Duration**: 3–5 seconds auto-dismiss (manual close also available)
- **Position**: Bottom-right, 16px from edges

---

## Spacing & Rhythm

### Vertical Spacing
- **Section headings**: 32px above, 16px below
- **Card groups**: 24px between cards
- **Form fields**: 12px between label + input, 16px between fields
- **Paragraphs**: 16px between text blocks
- **Lists**: 12px vertical spacing

### Horizontal Spacing
- **Page padding**: 16px–32px (larger on 1440px+)
- **Column gaps**: 16px–24px
- **Element spacing**: 8px–12px

### Breathing Room
Never pack elements tightly. 16px is the minimum comfortable spacing between interactive controls.

---

## Do's and Don'ts

### ✅ DO

- Use design tokens for colors, spacing, and reusable UI styles
- Apply padding consistently (12px or 16px interior)
- Use semantic colors for status indicators
- Keep text readable at 1280px–1440px (no font smaller than 11px)
- Stack panels vertically before wrapping horizontally
- Align elements to the 4px grid
- Use hover/focus states for all interactive elements
- Test at normal laptop viewport (1280px–1440px)
- Small SVG chart values are OK if they are data-driven and simple

### ❌ DON'T

- Use random hardcoded color values (use tokens)
- Create skinny cards (< 280px width)
- Use shadows (use borders instead)
- Wrap text to one word per line
- Use more than 3 semantic colors in one view
- Add decorative elements without purpose
- Disable hover/focus states
- Assume mobile is the primary layout
- Hardcode layout sizes or spacing values

---

## Accessibility

- **Color contrast**: Minimum WCAG AA (4.5:1 for text)
- **Focus indicators**: Always visible, cannot be removed
- **Font size**: Never smaller than 11px (body) or 13px (headings)
- **Interactive spacing**: Minimum 32px × 32px tap target
- **Alt text**: All icons and images have descriptive labels
- **Keyboard navigation**: All controls accessible via Tab
- **Error messages**: Clear, adjacent to problematic field

---

## Implementation Checklist

Before deploying a page:

- [ ] All colors are tokens (no hex values in CSS)
- [ ] Spacing is 4px-based
- [ ] Typography follows scale
- [ ] No hardcoded values
- [ ] Responsive at 1440px
- [ ] All interactive elements have hover/focus states
- [ ] Cards are minimum 280px wide
- [ ] Text readable (no wrapping issues)
- [ ] Semantic colors used correctly
- [ ] Sidebar navigation active state clear
- [ ] Forms have proper labels + validation
- [ ] Tables/lists have clear data hierarchy
- [ ] No duplicate navigation
- [ ] Build passes (`npm run build`)

---

## Next Steps

1. Export token file (CSS custom properties or Tailwind config)
2. Build component library (Button, Input, Card, Panel, Badge, etc.)
3. Implement shared layout (AppShell with Sidebar)
4. Apply design tokens to each page
5. Test responsive layout at 1440px
6. Verify accessibility
