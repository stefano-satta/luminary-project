# LUMINARY — Design System Documentation
# SaaS Landing Page · Full Design Spec

---

## 1. UX STRUCTURE

```
/ (Homepage)
├── Navbar (sticky, glassmorphism on scroll)
├── Hero
│   ├── Badge (announcement strip)
│   ├── Headline + Subheadline
│   ├── CTA pair (primary + demo)
│   ├── Product mockup (coded HTML/CSS)
│   └── Logos strip
├── Features (6-card grid)
├── How it Works (3-step)
├── Social Proof (3 testimonials + metrics)
├── Product Preview (tabbed screenshots)
├── Pricing (3-tier)
├── Final CTA
└── Footer
```

---

## 2. SIMPLIFIED WIREFRAME

```
┌─────────────────────────────────────┐
│  ◈ Logo      Nav Links      [CTA]   │  ← Sticky navbar
├─────────────────────────────────────┤
│                                     │
│     [Badge] New feature shipped     │
│                                     │
│  The platform that thinks           │
│  ahead of you          ← HERO       │
│                                     │
│  [Start free]  ▶ Watch demo         │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ● ● ●  app.luminary.io    │    │
│  │  ┌──────┬──────────────────┤    │
│  │  │ Sidebar│   Dashboard    │    │  ← Coded mockup
│  │  └──────┴──────────────────┘    │
│  └─────────────────────────────────┘
│                                     │
│  Stripe  Figma  Linear  Vercel      │  ← Logos
├─────────────────────────────────────┤
│  Features (2×3 grid)                │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ FC │ │ FC │ │ FC │              │
│  └────┘ └────┘ └────┘              │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ FC │ │ FC │ │ FC │              │
│  └────┘ └────┘ └────┘              │
├─────────────────────────────────────┤
│  How it works                       │
│  01 → Connect     [Pills]           │
│     ↓                               │
│  02 → Describe    [Typewriter]      │
│     ↓                               │
│  03 → Ship        [Progress card]   │
├─────────────────────────────────────┤
│  Social Proof                       │
│  ┌────┐ ┌────────┐ ┌────┐          │
│  │ TC │ │TC FEAT.│ │ TC │          │ ← Testimonials
│  └────┘ └────────┘ └────┘          │
│  ┌──────────────────────────────┐   │
│  │  14k+  │ 98.9%  │  3.2M  │ 11m │ ← Metrics
│  └──────────────────────────────┘   │
├─────────────────────────────────────┤
│  Product Preview                    │
│  [Dashboard] [Builder] [Analytics]  │
│  ┌─────────────────────────────┐    │
│  │     Tabbed screenshot area  │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Pricing                            │
│  ┌──────┐ ┌───────────┐ ┌──────┐   │
│  │ Free │ │    Pro ★  │ │ Ent  │   │
│  └──────┘ └───────────┘ └──────┘   │
├─────────────────────────────────────┤
│  ████ Final CTA ████                │ ← Dark section
│  "Your team deserves..."            │
│  [Start free]  [Schedule demo]      │
├─────────────────────────────────────┤
│  ◈ Luminary   Product  Dev  Legal  │
│  © 2025                 ● Uptime   │ ← Footer
└─────────────────────────────────────┘
```

---

## 3. COLOUR PALETTE

| Token           | Value     | Usage                        |
|-----------------|-----------|------------------------------|
| `--ink`         | `#0d0e14` | Primary backgrounds, text     |
| `--ink-light`   | `#1a1c27` | Secondary dark backgrounds    |
| `--cream`       | `#f8f6f0` | Page background (warm white)  |
| `--cream-dark`  | `#ede9df` | Card backgrounds              |
| `--white`       | `#ffffff` | Cards, surfaces               |
| `--teal`        | `#00d4b4` | Primary accent, CTAs, icons   |
| `--teal-light`  | `#33dfc4` | Hover states, gradients       |
| `--amber`       | `#f59e0b` | Stars, warnings, accents      |
| `--blue`        | `#3b82f6` | Info states, secondary accents|
| `--red`         | `#ef4444` | Error/alert states            |

**Design philosophy**: Deep ink backgrounds pair with a warm cream
instead of pure white — this gives a sophisticated, slightly organic
warmth inspired by high-end editorial design. The teal accent pops
vibrantly against both dark and light surfaces without ever feeling
garish.

---

## 4. TYPOGRAPHY

| Role           | Font              | Weight      | Size            |
|----------------|-------------------|-------------|-----------------|
| Display/Hero   | DM Serif Display  | 400 (italic)| 44–88px         |
| Headings       | DM Serif Display  | 400         | 24–48px         |
| Body           | DM Sans           | 300–500     | 14–18px         |
| Labels/Caps    | DM Sans           | 700         | 11–12px         |
| Monospace      | DM Sans           | 400         | 13–14px         |

**Font pairing rationale**: DM Serif Display's italic adds instant
editorial elegance to headlines — each `<em>` feels intentional and
refined. DM Sans provides clean, legible body text that doesn't compete.
Together they evoke Linear, Vercel, and Arc's design taste.

**Scale**: Use `clamp()` for fluid type scaling between mobile and
desktop breakpoints. No fixed px sizes for display copy.

---

## 5. ANIMATION SYSTEM

### CSS Transitions
```css
/* Standard easing — feels physically natural */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);

/* Spring easing — buttons, hovers, icons */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animation Inventory

| Animation        | Type       | Trigger            | Duration |
|------------------|------------|--------------------|----------|
| Scroll reveal    | CSS class  | IntersectionObserver | 700ms  |
| Navbar scroll    | JS class   | window.scroll       | 300ms  |
| Navbar hide/show | JS style   | Scroll direction    | 300ms  |
| Hero orb float   | CSS keyframe | Load              | 8–12s  |
| Orb parallax     | JS mousemove | Mouse move        | Live   |
| Badge pulse dot  | CSS keyframe | Always            | 2s     |
| Typewriter       | JS          | IntersectionObserver | ~42ms/char |
| Counter roll-up  | JS RAF      | IntersectionObserver | 1600ms |
| Card tilt        | JS mousemove | hover             | Live   |
| Deploy progress  | CSS keyframe | Element visible   | 1500ms |
| Tab fade-in      | CSS keyframe | Click             | 350ms  |
| Btn hover spring | CSS transition | hover           | 200ms  |

### Microinteraction Details

**Logo mark rotation** — on hover, the `◈` symbol rotates 45° with
spring easing. Subtle but memorable.

**Card 3D tilt** — feature and testimonial cards track the mouse
position and apply a soft `rotateX/Y` tilt (max ±4°). Creates depth
without being distracting.

**Hamburger → X** — the three bars animate with individual transforms
into an X. No library needed.

**CTA arrow nudge** — the `→` inside primary buttons translates 3px
right on hover via the `.btn-icon` transition.

---

## 6. IMAGE PROMPTS

### Hero Background Gradient / Abstract
```
Prompt: "Abstract soft gradient mesh, warm cream and deep teal colors,
minimal geometric shapes, subtle grid pattern overlay, ultra-clean,
4K resolution, digital art, suitable for SaaS website hero background,
horizontal orientation"
Format: SVG or WebP · Size: 1920×1080px
```

### Dashboard Screenshot (Preview tab 1)
```
Prompt: "Ultra-realistic SaaS dashboard UI screenshot, dark theme
#0d0e14, card grid layout with line charts and bar graphs, left
sidebar with icon navigation, data visualization components, clean
minimal design, Figma/Linear aesthetic, ambient teal accent colors,
4K resolution, photorealistic rendered interface"
Format: WebP · Size: 1400×900px
```

### Workflow Builder Screenshot (Preview tab 2)
```
Prompt: "Node-based visual workflow automation builder screenshot,
dark mode interface, connected nodes with glowing teal edge lines,
drag-and-drop canvas, trigger and action blocks, modern SaaS tool
aesthetic similar to n8n or Zapier but more minimal, dark background"
Format: WebP · Size: 1400×900px
```

### Analytics View (Preview tab 3)
```
Prompt: "Clean SaaS analytics dashboard screenshot, warm white
background, area charts with teal gradient fills, metric KPI cards,
minimal layout, professional data visualization, Stripe-level
design quality, high contrast, readable typography"
Format: WebP · Size: 1400×900px
```

### Hero Section Illustration (Optional)
```
Prompt: "Isometric 3D illustration of a connected workflow system,
teal and cream color palette, floating UI windows connected by
glowing lines, minimal clean style, white background, professional
SaaS product illustration"
Format: SVG or PNG · Size: 800×600px
```

### Feature Section Icons
```
Use: Heroicons (https://heroicons.com) — outline style
Or Lucide icons (https://lucide.dev)
Recommended: bolt, link, chart-bar, shield-check,
             arrow-path, cpu-chip
Format: SVG inline · Size: 24×24px, scaled to 32×32 display
```

### Team/Avatar Photos (Testimonials)
```
Prompt: "Professional headshot portrait, diverse tech professional,
neutral background, friendly expression, LinkedIn-style photo,
high quality, photorealistic"
Format: WebP · Size: 80×80px (shown at 40×40px)
```

### Open Graph / Social Preview
```
Prompt: "SaaS product social media preview card, dark background,
prominent logo on left, product screenshot on right, teal accent
colors, clean modern layout, 1200x630px"
Format: PNG · Size: 1200×630px
```

---

## 7. COMPONENT INVENTORY

```
components/
├── Navbar.html          — Logo + links + CTA + mobile menu
├── Hero.html            — Badge + headline + CTAs + mockup + logos
├── Features.html        — 6-card grid with icons
├── HowItWorks.html      — 3-step explainer with interactive visuals
├── SocialProof.html     — 3 testimonials + 4-metric bar
├── ProductPreview.html  — 3-tab screenshot switcher
├── Pricing.html         — 3-tier pricing cards
├── FinalCTA.html        — Dark section CTA
└── Footer.html          — Brand + links + status
```

---

## 8. DEVELOPMENT NOTES

### Vite Setup
```bash
npm install
npm run dev   # starts localhost:3000
npm run build # production build → /dist
```

### Performance Tips
- Preload Google Fonts in `<head>` with `rel="preconnect"`
- Use `loading="lazy"` on all below-the-fold images
- Replace placeholder `<div>` mockup with real `<img>` screenshots
  when ready (WebP with fallback PNG)
- Consider `content-visibility: auto` on footer for paint savings
- All animations use `transform` + `opacity` — no layout thrashing

### Accessibility
- All interactive elements have `:focus-visible` states (inherit from browser)
- Add explicit `focus-visible` ring styles to buttons in production
- `aria-label` on hamburger button, social links
- Ensure color contrast ≥ 4.5:1 for body text (cream #f8f6f0 on ink #0d0e14 = ✓)
- Testimonial blockquotes use semantic `<blockquote>` elements

### Responsive Breakpoints
```
Mobile:  < 640px   (base)
Tablet:  ≥ 640px   (sm)
Desktop: ≥ 768px   (md)
Wide:    ≥ 960px   (lg)
Max:     1200px container
```
