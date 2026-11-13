# Spec Delta

## Purpose

Defines the static, accessible, SEO-ready shell that hosts the single-page landing and the shared design system every section uses.

## ADDED Requirements

### Requirement: Single-page static delivery

The site SHALL be delivered as one static page at the root path, with no server-side rendering. All core content MUST remain readable when JavaScript is unavailable.

#### Scenario: Static production output

- **WHEN** the production build completes
- **THEN** the root page is a static HTML document that serves the full narrative content

#### Scenario: Content without JavaScript

- **WHEN** a visitor loads the page with JavaScript disabled
- **THEN** every section's core text, services, contact data and footer remain visible

### Requirement: Shared design tokens

Color, spacing, typography, glow, layering and motion values SHALL come from a shared token layer. Component styles MUST NOT hardcode palette colors or shadows.

#### Scenario: No hardcoded palette

- **WHEN** component styles are reviewed
- **THEN** color and shadow values reference shared variables rather than literal palette values

### Requirement: Typography roles

The page SHALL use four fixed roles: a display face for headings, a body/UI face, a monospace face for technical labels, and a graffiti face for accents only. Only used weights MUST be loaded, with `font-display: swap` and a real fallback.

#### Scenario: Accent type is not body text

- **WHEN** paragraphs and long reading text are rendered
- **THEN** they use the body face, never the graffiti face

### Requirement: SEO metadata

Every page SHALL declare `lang="es"`, a unique title and meta description that include Mundo Biker, CDMX and the services, plus Open Graph and Twitter Card metadata with a social image.

#### Scenario: Metadata present

- **WHEN** the page head is inspected
- **THEN** it contains the language, title, description, Open Graph and Twitter Card tags

### Requirement: Structured data

The page SHALL embed valid JSON-LD for a local automotive business, generated from the business data, including name, city, phone, hours, social profiles and services.

#### Scenario: JSON-LD matches business data

- **WHEN** the JSON-LD is parsed
- **THEN** its name, locality, telephone, opening hours and services match the single business-data source

### Requirement: Indexability

The site SHALL expose `robots.txt` and a sitemap generated from the configured canonical URL. An unresolved domain placeholder MUST be reported in the build output instead of silently producing an invalid sitemap.

#### Scenario: Placeholder domain is surfaced

- **WHEN** the canonical domain is still a placeholder at build time
- **THEN** the build reports it as a warning and does not publish misleading indexation data

### Requirement: Responsive layout

The layout SHALL be mobile-first and MUST NOT produce horizontal scrolling at 360, 390, 768, 1024 or 1440 px. The fixed header MUST NOT cover anchor destinations.

#### Scenario: No horizontal scroll

- **WHEN** the page is viewed at each target width
- **THEN** content stays within the viewport and no horizontal scrollbar appears

#### Scenario: Anchor offset

- **WHEN** a navigation link scrolls to a section
- **THEN** the section heading is fully visible below the fixed header

### Requirement: Accessibility baseline

The page SHALL use semantic landmarks, exactly one `h1`, visible focus styles, and decorative layers hidden from assistive technology. It MUST respect `prefers-reduced-motion`.

#### Scenario: Keyboard focus

- **WHEN** a visitor navigates with the keyboard
- **THEN** every interactive element shows a visible focus indicator

### Requirement: Performance budget

The page SHALL meet, on mobile, Lighthouse Performance >= 90, Accessibility >= 95, SEO >= 95 and Best Practices >= 95, without UI frameworks or heavy animation libraries. Infinite animations MUST pause offscreen.

#### Scenario: Lighthouse mobile audit

- **WHEN** the production build is audited on a mobile profile
- **THEN** all four scores meet the stated thresholds

### Requirement: Spanish content and honest placeholders

All user-facing copy SHALL be in Spanish with a street tone. Missing business facts MUST appear as visible placeholders and MUST NOT be replaced with invented values.

#### Scenario: Missing business data

- **WHEN** a required business fact has not been supplied
- **THEN** the page shows a visible placeholder and the build reports what is pending
