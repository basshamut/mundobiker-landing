# Spec Delta

## Purpose

Defines the cyberpunk motion language, its performance limits and its accessible degradation for sensitive users and low-power devices.

## ADDED Requirements

### Requirement: CSS-driven motion

Flicker, glitch, rain, scanlines, neon ignition, marquee, tilt and animated borders SHALL be implemented with CSS transforms and opacity where possible. Continuous animation of large blurs or shadows MUST be avoided.

#### Scenario: Animated properties

- **WHEN** the effects are reviewed
- **THEN** continuous effects animate transform or opacity rather than large blur or shadow values

### Requirement: Photosensitivity safety

No element SHALL flash more than three times per second. Neon flicker MUST be smooth and irregular, never stroboscopic.

#### Scenario: Flash rate

- **WHEN** flicker keyframes are measured
- **THEN** no element exceeds three flashes in any one-second window

### Requirement: Reduced motion

With `prefers-reduced-motion: reduce`, glitch, flicker, rain, parallax, marquee movement, loader animation and the custom cursor SHALL be disabled. Neons MUST remain visible and static.

#### Scenario: Static neon state

- **WHEN** the visitor prefers reduced motion
- **THEN** the page shows no glitch, rain, parallax or moving marquee, and the neons stay lit

### Requirement: Mobile effect reduction

On mobile, the page SHALL use fewer rain layers, no parallax, no custom cursor and no tilt, with fewer glow layers where needed for performance.

#### Scenario: Mobile rendering

- **WHEN** the page is loaded on a mobile viewport
- **THEN** parallax, tilt and the custom cursor are absent

### Requirement: Offscreen animation pause

Infinite animations SHALL pause when their element leaves the viewport.

#### Scenario: Scrolled out of view

- **WHEN** an animated element leaves the viewport
- **THEN** its animation pauses and resumes when it returns

### Requirement: Non-blocking loader

The terminal loader SHALL last at most two seconds, be skippable, and MUST NOT hide content when JavaScript fails or is disabled.

#### Scenario: Loader failure

- **WHEN** JavaScript is disabled or fails
- **THEN** the page content is visible without waiting for the loader

### Requirement: Custom cursor additive

The custom cursor SHALL appear only on fine pointers and MUST augment, not replace, the native cursor. It MUST be disabled under reduced motion.

#### Scenario: Native cursor preserved

- **WHEN** the custom cursor is active
- **THEN** the native pointer remains available and usable

### Requirement: Blackout easter egg

The Konami code or five logo activations SHALL toggle a blackout mode. It MUST be reversible and MUST NOT hide essential information or block interaction.

#### Scenario: Toggle blackout

- **WHEN** the visitor enters the sequence or activates the logo five times
- **THEN** the blackout mode toggles and all content remains readable and operable
