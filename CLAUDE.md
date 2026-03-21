# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript application designed as a Grist widget. The app integrates with the Grist spreadsheet API to display record data in a formatted view.

## Key Architecture

- **Frontend Framework**: Vue 3 with Composition API and `<script setup>` syntax
- **Build Tool**: Vite+ for unified development, testing, linting, and builds
- **Package Manager**: pnpm (managed by Vite+)
- **Testing**: Vitest for unit tests, Playwright for E2E tests
- **Type System**: Full TypeScript with Vue-specific type definitions
- **Integration**: Grist API for receiving and displaying spreadsheet data

## Development Commands

Use Vite+ commands for development. Vite+ manages Node.js and the pnpm package manager for this project:

```bash
# Development
vp dev                    # Start the Vite+ dev server with hot reload
vp run build              # Run type-check and Vite+ production build
vp preview                # Preview the production build

# Testing
vp run test:unit          # Run all unit tests with Vite+'s Vitest integration
vp run test:e2e           # Run Playwright E2E tests

# Code Quality
vp run lint               # Run Vite+ lint with auto-fix
vp run format             # Format source files with Vite+
vp run type-check        # TypeScript type checking only
```

## Grist Integration

The app connects to Grist's widget API through:

- Global `window.grist` object availability check
- `grist.ready()` to signal widget is loaded
- `grist.onRecord()` to receive data updates
- TypeScript definitions in `src/types/grist.d.ts`

The widget gracefully handles standalone mode when Grist API is not available.

## Code Structure

```
src/
├── App.vue           # Main component with Grist integration
├── main.ts           # Vue app bootstrap
├── types/
│   └── grist.d.ts    # Grist API type definitions
└── __tests__/        # Unit test files
```

## E2E Testing Architecture

### Page Object Pattern

- **Component-based structure**: `AppTester` with specialized testers (`ActionButtonsTester`, `PrintableDocumentTester`, `SettingsTester`)
- **Semantic locators only**: Use `getByTestId()`, `getByRole()`, `getByText()` - never CSS selectors
- **Built-in testability**: DOM event-based mocking via `mockgristrecord` custom events
- **Test pattern**: `app.component.method()` for clear, maintainable test code

### Vue Component Testability

- **Required test IDs**: Add `data-testid` attributes to all interactive elements
- **ARIA roles**: Include semantic roles (`main`, `document`, `alert`, `status`) for accessibility and testing
- **Accessibility attributes**: Use `aria-label`, `aria-expanded` for better semantic targeting
- **Data attributes**: Use `data-document-number` for test synchronization with dynamic content

### Playwright Best Practices

- **Semantic locators preferred**: `getByTestId()` > `getByRole()` > `getByText()` > `locator()` (last resort)
- **Screenshot strategy**: Target specific elements (`getByTestId('document')`) not full pages
- **Test reliability**: Wait for specific data attributes rather than generic visibility
- **Browser configuration**: Use Chromium-only for faster, consistent CI execution

### CI/CD Requirements

- **Build before E2E**: Always run `vp run build` before Playwright tests in CI
- **Lint configuration**: Disable `playwright/expect-expect` rule for Page Object pattern
- **Artifact handling**: Upload test results and screenshots on failure for debugging

### Mock Strategy

```typescript
// Preferred: DOM event-based mocking (realistic, no test pollution)
await page.evaluate((data) => {
  document.dispatchEvent(new CustomEvent("mockgristrecord", { detail: data }));
}, mockData);

// Avoid: Injection-based mocking (invasive, breaks encapsulation)
```

## CSS Architecture

### BEM Methodology

The project uses BEM (Block Element Modifier) naming convention instead of modern approaches like CSS Modules or CSS-in-JS to enable **user customization**. Users can apply custom CSS through the settings panel to modify document appearance.

**Why BEM over CSS Modules/CSS-in-JS:**

- **Predictable class names**: Users can target `.document__header` or `.items-table__row` reliably
- **No build-time obfuscation**: Class names remain human-readable in production
- **Custom CSS compatibility**: Users can write CSS overrides without knowing internal implementation
- **Documentation friendly**: Class structure is self-documenting for customization guides

The project consistently uses BEM naming convention for CSS classes:

- **Block**: Component name (e.g., `action-buttons`, `items-table`, `app`)
- **Element**: Part of the block (e.g., `action-buttons__button`, `items-table__header`)
- **Modifier**: Variation or state (e.g., `action-buttons__button--primary`, `app__settings--open`)

**Examples:**

```html
<!-- Block -->
<div class="action-buttons">
  <!-- Element -->
  <button class="action-buttons__button action-buttons__button--primary">
  <select class="action-buttons__select">
</div>

<!-- Block with state modifier -->
<div class="app__settings app__settings--open">
  <!-- Elements -->
  <div class="app__settings-header">
  <div class="app__settings-content">
</div>
```

**Guidelines:**

- Use double underscores (`__`) for elements
- Use double hyphens (`--`) for modifiers
- Keep block names semantic to the Vue component
- Avoid deeply nested BEM structures (max 2-3 levels)
- Combine with `data-testid` attributes for testing (never use BEM classes in tests)

**User Customization Example:**
Users can apply custom CSS through the settings panel:

```css
/* Change document font */
.document {
  --font-family: "Comic Sans MS", Itim, sans-serif;
}

/* Customize table headers */
.items-table__header {
  background-color: #f0f8ff;
  font-weight: bold;
}

/* Style specific elements */
.document__header {
  border-bottom: 2px solid #333;
}
```

## Development Notes

- Uses pnpm as the package manager selected through Vite+ (check `pnpm-lock.yaml` exists)
- Follows Vue 3 Composition API patterns with TypeScript
- All components should use `<script setup lang="ts">` syntax
- Vite+ lint and format settings are configured in `vite.config.ts`
- Vite+ handles module resolution with `@/*` aliases for src directory
