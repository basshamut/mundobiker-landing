# Spec Delta

## Purpose

Defines how visitors contact Mundo Biker and how a single business-data source drives every conversion point.

## ADDED Requirements

### Requirement: Single business-data source

Business name, city, WhatsApp number, address, hours, social profiles and domain SHALL live in one data source. Every CTA, metadata field and structured-data value MUST read from it.

#### Scenario: Data change propagates

- **WHEN** the WhatsApp number is updated in the business-data source
- **THEN** every WhatsApp link, contact block and structured-data field reflects the new number

### Requirement: WhatsApp link format

Every WhatsApp action SHALL use the `https://wa.me/<number>?text=<encoded message>` format with a context-appropriate prefilled message.

#### Scenario: Valid encoded link

- **WHEN** a WhatsApp action is activated
- **THEN** the resulting URL uses `wa.me` with a URL-encoded message

### Requirement: Floating WhatsApp access

A floating WhatsApp action SHALL remain reachable on every viewport and MUST NOT cover critical content, the footer or safe-area insets on mobile.

#### Scenario: Mobile safe area

- **WHEN** the page is viewed on a notched mobile device
- **THEN** the floating action stays inside the safe area and does not overlap the footer

### Requirement: Contact form validation

The form SHALL require nombre, vehículo, servicio de interés and mensaje. It MUST show clear inline errors, use real labels and correct `autocomplete` values, and MUST NOT send data to an external service without explicit confirmation.

#### Scenario: Empty submit

- **WHEN** the visitor submits the form with required fields empty
- **THEN** each missing field shows a clear inline error and focus moves to the first error

#### Scenario: No silent external send

- **WHEN** the visitor submits a valid form
- **THEN** the data is not transmitted to a third party unless a mechanism has been explicitly chosen

### Requirement: Unresolved contact data

Missing contact facts SHALL render as visible placeholders and MUST NOT be replaced with invented values.

#### Scenario: Missing phone

- **WHEN** the WhatsApp number is not yet supplied
- **THEN** the affected actions show a visible placeholder instead of a fabricated number

### Requirement: Location and hours

The contact area SHALL show the address and hours from the business-data source, plus a directions link or map. A third-party embed, if used, MUST be lazy-loaded and documented.

#### Scenario: Location block

- **WHEN** the contact area renders with real data
- **THEN** the address and hours match the business-data source and a directions action is available

### Requirement: Accessible conversion

CTAs SHALL have accessible names, form errors SHALL be announced to assistive technology, and focus SHALL move to the first invalid field on failed submission.

#### Scenario: Error announcement

- **WHEN** validation fails
- **THEN** the error summary is announced and focus lands on the first invalid field
