---
name: Serene Academic Attendance
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f4'
  surface-container: '#f1edef'
  surface-container-high: '#ebe7e9'
  surface-container-highest: '#e5e1e3'
  on-surface: '#1c1b1d'
  on-surface-variant: '#4e444a'
  inverse-surface: '#313032'
  inverse-on-surface: '#f4f0f2'
  outline: '#80747a'
  outline-variant: '#d2c2ca'
  surface-tint: '#7c506f'
  primary: '#522c48'
  on-primary: '#ffffff'
  primary-container: '#6c4260'
  on-primary-container: '#e8b2d6'
  inverse-primary: '#edb6da'
  secondary: '#7d5070'
  on-secondary: '#ffffff'
  secondary-container: '#fdc4e9'
  on-secondary-container: '#7a4d6d'
  tertiary: '#602341'
  on-tertiary: '#ffffff'
  tertiary-container: '#7c3958'
  on-tertiary-container: '#ffa9cc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd7ef'
  primary-fixed-dim: '#edb6da'
  on-primary-fixed: '#310e29'
  on-primary-fixed-variant: '#623957'
  secondary-fixed: '#ffd7f0'
  secondary-fixed-dim: '#eeb6db'
  on-secondary-fixed: '#310d2a'
  on-secondary-fixed-variant: '#633958'
  tertiary-fixed: '#ffd8e6'
  tertiary-fixed-dim: '#ffb0d0'
  on-tertiary-fixed: '#3b0423'
  on-tertiary-fixed-variant: '#71314f'
  background: '#fcf8fa'
  on-background: '#1c1b1d'
  surface-variant: '#e5e1e3'
typography:
  display:
    fontFamily: Literata
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Literata
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  title-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Source Sans 3
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an empathetic, dignified, and tactilely gentle environment tailored for school administrative staff, teachers, and guardians navigating daily attendance workflows. Moving consciously away from clinical, rigid institutional software, the visual atmosphere balances professional educational rigor with an intimate, nurturing, and soft editorial sensibility. 

The aesthetic is anchored in warm minimalism combined with delicate tonal layering. High-pressure administrative tasks—such as logging tardiness, tracking consecutive absences, and validating medical excuses—are met with calming visual cadences, generous breathing room, organic contours, and a reassuring palette reminiscent of fine stationery and botanical pigments. Tactile warmth, subtle optical boundaries, and high legibility evoke quiet competence, trust, and care.

## Colors

The color palette shifts school management from an austere ledger to a thoughtful editorial dashboard. Deep berry tones provide structural authority, while nuanced mists of powder pink and pearl lavender soften administrative fatigue.

### Core Swatches
- **Primary (`#6C4260`)**: Elegant plum cranberry. Used for primary interactive triggers, active tab indicators, high-emphasis headers, and brand identifiers.
- **Secondary (`#B784A7`)**: Soft mauve. Applied to interactive secondary states, iconography, non-critical highlights, and subtle graphical strokes.
- **Tertiary (`#7A3857`)**: Deep subtle raspberry. Reserved for high-value accents, pinned states, and selected item focal points.
- **Neutral Surface Baseline (`#FAF6F8`)**: Ultra-soft rosy pearl cream canvas, replacing stark clinical whites with organic, papery warmth.

### Background and Surface Tiers
- **Base Canvas**: `#FAF6F8` (Warm pearl tint, non-reflective)
- **Elevated Canvas / Card Surface**: `#FFFFFF` (Crisp contrast against canvas)
- **Container / Muted Layer**: `#F5EEF2` (Soft heather neutral for input containers, toolbars, and inactive tags)
- **Border / Subtle Boundary**: `#E8DCDE` (Delicate warm rose-gray line)

### Semantic Attendance System (High Contrast & Harmonized)
Attendance indicators must maintain optimal WCAG AA/AAA legibility against both white backgrounds and designated tinted containers:
- **Presente (P)**: 
  - Text & Border: `#1E7B5C` (Soft sage forest green)
  - Container Background: `#D6F3E6`
- **Ausente (A)**: 
  - Text & Border: `#C0435B` (Dusty raspberry coral)
  - Container Background: `#FDE8EC`
- **Tardanza (T)**: 
  - Text & Border: `#A46316` / `#C27A23` (Honey peach amber)
  - Container Background: `#FDF0DE`
- **Excusa (E)**: 
  - Text & Border: `#3B528C` / `#4B629C` (Soft cornflower lilac)
  - Container Background: `#E7ECFB`

## Typography

The typographic hierarchy intentionally marries the literary authority of **Literata** with the utilitarian clarity and legibility of **Source Sans 3**.

- **Literata** brings humanistic charm, academic prestige, and warmth. Its delicate serifs and organic bracketings lend classroom titles, report overviews, and student names an intentional, personalized feel.
- **Source Sans 3** maintains neutral clarity in tables, dense rosters, numerical tallies, and status markers. With a tall x-height and open apertures, it resists visual fatigue during rapid marking sessions across tablet and desktop interfaces.

All text must adhere strictly to contrasting levels against the soft ivory canvas: high-emphasis copy takes `#362130` (charcoal plum), medium-emphasis body takes `#5A4553`, and disabled/placeholder copy resolves to `#9E8C97`.

## Layout & Spacing

The layout is constructed on an adaptable 12-column fluid grid system on desktop (reducing to 8 columns on tablet and 4 columns on mobile), engineered to support both wide tabular roll-calls and responsive single-column attendance streams.

- **Breakpoints**: Mobile (< 640px), Tablet (640px – 1024px), Desktop (> 1024px).
- **Rhythm**: Vertical and horizontal layout blocks utilize an 8px root grid (0.5rem base), allowing generous white space around dense student data.
- **Data Densities**: Student rosters transition from a multi-column spreadsheet layout on desktop to cohesive, touch-friendly individual student cards on mobile, ensuring attendance toggles remain easy to target without mis-taps.

## Elevation & Depth

Depth in this system avoids harsh, dark drop-shadows. Instead, elevation is formed through **tonal stacking** complemented by **tinted ambient luminescence** and gossamer-thin structural lines.

1. **Level 0 (Base Canvas)**: Background `#FAF6F8`. Ground level for overall application views.
2. **Level 1 (Card & Module Layer)**: Pure white `#FFFFFF` surface bordered by a subtle 1px stroke of `#F0E5EB`. Shadow is rendered as an ambient, diffused glow: `0px 4px 20px -2px rgba(108, 66, 96, 0.04)`.
3. **Level 2 (Floating Bars, Popovers & Context Menus)**: Pure white `#FFFFFF` surrounded by `0px 10px 30px -4px rgba(108, 66, 96, 0.08)`, framed by a 1px border of `#EADFEA`.
4. **Level 3 (Modals & Sheet Dialogs)**: Pure white `#FFFFFF` layered over a gentle plum mist backdrop blur (`rgba(94, 53, 81, 0.25)` with `backdrop-filter: blur(6px)`), elevated by `0px 20px 40px -8px rgba(108, 66, 96, 0.12)`.

## Shapes

The design incorporates a soft, welcoming geometry with continuous curveness (rounded level 2):
- Standard cards, interactive tiles, and modal bodies use **1rem (16px)** corner radiuses, softening the perimeter of dense statistical reports.
- Small buttons, attendance switch segments, and text input boxes use **0.5rem (8px)** radiuses.
- Status badges, profile avatars, and single-letter attendance indicators (P, A, T, E) transition to fully pill-shaped or circular geometries (9999px) to communicate tap readiness and approachable feedback.

## Components

### Attendance Indicator Chips (P / A / T / E)
- **Structure**: Rounded pill-shaped buttons (`padding: 6px 14px`, or 36px circular badges for condensed mobile roll-calls).
- **States**:
  - *Inactive*: Background `#F5EEF2`, text `#6C4260`, border 1px solid transparent.
  - *Active Presente (P)*: Background `#D6F3E6`, text `#1E7B5C`, border 1px solid `#B0E6CF`.
  - *Active Ausente (A)*: Background `#FDE8EC`, text `#C0435B`, border 1px solid `#F8CCD5`.
  - *Active Tardanza (T)*: Background `#FDF0DE`, text `#A46316`, border 1px solid `#F9DFC0`.
  - *Active Excusa (E)*: Background `#E7ECFB`, text `#3B528C`, border 1px solid `#CFDBF7`.

### Buttons
- **Primary**: Solid background of `#6C4260` with white text. Hover transitions to `#5A344F` with a soft rose tint shadow (`0 4px 12px rgba(108, 66, 96, 0.2)`). Focus ring consists of a 2px offset ring in `#B784A7`.
- **Secondary**: Tinted background `#F5EEF2`, text `#6C4260`, hover background `#EADFEA`.
- **Tertiary / Ghost**: Transparent surface, text `#6C4260`, hover background `#FAF6F8`.

### Input Fields & Search Bars
- Container background `#FFFFFF` with a 1px border of `#E8DCDE`. Radius 8px.
- Focus state softly glows with border color transitioning to `#B784A7` and an outer shadow `0 0 0 3px rgba(183, 132, 167, 0.2)`.
- Input labels leverage Source Sans 3 (Label-MD) in `#5A4553`.

### Student Attendance Cards & Rows
- **Roster Item**: Background `#FFFFFF` alternating or isolated with 8px vertical gaps. Features subtle divider `#F5EEF2`.
- Left-side profile thumbnail or monogram in dusty pearl mauve (`#EADFEA`), followed by the student name in Literata (`headline-sm` or `title-md`), and status indicators aligned to the right.
- Quick bulk-action trigger: Gentle checkbox with plum accent color when checked.

### Modals & Justification Sheets
- Dialog headers use Literata (`headline-md`) in `#362130`.
- Text areas for recording absence justification reasons are housed in `#FAF6F8` with delicate internal borders, providing an uncluttered, reassuring writing surface.