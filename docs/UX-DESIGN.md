---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-core-experience
  - step-04-emotional-response
  - step-05-inspiration
  - step-06-design-system
  - step-07-defining-experience
  - step-08-visual-foundation
  - step-09-design-directions
  - step-10-user-journeys
  - step-11-component-strategy
  - step-12-ux-patterns
  - step-13-responsive-accessibility
  - step-14-complete
status: complete
completedAt: 2026-04-19
inputDocuments:
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/prd.md
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/architecture.md
project_name: Possible CMS
user_name: Kanousei
date: 2026-04-19
workflowType: 'ux-design'
---

# UX Design Specification — Possible CMS

> Admin UX for the **post-handover hero user**. Every decision in this spec resolves toward "can the non-technical marketer do this alone, in under 2 minutes, without filing a ticket?" This spec binds the admin surface only — consumer site rendering is the block renderer's job, not the CMS's.

---

## 1. Discovery & Hero-User Framing

**Primary user:** Priya — the non-technical marketer who inherits a finished site. Fluent in WordPress-era tools; allergic to developer-speak; values speed-to-publish over power-user features.

**Secondary users:** Marco (agency dev, cares about scaffolding DX) and Atlas (AI agent, cares about API introspection and idempotency). Neither is the hero — their needs are API-first, not UI-first.

**Three UX principles, binding for every design decision:**

1. **What You See Is What Gets Published.** The admin canvas must visually match the public render. No second-guessing.
2. **Zero learning curve for one task; progressive surface for more.** Priya's first login should produce a published content change in under 15 minutes with no docs (NFR-aligned with the 15-minute activation success metric).
3. **Errors are recoveries, not obstacles.** Every failure toast ends with an action, not an apology.

## 2. Core Experience

The admin has a single mental model: **pick a site → pick a content type → edit → publish.** Every screen reinforces that.

### The four verbs

| Verb | Surface | Time budget |
|------|---------|-------------|
| **See** | List views (pages, records, media, audit) + Puck canvas live preview | ≤ 2s load (NFR1) |
| **Edit** | Puck canvas (visual blocks) + schema-driven forms (typed records) | ≤ 100ms interaction (NFR6) |
| **Publish** | Schedule picker + publish state pill + cache invalidation confirmation | ≤ 30s edit-to-live (NFR5) |
| **Trust** | Audit log + activity feed + preview links | Never surprising |

### What the admin is NOT

- Not a page builder for developers (no block authoring UI — compose only, per PRD ceiling).
- Not a CMS for learning — no onboarding tutorial modals, no empty-state feature tours. The post-handover admin must be immediately usable.
- Not a site builder — no theme editing, no layout chrome, no global CSS editor. Consumer sites own their own design system.

## 3. Emotional Response Map

What Priya should feel at each step:

| Moment | Target emotion | Design lever |
|--------|---------------|--------------|
| Opening admin for the first time | **Relief** — "this is lighter than I feared" | Minimal chrome, clear hierarchy, no dashboard clutter, one visible primary action per screen |
| Clicking into a page | **Recognition** — "I see the site, not a wall of form fields" | Canvas preview is the default; fields are in the side panel |
| Editing a block | **Control** — "I'm changing what I meant to change" | Selected block highlighted on canvas; side panel fields map 1:1 to visual elements |
| Hitting publish | **Calm confidence** — "it'll be fine" | Schedule / publish action feels weighted but undramatic; confirmation toast specific and truthful |
| Encountering an error | **Guidance** — "I know what to try next" | Every error toast ends with an action verb ("Retry with auto-resize", "Open audit log", "Revert unsaved change") |
| After publishing | **Closure** — "that's done" | Publish state pill flips to live; admin doesn't demand attention; Priya can close the tab |

Conspicuously absent: delight moments, celebratory animations, gamification. Priya is an operator, not an enthusiast.

## 4. Inspiration & References

Ideas harvested from, with what we take and what we drop:

| Reference | Takeaway | Drop |
|-----------|----------|------|
| Webflow | Block canvas with real-time visual fidelity | Their complexity, block authoring, designer-for-developer assumption |
| Notion | Schema flexibility per record type, embedded block/record references | Their freeform structure; we enforce typed schemas |
| Linear | Density + keyboard navigability + quiet visual language + instantaneous feel | Their engineering-centric vocabulary |
| Sanity Studio | Schema-driven form generation, portable reference picker | Their developer-facing IA |
| Ghost Admin | Post-focused simplicity, distraction-free publish flow | Limited block composability |
| Elementor | Drag-and-drop editor pattern (target experience) | Plugin sprawl, option-overload in side panel |

## 5. Design System

### 5.1 Typography

**Font stack.** System UI stack for speed + familiarity. No web fonts in v0.1.
```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, "Liberation Mono", "Courier New", monospace
```

**Scale.** Three sizes for 90% of text; two edge cases.

| Token | Size / line-height | Weight | Usage |
|-------|-------------------|--------|-------|
| `text-xs` | 12 / 16 | 500 | Tags, audit-log timestamps, metadata pairs |
| `text-sm` | 14 / 20 | 400 | Body text, form labels, table cells, toast messages |
| `text-base` | 16 / 24 | 400 | Default for most UI copy, form inputs |
| `text-lg` | 20 / 28 | 600 | Section headers, modal titles |
| `text-xl` | 28 / 36 | 700 | Page titles (one per screen) |

**No italic. No underline** (except active hover/focus on links). Emphasis = weight, not decoration.

### 5.2 Colour

**Design token approach via Tailwind v4 `@theme`.** Semantic names only in components; raw scales only in the theme definition.

**Neutral ramp (primary surface):** zinc 50/100/200/400/600/800/900 — gives us backgrounds, borders, muted text, body text, headings without ceremony.

**Accent.** Single indigo accent `indigo-600` for primary actions + selected state. Not a brand colour (Possible CMS has none, intentionally — it's a tool). Semantic overrides below.

**Semantic tokens.**

| Token | Light | Dark (Phase B) | Usage |
|-------|-------|----------------|-------|
| `surface` | zinc-50 | zinc-950 | Page background |
| `surface-raised` | white | zinc-900 | Cards, modals, side panel |
| `surface-sunken` | zinc-100 | zinc-800 | Input backgrounds, code blocks |
| `border` | zinc-200 | zinc-800 | Dividers, input borders |
| `text-primary` | zinc-900 | zinc-50 | Body text, headings |
| `text-secondary` | zinc-600 | zinc-400 | Secondary text, placeholders |
| `text-muted` | zinc-400 | zinc-500 | Metadata, tertiary |
| `accent` | indigo-600 | indigo-400 | Primary CTAs, selected state, focus ring |
| `accent-hover` | indigo-700 | indigo-300 | Hover state |
| `success` | emerald-600 | emerald-400 | Published state, success toasts |
| `warning` | amber-600 | amber-400 | Scheduled state, warning toasts |
| `danger` | rose-600 | rose-400 | Archived state, error toasts, destructive confirm |

Phase A ships light mode only. Dark mode deferred but tokens are structured to swap via a `:root[data-theme='dark']` override when Phase B ships.

**Contrast compliance (NFR34):** every text/background pair in the token map hits 4.5:1 minimum for normal text, 3:1 for large. Verified in `docs/design-tokens.md` (to be generated in Epic 1).

### 5.3 Spacing

Tailwind v4 default 4px grid. Common values used in components:

| Token | Px | Used for |
|-------|-----|----------|
| `1` | 4 | Tight icon padding |
| `2` | 8 | Inline element gap, chip padding |
| `3` | 12 | Small card padding |
| `4` | 16 | Default component padding |
| `6` | 24 | Section padding |
| `8` | 32 | Layout gutters |
| `12` | 48 | Major layout gaps |
| `16` | 64 | Page-level vertical rhythm |

Never use arbitrary spacing values in components.

### 5.4 Radius & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 2px | Input borders, tight chips |
| `rounded-md` | 6px | Buttons, cards, inputs (default) |
| `rounded-lg` | 8px | Modals, large cards, canvas drop targets |
| `rounded-full` | 9999px | Avatars, status pills |

**Elevation.** Three tiers only.

- `shadow-none` — flat, most UI
- `shadow-sm` — hover state on interactive cards, side panel separation
- `shadow-md` — modals, active drag preview on Puck canvas

No deep drop shadows. No coloured shadows. No frosted glass effects.

### 5.5 Motion

- **Transition duration:** `150ms` default, `200ms` for panels opening, `80ms` for state feedback (button press).
- **Easing:** `ease-out` for expansion (opening), `ease-in` for collapse, `ease-in-out` for position changes.
- **`prefers-reduced-motion`:** respected via global `@media` query disabling all transforms/opacity transitions (NFR35).
- **No decorative animation.** No loading spinners beyond a single spinner component; no progress bars unless true progress is measurable; no parallax; no scroll-jacking.

### 5.6 Iconography

**Library:** `lucide-react`. Single library end-to-end. No hand-drawn icons, no SVG pastes from the web.

**Sizing:** 16px default, 20px for primary actions, 24px for section headers.

**Never use icons as the sole label.** Every iconed button has a visible text label or tooltip; CI axe check fails on icon-only controls without `aria-label`.

## 6. Defining Experience — the 30-Second Test

Harold / any new editor should be able to do this in **30 seconds** on a pre-seeded site:

1. Open admin URL, see login button → click.
2. After GitHub OAuth return → land on Projects page.
3. Click SunStone → land on Sites list (one row).
4. Click the site → land on Pages list (see 4 pages: home, pricing, blog, contact).
5. Click home → open canvas with the home page rendered.

Done. The opening experience is four clicks. No dashboard. No settings. No "getting started" wizard.

Everything else (records, media library, audit log, agent tokens) is one click deeper and unreachable by the 30-second path unless the editor wants it.

## 7. Visual Foundation

### 7.1 Layout Grid

**Admin uses a three-zone layout:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Top Bar (48px) — site switcher · breadcrumb · actions · avatar │
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│  Sidebar   │  Main Content                                      │
│  (240px)   │  (flex-grow, max-w: none, padding: 32px)           │
│            │                                                    │
│ · Pages    │                                                    │
│ · Content  │                                                    │
│ · Media    │                                                    │
│ · Agents   │                                                    │
│ · Audit    │                                                    │
│            │                                                    │
└────────────┴────────────────────────────────────────────────────┘
```

**On the canvas edit page, the sidebar collapses** to a 48px icon rail, and the main area splits:

```
┌─────────────────────────────────────────────────────────────────┐
│  Top Bar — save · schedule · publish · view-live                │
├──┬─────────────────────────────────────────────┬────────────────┤
│  │                                             │                │
│  │  Canvas (flex-grow)                         │  Props Panel   │
│  │  [Puck renders the page here]               │  (320px)       │
│  │                                             │                │
│  │                                             │  Fields for    │
│  │                                             │  selected      │
│  │                                             │  block         │
│  │                                             │                │
│  │                                             │                │
│  ↑ Block palette (icon rail left)              │                │
│                                                │                │
└──┴─────────────────────────────────────────────┴────────────────┘
```

### 7.2 Information Density

Aim for Linear-like density on list views: many rows per viewport, zero wasted space, no card-per-row padding.

**Counter-example (don't do this):** a page list where each page is a rounded card with 24px padding and an avatar — wastes vertical space, makes Priya scroll.

**Correct example:** a table with 40px row height, cells aligned left, status pill right-aligned, hover state reveals action menu.

## 8. Design Directions

### 8.1 Voice & Copy

- **Direct, unpadded.** "Page saved" not "Your page has been successfully saved."
- **Active voice.** "Priya published pricing-v2" in audit, not "pricing-v2 was published by Priya."
- **No marketing prose in the admin.** No exclamation marks. No emoji (except the block palette category icons, which are lucide glyphs).
- **No apologies.** Errors say what to do next, not "oops, something went wrong."
- **Specific, not generic.** "FAQ block removed. Saved as draft." not "Changes saved."

### 8.2 Empty States

Every list view has an empty state that shows:
1. One-sentence description of what belongs here.
2. A single primary action (create / upload / invite).

No illustrations. No motivational copy. No "start with a template" prompts.

Example — empty Pages list: "No pages yet. [+ Create page]"

## 9. User Journey UX Patterns

For each PRD-defined user journey, the exact UX moments.

### 9.1 Journey 1 — Priya edits hero pricing and schedules publish (happy path)

| Step | Surface | Interaction | Visible feedback |
|------|---------|-------------|------------------|
| Land on admin | Login screen | Click "Sign in with GitHub" | Button press state; brief redirect spinner |
| Return from OAuth | `/projects` | — | Three tiles: Projects, Content, Media (if multi-site) OR direct to `/pages` if single site |
| Pick site | `/sites` | Click row | Navigates to `/pages` |
| Pick page | `/pages` | Click "Tours Landing" row | Opens `/pages/[id]/edit` canvas |
| See canvas | Canvas | Canvas renders page with blocks | Puck loaded within 2s (NFR1); block borders invisible until hover |
| Select block | Canvas | Click Pricing block | Block highlights (1px indigo-600 border); props panel slides in (200ms ease-out) |
| Edit price | Props panel | Type `165` into Price field for "Sunset Reef Tour" | Optimistic update in canvas; no save indicator yet (dirty state shown in top bar) |
| Reorder blocks | Canvas | Drag FAQ block up | Drop indicator line (2px indigo-600) shows valid drop zones; drop snaps into position within 100ms (NFR6) |
| Save draft | Top bar | Click "Save draft" | Button shows 80ms press; toast: "Draft saved" appears 300ms later, dismisses after 2s |
| Schedule publish | Top bar | Click "Schedule" dropdown → pick Friday 6am → confirm | Date picker modal (240ms open); confirm button disabled until valid date; toast: "Scheduled for Apr 24, 06:00 ADT" |
| Done | Top bar | Close tab | No confirmation prompt needed; everything is saved |

**Critical details:**
- The **dirty state indicator** in the top bar is a small dot next to the save button, not a whole banner. Priya can glance.
- **Schedule dropdown**, not a modal — fewer clicks. Modal only if editing an existing schedule.
- **No preview iframe** shown alongside canvas in v0.1 (Puck canvas IS the preview). Preview tab available in top bar for "as-public" preview via preview Worker.

### 9.2 Journey 2 — Priya uploads hero image, hits size limit (edge case)

| Step | Surface | Interaction | Visible feedback |
|------|---------|-------------|------------------|
| Click Hero block | Canvas | Block selected | Props panel shows fields including `backgroundImage` |
| Click image field | Props panel | Click "Select image" button | Media picker modal opens (200ms) |
| Drag image into upload zone | Media modal | Drag a 14 MB JPEG | Upload progress bar (actual progress, not fake) |
| Upload fails (size) | Media modal | Size exceeds R2 direct-upload threshold | **Toast replaces progress bar** with: "Image is 14.2 MB — over 10 MB limit." Below: "[Auto-resize and retry]" button |
| Click retry | Media modal | Auto-resize triggers Cloudflare Images transform | Progress bar resumes for resize step; takes ~3s |
| Image appears | Media library grid | New image shows with thumbnail + "Resized 14.2 MB → 680 KB" subtle caption below filename | Thumbnail selectable; metadata row shows dimensions, size, date |
| Select and use | Media modal | Click image, click "Select" | Modal closes (200ms); Hero block re-renders with new image |

**Critical details:**
- Error message names the constraint ("10 MB limit"), not the implementation.
- Recovery action is one click, not a five-step workflow.
- Metadata on resized files is visible — Priya trusts what happened.

### 9.3 Journey 3 — Marco scaffolds SunStone from a fresh clone (developer)

Mostly CLI, but the admin moments matter:

| Step | Surface | Interaction | Visible feedback |
|------|---------|-------------|------------------|
| First admin load after deploy | Login | OAuth flow | Same as Priya — consistent |
| Empty workspace | `/projects` | No projects yet | Empty state: "No projects yet. [+ Create project] or use CLI: `possible-cms init`" |
| Runs CLI | Terminal | `pnpm possible-cms init sunstone` | (See architecture §5 — CLI-level) |
| Refresh admin | `/projects` | SunStone appears | Project card shows site count = 0 (or 1 if the CLI created a default site) |
| Open site | `/sites/[id]/pages` | See the default Home page in draft | Canvas loads with empty blocks; prompt: "Drop blocks from the left to begin" |
| Compose homepage | Canvas | Drag Hero, Image Gallery, Room Cards, CTA, FAQ | Each drop renders immediately; props panel prompts required fields with red outlines |
| Publish | Top bar | Click "Publish" | Transitions draft→live; link to public URL appears in a toast: "Live at sunstone.dev/ [↗]" |
| Walkthrough the client | Loom recording | Hand off admin URL + GitHub OAuth invite | — |

**Critical admin details:**
- Required fields on blocks are **visibly marked** (red dot on field label, inline tooltip with the required-message).
- "Live at URL" toast is click-to-copy — Marco Slack-pastes it to the client.

### 9.4 Journey 4 — Atlas (agent) creates Team page structurally (API-only)

No admin UI involved for Atlas, but:
- When Atlas's PR merges and new blocks/collections register, the admin immediately surfaces them (FR56) — no admin restart.
- Audit log shows agent_id distinct from user_id with a robot icon next to the actor column.

## 10. Component Strategy

### 10.1 Component Library Map

Base primitives from **shadcn/ui** (Tailwind v4 branch). We copy them in, don't depend on a shadcn package. List of the ones we use in Phase A:

| shadcn primitive | Used for |
|------------------|----------|
| Button | Every CTA, icon button, destructive action |
| Input, Textarea | Form fields (text, search, paths) |
| Select | Dropdown fields, site/project switcher |
| Checkbox, Switch | Boolean fields |
| Dialog | Modals (media picker, confirm destructive, agent token modal) |
| DropdownMenu | Top-bar actions, row actions in tables |
| Table | List views |
| Tabs | Preview / raw JSON toggles, record list by status |
| Toast | All notifications (success/warning/error) |
| Tooltip | Icon-only button labels (accessibility) |
| Command | ⌘K-style search (Phase B; v0.1 uses browser URL only) |
| Sheet | Side panel on canvas edit |
| Label | Form field labels |
| Card | Not used — too much padding for our density |
| Accordion | FAQ block render; audit log expanded view (Phase B) |

### 10.2 Project-specific components

Listed in architecture §5 under `apps/admin/components/`. Key ones designed here:

**`<Canvas />`** — wrapper around Puck's `<Puck>` component. Extends with our custom top bar, side panel, block palette categorisation, and save/schedule/publish actions. Saves to tRPC `page.save` on explicit save; tracks dirty state via Puck's internal change events.

**`<BlockPalette />`** — left icon rail + expanded-on-hover tray. Shows blocks grouped by category (`layout` / `content` / `media` / `marketing`). Palette filters by `site.block_whitelist`. Search input at top when expanded.

**`<PropsEditor />`** — right panel; maps Zod prop schemas to form widgets via the schema-kit widget registry. Array fields use inline add/remove + drag-reorder; reference fields use `<ReferencePicker />`.

**`<ReferencePicker />`** — modal-launched search + pick UI for linking records. Shows collection, filter input, paginated list, preview card on hover.

**`<MediaPicker />`** — modal with media grid, filter by type, upload zone (drop or click), in-modal asset selection.

**`<SchemaForm />`** — the record edit form. Same widget registry as PropsEditor; renders top-to-bottom with field groups and an action bar at bottom.

**`<PublishControls />`** — top-bar widget. Draft state indicator (dot), save button, schedule dropdown, publish button, view-live link (post-publish). Reflects `status` + `scheduled_for` from the record.

**`<AuditRow />`** — compact one-liner: timestamp (relative), actor + icon, action verb, target link. Click expands the diff JSON inline.

**`<SiteSwitcher />`** — top-bar combobox. Shows current workspace/project/site triple; click to switch. Keyboard: `G S` shortcut opens it.

**`<EmptyState />`** — used everywhere: one-sentence explanation + single primary action.

**`<StatusPill />`** — draft (zinc) · scheduled (amber) · live (emerald) · archived (zinc-400). Consistent everywhere status appears.

### 10.3 Widget Registry

Schema-driven form generation needs a central map. `packages/schema-kit/widgets.ts`:

| Zod type | Widget |
|----------|--------|
| `z.string()` | `<Input />` |
| `z.string().email()` | `<Input type="email" />` |
| `z.string().url()` | `<Input type="url" />` |
| `z.string().datetime()` | `<DatePicker />` |
| `z.number()` | `<Input type="number" />` |
| `z.boolean()` | `<Switch />` |
| `z.enum([...])` | `<Select />` |
| `z.array(z.string())` | `<TagInput />` |
| `z.array(T)` (object item) | `<ArrayField />` with nested widget per field |
| `slug()` | `<SlugInput />` (auto-generates from title; editable) |
| `locale()` | `<LocaleSelect />` |
| `r2Image()` | `<ImagePickerField />` (opens MediaPicker) |
| `mdxBody()` | `<MDXEditor />` (Tiptap-based or CodeMirror MDX — final choice in Epic 5) |
| `reference(collection)` | `<ReferencePicker collection={collection} />` |

Custom widgets register via `packages/schema-kit/widgets.ts` — a block/collection author can attach a `.meta({ widget: 'custom-thing' })` call to a Zod field to pick a specific widget.

## 11. Key UX Patterns

### 11.1 Save / Schedule / Publish semantics

Three distinct verbs, three distinct visual treatments.

- **Save** — secondary button (outline, indigo-600 border, text-primary). Writes to D1 as draft; no cache invalidation; not visible to public API. Default keyboard shortcut: `⌘S`.
- **Schedule** — tertiary dropdown button combined with "Save" (split button). Opens picker; on confirm, writes `scheduled_for` + sets status=scheduled; cron Worker flips to live at time.
- **Publish** — primary button (solid indigo-600, white text). Writes D1 + invalidates KV + transitions to live. Confirmation only for destructive re-publishes (republishing a live page); plain click for first publish.

Edge cases:
- If **scheduled** and editor hits Publish: "This will override the scheduled publish for Apr 24. Publish now instead? [Cancel / Publish now]".
- If **live** and editor hits Save: saves a new draft revision (Phase B versioning). Phase A: warns "Publishing overwrites live content. Save as draft first." — v0.1 skips this because Phase B versioning isn't ready; keep it simple — save in v0.1 overwrites D1 draft_json, publish promotes draft→live.

### 11.2 Dirty State

Top bar shows a 6px indigo-600 dot next to the Save button when the canvas has unsaved changes. Tooltip: "Unsaved changes." Browser beforeunload warning fires on nav-away with dirty state.

### 11.3 Block Selection

Only one block selected at a time on the canvas. Selection visuals:
- Selected block: 1px indigo-600 border, +8px outline offset, transparent 4% accent fill.
- Hovered block (unselected): 1px zinc-400 border.
- Parent block (when child selected): dashed 1px zinc-400 border.
- Dropzone active during drag: 2px indigo-600 dashed, subtle indigo-50 fill.

Clicking outside any block deselects (canvas becomes inert).

### 11.4 Side Panel Behaviour

- **Opens** with 200ms slide-from-right when a block is selected or on route change to `/edit`.
- **Width 320px** fixed. Does not resize.
- **Empty state** (no selection): shows "Select a block to edit its properties." + small drawing of an arrow pointing to canvas.
- **Scrolls independently** of main content. Long prop lists scroll within the panel, not the canvas.

### 11.5 List Views

- **Row height** 40px, not cards.
- **Columns:** title (flex), author, status pill, last updated (relative), actions (3-dot menu).
- **Row click** opens the item's edit view.
- **Row hover** reveals action menu button right-aligned.
- **Filter bar above table:** search input (left) + status filter + sort dropdown. No multi-select bulk action in Phase A (Phase B feature).

### 11.6 Error Recovery Matrix

| Failure | Detection | Recovery UX |
|---------|-----------|-------------|
| Network disconnect mid-edit | Fetch timeout on tRPC mutation | Toast "Save failed — check your connection. [Retry]". Local state preserved; dirty indicator stays. |
| Schema validation on save | Server returns 400 | Toast names the field: "Title must be at least 1 character". Scrolls to and focuses the offending field. |
| Tenant scope violation | Server 403 | Full-page error with contact-admin action. Shouldn't normally happen — logs for audit. |
| Expired session | 401 on mutation | Toast "Session expired. [Sign in again]". Preserves form state in sessionStorage; re-auth returns to same page with state. |
| Image upload > 10 MB | Client-side size check | See Journey 2 — inline recovery with auto-resize option. |
| KV invalidation failure after publish | Server completes publish but returns warning | Toast "Published. Cache refresh is taking longer than usual — public site may show old content for up to 5 minutes." |
| Puck unknown block in persisted data | Render placeholder | Placeholder shows "Unknown block type '[X]' — contact developer to restore" with admin-only warning (not visible publicly). |

### 11.7 Keyboard Shortcuts (NFR32 Keyboard Navigation)

| Shortcut | Action | Scope |
|----------|--------|-------|
| `⌘S` | Save draft | Canvas edit |
| `⌘⇧P` | Publish | Canvas edit |
| `⌘K` | Open command palette (Phase B) | Global |
| `Esc` | Close modal / deselect block | Modal / canvas |
| `G` then `P` | Go to Pages | Global |
| `G` then `C` | Go to Content | Global |
| `G` then `M` | Go to Media | Global |
| `/` | Focus search in current list | List views |
| `?` | Open keyboard shortcuts reference | Global |
| `Tab` / `Shift+Tab` | Move between canvas blocks / between form fields | Contextual |
| `Arrow Up/Down` | Reorder selected block on canvas | Canvas with block selected |
| `Delete` / `Backspace` | Remove selected block (with undo toast) | Canvas |

### 11.8 Accessibility patterns (NFR31–NFR35)

- **Focus visible** — every interactive element has a 2px indigo-600 outline offset 2px from the element edge. Never suppressed (`outline-none` forbidden).
- **ARIA labels** — every icon-only button; Puck's drop zones (`role="region" aria-label="Drop block here"`); canvas blocks (`role="article"`).
- **Keyboard paths** — every action in the spec reachable without mouse.
- **Screen-reader announcements** — save/publish/schedule emit `aria-live="polite"` toast announcements.
- **Contrast** — verified in design-tokens.md output from Epic 1.
- **`prefers-reduced-motion`** — respected; transforms/opacity transitions disabled; functional animations (drop indicator) remain.

## 12. Responsive Posture

Desktop-first per PRD project-type skip list. Breakpoints:

| Breakpoint | Min width | Layout |
|-----------|-----------|--------|
| `sm` | 640 | Mobile-not-supported admin warning screen: "Possible CMS admin requires a larger screen. [Copy the link to your laptop]" — no attempt to adapt canvas for mobile. |
| `md` | 768 | Tablet — sidebar collapses to icon rail by default; canvas + props panel usable but cramped. |
| `lg` | 1024 | Full layout as designed. |
| `xl` | 1280 | Extra canvas width for heavy block composition. |
| `2xl` | 1536 | Extra props panel width (expands to 360px). |

Consumer sites (the actual rendered pages) are responsive per their own design systems; the CMS doesn't opine.

## 13. Design Handoff Notes (for Web Studio Designer + Frontend Dev)

**Implementation priority for Epic 1 scaffold:**
1. Design tokens in `apps/admin/app/globals.css` per §5.2–5.5.
2. `Button`, `Input`, `Select`, `Dialog`, `Toast`, `Sheet` shadcn primitives copied in.
3. Top-bar skeleton + sidebar skeleton + basic route shells.
4. Tailwind v4 + shadcn Tailwind v4 config aligned.

**Implementation priority for Epic 4 Canvas:**
1. Puck wrapper `<Canvas />` with top-bar + side panel layout.
2. `<BlockPalette />` with category grouping.
3. `<PropsEditor />` widget dispatch.
4. Drag/drop indicators per §11.3.
5. Save/schedule/publish controls per §11.1.

**Accessibility smoke tests to wire in Epic 1 CI:**
1. `@axe-core/playwright` in `pnpm test:e2e` pipeline.
2. Keyboard navigation test on every route.
3. Screen-reader check on canvas actions.

**Deferred UX (Phase B+):**
- Dark mode (tokens already structured).
- Command palette (⌘K).
- Bulk actions on list views.
- Revision diff UI (Git-for-content).
- Real-time collaborative cursors on canvas.

---

*UX spec complete. Hands off cleanly to epic/story authoring and implementation.*
