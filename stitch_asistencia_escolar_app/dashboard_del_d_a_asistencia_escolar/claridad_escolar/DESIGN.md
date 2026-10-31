---
name: Claridad Escolar
colors:
  surface: '#f8f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f8f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e7e8eb'
  surface-container-highest: '#e1e2e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464e'
  inverse-surface: '#2e3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4f5e83'
  primary: '#000922'
  on-primary: '#ffffff'
  primary-container: '#0f2042'
  on-primary-container: '#7988b0'
  inverse-primary: '#b6c6f1'
  secondary: '#016398'
  on-secondary: '#ffffff'
  secondary-container: '#81c4ff'
  on-secondary-container: '#00517e'
  tertiary: '#000d06'
  on-tertiary: '#ffffff'
  tertiary-container: '#002718'
  on-tertiary-container: '#009c6b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b6c6f1'
  on-primary-fixed: '#081a3c'
  on-primary-fixed-variant: '#37466a'
  secondary-fixed: '#cde5ff'
  secondary-fixed-dim: '#94ccff'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004b74'
  tertiary-fixed: '#80f9c0'
  tertiary-fixed-dim: '#62dca6'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9fc'
  on-background: '#191c1e'
  surface-variant: '#e1e2e5'
typography:
  headline-xl:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Literata
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Literata
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  data-metric:
    fontFamily: Literata
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an authoritative, high-efficiency digital ledger tailored for educators in the Dominican Republic. Built specifically for demanding classroom conditions—such as bright sunlight, low-grade projectors, varied mobile hardware, and swift roll-call workflows—the aesthetic prioritizes instantaneous legibility, functional ergonomics, and civic rigor.

The style unites Modern Utilitarianism with Institutional Authority. It avoids ornamental trends like heavy drop shadows or decorative gradients in favor of razor-sharp typographic hierarchy, high-contrast boundaries, and calibrated semantic signals. The visual environment evokes professional institutional trust, reminiscent of quality state records and modern public registry tools, keeping educators focused without cognitive fatigue.

## Colors

The palette is tuned for direct sun, high ambient glare, and immediate scanning across large class rosters. Surfaces stay cool and crisp, framing structured high-contrast text and unmistakable state tags.

### Core Structure
- **Canvas (`#F7F9FB`)**: Crisp, glare-reducing light slate ground that separates clearly from active content planes.
- **Surface (`#FFFFFF`)**: Pure white base for primary functional cards, data tables, and modal dialogs.
- **Surface Alt / Container (`#ECEEF0`)**: Neutral structural fills for table headers, inactive rows, and divider rails.
- **Outlines & Dividers (`#C5C6CF`)**: Solid boundary tone guaranteeing 3:1 contrast against surface layers without creating visual noise.

### Brand Accents
- **Primary Navy (`#0F2042`)**: Deep institutional navy applied to top-level navigation, structural frames, major headers, and standard actionable buttons. Text on this tone must always be pure white (`#FFFFFF`).
- **Secondary Blue (`#006398`)**: Focused interactive blue for hyperlinking, active table tabs, secondary actions, and informational callouts.
- **Secondary Blue Container (`#CCE5FF`)**: Tinted tint fill for selected state ranges and navigational chips.

### Typography & Readability
- **Primary Text (`#191C1E`)**: Near-black high-contrast tone achieving >12:1 contrast against white surfaces.
- **Secondary Text (`#45464E`)**: Calibrated slate achieving WCAG AA compliance (4.5:1+) on all active card surfaces for secondary descriptors, student IDs, and metadata.

### Attendance Semantic System
Standardized attendance states use dual pairing (bold deep tone for outlines/text/icons, high-luminance pastel for rapid field scanning):
- **Presente (P)**: Text/Icon `#006398` on `#6FFBBE` tint, or full solid `#009C6B` with white text.
- **Ausente (A)**: Text/Icon `#BA1A1A` on `#FFDAD6` tint, or full solid `#BA1A1A` with white text.
- **Tardanza (T)**: Text/Icon `#B26A00` on `#FFE2A8` tint, or full solid `#B26A00` with white text.
- **Excusa (E)**: Text/Icon `#006398` on `#CCE5FF` tint, or full solid `#006398` with white text.

### Traffic Light Alerts (Inasistencia Acumulada)
- **Normal (<10%)**: Solid green `#009C6B` indicator.
- **En Riesgo (10% - 20%)**: Amber warning `#B26A00` indicator.
- **Crítico (>20%)**: Alert red `#BA1A1A` indicator for compulsory parent-teacher intervention.

## Typography

Typography bridges official record-keeping with contemporary interface efficiency:

- **Literata** acts as the editorial and institutional anchor. It conveys pedagogical formality in headers, section dividers, and key aggregated performance figures (e.g., total student count, daily percent rates). Its distinct serifs guide visual scanning in glare-heavy spaces.
- **Source Sans 3** manages heavy operational duty: roster entries, rapid data grids, action triggers, attendance pill legends, and state markers. Its open counters and robust stroke weight preserve legibility at low resolutions and quick scan speeds.
- **Tabular Numerals**: Form controls, student numbering (RNE), dates, and attendance percentages must apply tabular spacing (`font-variant-numeric: tabular-nums`) to prevent horizontal jittering across roster columns.

## Layout & Spacing

A disciplined 8px base rhythm governs the system. Layout structures adapt fluidly while strictly safeguarding touch target density.

### Breakpoints & Layout Model
- **Mobile (< 768px)**: 4-column fluid layout with `margin: 1rem` and `gutter: 1rem`. Student attendance shifts from dense matrix grids to stacked roster cards with horizontal state triggers. The navigation condenses into a bottom bar or persistent top utility bar.
- **Tablet (768px - 1024px)**: 8-column layout. Suitable for split-screen attendance confirmation and date-range filtering.
- **Desktop (> 1024px)**: 12-column layout with a fixed 260px primary navy navigation rail, `margin-desktop: 2rem`, and max container width of 1440px.

### Touch Discipline
Under bright fluorescent or natural light, precision pointing diminishes. All rapid-entry interactive attendance nodes (P, A, T, E selectors, check actions, bulk submit) enforce a physical footprint of at least 48x48px, preserving a minimum `space-xs` (4px) or `space-sm` (8px) separator between adjacent actions to prevent misclicks.

## Elevation & Depth

To maintain clarity in ambient classroom illumination, this design system avoids soft, multi-layered diffuse shadows that wash out under glare. Depth relies on tonal tiers and structural containment:

- **Base Layer (Flat Ground)**: Background `#F7F9FB` anchors all main scroll surfaces.
- **Active Structural Planes (Layer 1)**: Cards, roster bars, and floating utility bars utilize solid `#FFFFFF` bounded by a 1px border of `#C5C6CF`. No shadow is used in standard non-interactive resting states.
- **Actionable Floating Elevation (Layer 2)**: Sticky roster confirmation strips, tooltips, and floating bulk action bars introduce a high-contrast boundary with a crisp, low-blur drop: `0px 4px 12px rgba(15, 32, 66, 0.08)`, bounded by a 1px `#C5C6CF` rim.
- **Modal Windows & Flyouts (Layer 3)**: Fixed modals sit on a 40% `#0F2042` scrim (`rgba(15, 32, 66, 0.40)`) with elevation `0px 8px 24px rgba(15, 32, 66, 0.16)`.

## Shapes

The shape hierarchy combines crisp administrative geometry with ergonomic touch zones:

- **Default Form Controls & Buttons (4px - `rounded`)**: Text fields, dropdown inputs, checkboxes, segmented control items, and standard rectangular buttons employ a modest 4px radius, preserving an organized, form-ledger impression.
- **Cards & Data Groups (8px - `rounded-lg`)**: Content containment cards, daily roll summaries, and student detail items use an 8px radius to gently frame dense data.
- **Large Panels & Dialogs (12px - `rounded-xl`)**: Top-level modal sheets, persistent attendance review panels, and side-sheet containers use a 12px radius.
- **Chips, Pills, and Badges (Full Pill - `rounded-full`)**: Semantic status tags, short-form attendance badges (e.g., [P], [A], [T], [E]), and active filter pills utilize fully rounded semicircular caps (9999px) to visually distinguish status metadata from interactive rectangular triggers.

## Components

Material Symbols Outlined provide uniform iconographic support across all components at standard 20px and 24px sizes.

### Buttons
- **Primary**: Background `#0F2042`, label `#FFFFFF`, border-radius 4px. Minimum height 48px. State changes: hover `#1B3260`, active `#081329`. Disabled state uses `#ECEEF0` fill with `#45464E` text.
- **Secondary**: Background `#CCE5FF`, label `#006398`, border 1px solid `#006398`, border-radius 4px.
- **Quick-Action Matrix Buttons**: Dedicated roll-call buttons mapped per student (P, A, T, E). Each button is 48x48px with a centered bold uppercase character. Resting state: `#FFFFFF` fill with 1px `#C5C6CF` outline. Active/Toggled state: switches immediately to its respective solid semantic token (e.g., `#009C6B` fill, `#FFFFFF` text for Presente).

### Chips & Badges
- **Status Badges**: Full pill shape, padding `4px 12px`. Composed of a 6px solid dot indicator, an 8px space, and `label-sm` text. Presente pairs `#6FFBBE` with `#009C6B` text. Ausente pairs `#FFDAD6` with `#BA1A1A` text.
- **Filter Chips**: Full pill shape, background `#FFFFFF`, border 1px solid `#C5C6CF`. When selected, background shifts to `#CCE5FF` with `#006398` border and text.

### Roster Tables & Student Lists
- **Desktop Grid**: Zebra striping avoided. Rows use `#FFFFFF` on `#C5C6CF` bottom borders, minimum row height 56px. RNE code styled in `body-sm` (`#45464E`), student name in `label-md` (`#191C1E`). Right-aligned column hosts the inline segmented attendance switcher.
- **Mobile Cards**: Individual student cards bounded by 1px `#C5C6CF` with 8px radius, featuring student photo/initial thumbnail (40x40px), bold name, cumulative risk badge, and a horizontal 4-button segmented cluster spanning full card width.

### Checkboxes & Radio Controls
- Minimum hit dimension: 48x48px wrapper. Check element: 20x20px, 4px corner radius, 2px solid border `#45464E`. Checked state: `#0F2042` background with `#FFFFFF` checkmark symbol.

### Form Inputs
- Standard height 48px, background `#FFFFFF`, 1px solid `#C5C6CF` outline, 4px corner radius, internal padding `12px 16px`. Active focus applies a 2px outline of `#006398` with no layout shift. Descriptive helper text sits below in `body-sm` (`#45464E`).

### Cards & Summary Banners
- **Metric Cards**: Pure white background, 8px radius, 1px `#C5C6CF` perimeter, internal padding `16px`. Header in `label-md` (`#45464E`), key data metric in `Literata` (`#0F2042`), accompanied by an inline traffic-light trend chip.
- **Floating Confirmation Bar**: Fixed bottom-sheet bar for mobile and tablet views. Deep `#0F2042` container with white metrics summarizing total Presentes vs. Ausentes and a large, high-contrast button labeled "Guardar Registro".