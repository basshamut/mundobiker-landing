# Spec Delta

## Purpose

Defines the eight services, their individual visual identity and their accessible presentation as the commercial core of the landing.

## ADDED Requirements

### Requirement: Eight services from one source

The landing SHALL present exactly the eight services from the brief: polarizado, película de seguridad, full wrap, calcomanías personalizadas, accesorios para moto y carro, pulido de faros, estética general, iluminación y sonido. Each MUST have a unique identifier, name, short description, SVG icon and assigned neon color.

#### Scenario: Complete catalog

- **WHEN** the services section renders
- **THEN** it shows eight cards, one per brief service, with no duplicates or omissions

#### Scenario: Single source of truth

- **WHEN** a service name, description, icon or color is updated in the data source
- **THEN** the rendered card reflects the change without edits elsewhere

### Requirement: Per-service visual identity

Each card SHALL use its assigned neon color on the icon, border and glow only. The title and description MUST use the readable text tokens.

#### Scenario: Restrained neon

- **WHEN** any service card is rendered
- **THEN** its text uses the body text color and its neon appears only in icon, border or glow

### Requirement: Asymmetric grid

The catalog SHALL use an asymmetric grid with one highlighted card. It MUST collapse to a single column on small screens and MUST NOT cause horizontal scrolling.

#### Scenario: Mobile layout

- **WHEN** the catalog is viewed at 390 px
- **THEN** cards stack in one column and remain fully readable

### Requirement: Accessible card semantics

Each card SHALL expose its service name as a heading and its description as text. Decorative icons MUST be hidden from assistive technology, and no information may depend on color alone.

#### Scenario: Screen reader output

- **WHEN** a screen reader traverses the catalog
- **THEN** it announces each service name followed by its description

### Requirement: Pointer-specific affordance

Tilt and animated borders SHALL appear only on fine pointers. Touch devices MUST receive a static, fully legible card.

#### Scenario: Touch device

- **WHEN** the catalog is used on a touch device
- **THEN** cards render without tilt or hover-dependent effects
