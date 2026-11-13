# Spec Delta

## Purpose

Defines the narrative structure, order and content of the single page, from the fixed header to the footer.

## ADDED Requirements

### Requirement: Section order and anchor navigation

The page SHALL present the brief's sections in order: header, hero, services, process, gallery, testimonials, contact and footer. The header MUST link to each section by anchor and remain usable on mobile.

#### Scenario: Anchor navigation

- **WHEN** a visitor activates a header link
- **THEN** the page scrolls to the matching section without the fixed header covering it

#### Scenario: Mobile navigation

- **WHEN** the header is used on a small screen
- **THEN** the navigation is operable by touch and keyboard

### Requirement: Hero content

The hero SHALL contain the single `h1` with the brief's headline, a subtitle and two primary actions (WhatsApp and "Ver servicios"). City, rain and scanline layers MUST be decorative.

#### Scenario: Hero structure

- **WHEN** the hero renders
- **THEN** it contains one `h1`, the two actions and decorative background layers hidden from assistive technology

### Requirement: Transition marquee

A marquee SHALL display the sequence "POLARIZADO // WRAP // LUCES // SONIDO // ESTÉTICA" between the hero and the services. Under reduced motion it MUST render as static text.

#### Scenario: Reduced-motion marquee

- **WHEN** the visitor prefers reduced motion
- **THEN** the marquee text is visible but does not move

### Requirement: Process timeline

The page SHALL present four ordered steps: Cotiza, Diseño, Instalación and Entrega, each with a label and short description. Sequence illumination MUST be disabled under reduced motion.

#### Scenario: Four steps

- **WHEN** the process section renders
- **THEN** it shows the four steps in the brief's order

### Requirement: Gallery placeholders

The gallery SHALL present a mosaic of labeled image placeholders until real photos exist. Each item MUST have an accessible name, and no placeholder may be presented as real client work.

#### Scenario: No invented portfolio

- **WHEN** real gallery photos are unavailable
- **THEN** the gallery shows visibly marked placeholders, not stock or fabricated work

### Requirement: Honest testimonials

Testimonials SHALL be real and attributable, or visibly marked as sample copy. The page MUST NOT present invented names, quotes or ratings as real customer reviews.

#### Scenario: Sample testimonials

- **WHEN** real testimonials are unavailable
- **THEN** the section shows sample reviews visibly labeled as examples, or is omitted

### Requirement: Contact section structure

The contact section SHALL include the form fields nombre, vehículo, servicio de interés and mensaje, plus location, hours, social links and the floating WhatsApp access point. Missing data MUST appear as placeholders.

#### Scenario: Required fields present

- **WHEN** the contact section renders
- **THEN** all four form fields and the location, hours and social blocks are present

### Requirement: Footer

The footer SHALL include a graffiti signature, credits and the available social links. It MUST NOT include third-party trademarks or characters.

#### Scenario: Original assets

- **WHEN** the footer and graffiti assets are reviewed
- **THEN** all marks and lettering are original

### Requirement: Spanish street tone

All section copy SHALL be in Spanish, short, direct and with attitude, without invented business claims.

#### Scenario: Copy review

- **WHEN** the page copy is reviewed
- **THEN** it is Spanish, contains no fabricated facts and keeps calls to action clear
