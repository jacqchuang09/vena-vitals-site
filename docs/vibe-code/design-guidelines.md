# Design Guidelines

## Design Direction

The site should feel clinical, precise, evidence-first, and high trust. It should not feel like a consumer wellness app.

## Visual Personality

| Trait | Direction |
|---|---|
| Clinical | Use real device, waveform, OR, and data visuals |
| Premium | Dark clinical interface, restrained accent color, strong typography |
| Precise | Tight language, clear labels, structured tables |
| Evidence-first | Put data, validation, and citations near claims |
| Not consumer | Avoid lifestyle smartwatch, wellness, app-store, or "track your health" language |

## Colors

Use these exact tokens unless this document is updated.

| Token | Hex / Value | Use |
|---|---|---|
| `--ink` | `#050507` | Main background, dark clinical premium base |
| `--ink-2` | `#0c0d10` | Secondary dark panels |
| `--contrast` | `#000000` | Pure black for strong contrast |
| `--paper` | `#f4f4f5` | Primary text |
| `--mute` | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: add brand neutral gray hex.]</span> | Muted labels and secondary text, neutral gray |
| `--line` | `rgba(255, 255, 255, 0.065)` | Hairline borders |
| `--accent` | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: add Vena Vitals brand red hex.]</span> | Vena Vitals red accent, waveform, key data |
| `--accent-soft` | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: add soft red-tinted panel value.]</span> | Subtle red-tinted backgrounds |

## Palette Direction

The brand palette is Vena Vitals red as the accent, black for strong contrast, and a neutral gray, on a dark clinical premium base. Keep the dark, high-craft, professional feel. Keep the logo consistent across the site.

The accent role is set to the brand red. The exact red and gray hex values still need to be added.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: add the exact Vena Vitals brand red and neutral gray hex values, and confirm official logo colors.]</span>

## Aesthetic Reference

Aim for the polish of Butterfly Network and Proprio, and the dark premium feel of the chosen Framer template, without copying any of them.

## Fonts

| Role | Font |
|---|---|
| Display | Archivo |
| Body | Inter |
| Mono labels | JetBrains Mono |

Use current imports from `src/routes/__root.tsx`.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm final brand font licensing or replace with approved brand fonts.]</span>

## Typography Rules

| Element | Style |
|---|---|
| Hero heading | Archivo, uppercase, bold, tight line height |
| Section heading | Archivo, uppercase, bold, `clamp(34px, 4.2vw, 60px)` |
| Eyebrow | JetBrains Mono, 10px, uppercase, wide tracking |
| Body | Inter, normal case, readable line height |
| Stat numbers | Archivo, bold, large, tabular when numeric |

Do not use oversized marketing copy inside compact cards or tables.

## Spacing

| Element | Rule |
|---|---|
| Page container | `container-x`, max width 1360px |
| Section vertical padding | Usually `py-24`, `py-28`, `md:py-32`, or `md:py-40` |
| Cards | Use `p-7`, `md:p-9`, or `md:p-10` |
| Grid gaps | Use `gap-px` with dark panels for clinical grid look |
| Borders | Use thin `hairline` or `border-white/[0.07]` |
| Radius | Keep mostly square or subtle, no pill-heavy consumer UI except nav |

## Layout Rules

1. No text overlap.
2. No text clipping.
3. No nested decorative cards.
4. Use real page sections, not stacks of random cards.
5. Use full-width bands and strong grid structure.
6. Keep clinical content scan-friendly.
7. Keep CTAs obvious and repeated at decision points.

## Waveform Style

| Element | Rule |
|---|---|
| Color | `var(--accent)` |
| Glow | Subtle accent glow only |
| Motion | Smooth, calm, monitor-like |
| Background | Dark clinical monitor panel |
| Vitals | Large numbers, units stacked below values |
| Layout | Must never overlap in narrow containers |

## CSS Rules

Use established CSS tokens and component patterns. Do not improvise new palettes, fonts, shadows, radii, or visual effects unless the design guidelines are updated first.

Allowed:

```css
var(--ink)
var(--ink-2)
var(--paper)
var(--mute)
var(--line)
var(--accent)
var(--accent-soft)
```

Avoid:

1. New random accent colors or off-brand reds.
2. Gradients as primary design language.
3. Consumer app palettes.
4. Decorative blobs or orbs.
5. Large rounded cards.
6. Unverified stock-like imagery.

## Imagery

| Image Type | Use |
|---|---|
| Device on patient | Hero, Technology, Anesthesiology setting page |
| Tablet UI | Product/app proof, homepage, Technology |
| Waveform/data | Evidence and clinical sections |
| OR photo | Anesthesiology setting page |
| Sleep figure | Sleep Medicine research page |
| Logos | Trust and About sections only after approval |

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: replace placeholder images with approved product, OR, tablet, and evidence visuals.]</span>

## Component Rules

| Component | Rule |
|---|---|
| Header | Shared across all pages, matches sitemap |
| Footer | Shared across all pages, includes regulatory disclaimer |
| CTAs | Use consistent labels: Request a Demo, See Evidence, Partner With Us |
| Tables | Use clear headers, aligned columns, no dense paragraph cells where avoidable |
| Accordions | Use for FAQs only |
| Forms | Clear labels, no cramped fields, confirmation state required |

## Regulatory Visual Rule

Disclaimers should be visible but quiet. Use muted text, not a warning banner unless legal requests it.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: legal/regulatory team should approve exact disclaimer style and wording.]</span>
