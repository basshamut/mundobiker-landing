# Spec Delta

## Purpose

Defines the interactive gallery viewer that lets visitors explore the work.

## ADDED Requirements

### Requirement: Gallery lightbox

Gallery items SHALL open in a lightbox with previous/next navigation, a close control and `Esc` to close. Focus MUST be trapped while open and restored to the trigger on close.

#### Scenario: Escape closes

- **WHEN** the lightbox is open and the visitor presses `Esc`
- **THEN** the lightbox closes and focus returns to the item that opened it

#### Scenario: Focus trap

- **WHEN** the lightbox is open and the visitor tabs
- **THEN** focus stays within the lightbox controls

### Requirement: Graceful degradation

If JavaScript fails or is unavailable, static content MUST remain visible and usable. No interaction may be the only path to essential information.

#### Scenario: JavaScript disabled

- **WHEN** the page runs without JavaScript
- **THEN** the gallery grid remains visible

### Requirement: No hover-only interaction

Every interactive control SHALL be operable without hover, using pointer, touch or keyboard.

#### Scenario: Touch-only device

- **WHEN** a visitor uses a touch-only device
- **THEN** every showcase control remains operable
