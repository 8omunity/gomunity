---
allowed-tools: Task
description: "Build application features from Linear tickets and Figma designs"
---

# Build Command

Build or enhance applications using Linear tickets and Figma designs as input sources.

## Usage

### With Linear Ticket and Figma Design
```bash
/build TICKET-123 https://figma.com/file/abc123/design-name
```

### With Linear Ticket Only
```bash
/build TICKET-456
```

### With Figma Design Only
```bash
/build https://figma.com/file/def456/component-design
```

### With Description
```bash
/build "implement user authentication with social login"
```

## Process Flow

Based on the provided inputs, the command will:

### Phase 0: Git Setup (30 seconds)
Launch **git-agent** to prepare development environment:
- Create feature branch from latest main
- Set up proper branch naming based on ticket/description
- Ensure clean working directory

### Phase 1: Parallel Analysis (3-5 minutes)
Launch specialized agents simultaneously:

1. **requirements-agent**:
   - If Linear ticket provided: Extract requirements from ticket
   - If description provided: Structure the requirements
   - Output: Structured feature specification

2. **design-agent**:
   - If Figma URL provided: Process design specifications
   - If no design: Create component specifications based on requirements
   - Output: Radix UI component mapping and design system

3. **docs-agent**:
   - Research implementation patterns for identified requirements
   - Verify best practices for the tech stack
   - Output: Implementation guidance and code examples

### Phase 2: Implementation (10-20 minutes)
Launch **builder-agent** with combined specifications:
- Analyze current project state (new vs existing)
- Implement database changes if needed
- Create or modify components following specifications
- Ensure PWA compliance and accessibility
- **git-agent** makes Korean conventional commits during implementation
- Test and validate implementation

### Phase 3: Git Finalization (1-2 minutes)
**git-agent** completes the workflow:
- Final rebase against main
- Push feature branch to origin
- Create GitHub PR with Korean description
- Link to Linear ticket and provide implementation summary

## Input Processing

### Linear Ticket Processing
When `TICKET-123` format is detected:
- Extract ticket details using Linear integration
- Parse user stories and acceptance criteria
- Identify technical requirements and dependencies
- Map to database schema changes and API needs

### Figma URL Processing
When Figma URL is provided:
- Process design specifications (colors, typography, components)
- Map visual components to Radix UI primitives
- Define responsive behavior and interactions
- Extract asset requirements (icons, images)

### Combined Processing
When both are provided:
- Cross-reference design with requirements
- Ensure UI matches functional specifications
- Validate design feasibility with technical constraints
- Create unified implementation plan

## Output

### Successful Implementation
- ✅ Feature/application implemented and working
- ✅ Database migrations applied (if needed)
- ✅ Components created following design specifications
- ✅ PWA compliance maintained
- ✅ TypeScript types updated
- ✅ Tests passing
- ✅ Korean conventional commits created
- ✅ GitHub PR created and ready for review

### Implementation Summary
- 📋 Requirements implemented from Linear ticket
- 🎨 Design specifications applied from Figma
- 🏗️ Architecture patterns followed
- 📱 PWA features maintained/added
- ♿ Accessibility compliance verified
- 🔄 Git workflow completed with proper branching
- 🇰🇷 Korean documentation and commit messages

## Examples

### Feature Implementation
```bash
/build AUTH-123 https://figma.com/file/auth-flow
```
Result: User authentication system with UI matching Figma design

### Bug Fix with Design Update
```bash
/build BUG-456 https://figma.com/file/updated-component
```
Result: Bug fixed with component updated to match new design

### New Feature from Description
```bash
/build "add product comparison feature with side-by-side view"
```
Result: Product comparison functionality with appropriate UI components

The command intelligently adapts based on the input provided, ensuring the most appropriate implementation approach for each scenario.