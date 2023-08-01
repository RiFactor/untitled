Clear unused Storybook stories

## Project

- Absolute referencing (import statements)
- Add dark mode
- Routing
  - Home Page
  - Layout
  - Error page (element)

### Refactor:

- Tailwind classes
- Components

## Calculator:

### Fix

1960 / 3 => truncate decimal places to display within 8-digit limit

## Styling:

- add shadow on buttons
  ## Features:
- on hover & on click styling / animation
- add bonus '.' button
- C for operation: just don't bother: just replace or retain when clicked
- accessibility - keyboard use
  ## Ri-factor:
- button component
- extract reusable functions

// EdgeCase: enter number, then operator and clear operator w/o selecting a new operator: enter number should clear prev number
// EdgeCase: above - iPhone will just remember the operator if a new one isn't provided
// OR just overwrite operator, don't need clear function for it! :)
