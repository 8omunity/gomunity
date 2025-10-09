---
allowed-tools: Task
description: "Generate and manage design system from Figma with Radix UI components"
---

# Design System Command

Build or update 고뮤니티's design system by converting Figma designs to production-ready Radix UI components with automated design token generation.

## Usage

### Create Complete Design System from Figma
```bash
/design-system https://figma.com/file/gomunity-design-system
```
Generates:
- Design tokens (colors, typography, spacing)
- Base UI component library (Button, Input, Card, Dialog, etc.)
- TypeScript types and accessibility attributes

### Add Single Component
```bash
/design-system component https://figma.com/file/new-component-design
```
Creates a single component from Figma design

### Update Existing Component
```bash
/design-system update button https://figma.com/file/updated-button
```
Updates existing component with new design

### Create Design Tokens Only
```bash
/design-system tokens https://figma.com/file/design-tokens
```
Extracts and generates design tokens without components

### Manual Component Creation (no Figma)
```bash
/design-system create button "primary secondary outline variants, sm md lg sizes"
```
Creates component based on text description

## Process Flow

### Phase 1: Analysis (30 seconds)
**design-agent** analyzes requirements:
- Fetch Figma design (if URL provided)
- Analyze existing design system in codebase
- Identify components to create/update
- Extract design tokens from Figma

### Phase 2: Design Token Generation (1-2 minutes)
**design-agent** creates/updates design tokens:
```
lib/design-tokens/
  ├── colors.ts          # Color palette extraction
  ├── typography.ts      # Font system
  ├── spacing.ts         # Spacing scale + safe areas
  ├── breakpoints.ts     # Responsive breakpoints
  └── index.ts           # Unified exports
```

### Phase 3: Component Implementation (5-10 minutes per component)
**design-agent** implements Radix UI components:
- Map Figma components to Radix UI primitives
- Generate TypeScript component with variants
- Apply design tokens (no hardcoded values)
- Add accessibility attributes (ARIA, keyboard nav)
- Create responsive Tailwind styles
- Validate with TypeScript and ESLint

### Phase 4: Quality Validation (1 minute)
**design-agent** validates implementation:
```bash
npx tsc --noEmit        # Type check
npx eslint components/  # Lint check
npm run build           # Build verification
```

## Output

### Successful Implementation
- ✅ Design tokens created/updated in `lib/design-tokens/`
- ✅ UI components in `components/ui/`
- ✅ TypeScript strict mode compliance
- ✅ WCAG 2.1 AA accessibility
- ✅ Mobile-first responsive design
- ✅ 44px minimum touch targets (PWA)
- ✅ All tests and builds passing

### File Structure
```
lib/design-tokens/
  ├── colors.ts
  ├── typography.ts
  ├── spacing.ts
  └── index.ts

components/ui/
  ├── button.tsx        # Radix Button primitive
  ├── input.tsx         # Radix Form primitive
  ├── card.tsx          # Radix Card primitive
  ├── dialog.tsx        # Radix Dialog primitive
  ├── dropdown.tsx      # Radix DropdownMenu
  └── ...
```

## Examples

### Example 1: Complete Design System
```bash
/design-system https://figma.com/file/abc123/gomunity-design-system
```

**Result**:
- Design tokens extracted from Figma
- 10+ base components created (Button, Input, Card, Dialog, Dropdown, Toast, etc.)
- All components use Radix UI primitives
- TypeScript types for all variants
- Accessibility compliance verified
- Ready for use in `builder-agent` implementations

### Example 2: Single Component
```bash
/design-system component https://figma.com/file/def456/product-card
```

**Result**:
- `components/ui/product-card.tsx` created
- Imports existing design tokens
- Radix Card primitive
- Props and variants from Figma
- Responsive and accessible

### Example 3: Update Existing
```bash
/design-system update button https://figma.com/file/ghi789/button-v2
```

**Result**:
- `components/ui/button.tsx` updated
- New variants added
- Design tokens updated if needed
- Backward compatible (existing usage preserved)

### Example 4: No Figma (Manual)
```bash
/design-system create toast "success warning error info variants"
```

**Result**:
- `components/ui/toast.tsx` created
- Radix Toast primitive
- 4 variants: success, warning, error, info
- Follows existing design token patterns

## Integration with Development Workflow

### With /build Command
```bash
# First: Create design system
/design-system https://figma.com/file/design-system

# Then: Build features using components
/build "로그인 페이지 구현"
# builder-agent will use components/ui/ from design-agent
```

### Standalone Usage
```bash
# Designer updates Figma
/design-system update button https://figma.com/file/new-button

# Components automatically updated
# builder-agent uses updated components in next build
```

## Quality Guarantees

### TypeScript
- Strict mode enabled
- Full type coverage for props and variants
- Proper type exports for external usage

### Accessibility
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators
- Color contrast > 4.5:1
- Screen reader compatible

### Responsiveness
- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Touch targets min 44px × 44px
- Safe area support (PWA)

### Performance
- Minimal bundle size (tree-shakeable)
- No runtime CSS-in-JS (Tailwind only)
- Optimized re-renders
- Lazy loading support

## Figma Requirements

For optimal automatic conversion:
1. **Use Radix UI Design Patterns**: Figma components should follow Radix UI structure
2. **Define Variants Clearly**: Use Figma variants for different states (primary, secondary, etc.)
3. **Specify Sizes**: sm, md, lg variants for components
4. **Design Tokens**: Define colors, typography, and spacing as Figma styles
5. **States**: Include default, hover, focus, disabled states

## Notes

- Design system changes are automatically available to `builder-agent`
- Components use `components/ui/` namespace (reserved for design-agent)
- Feature-specific components go in `components/features/` (builder-agent territory)
- Always use design tokens from `lib/design-tokens/` (no hardcoded values)
- Radix UI primitives ensure accessibility and best practices

This command streamlines the design-to-code workflow, ensuring 고뮤니티 maintains a consistent, accessible, and high-quality design system.
