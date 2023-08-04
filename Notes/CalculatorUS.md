### Constraints

You may not use the eval() function to execute calculations

### User Stories

- [] User can see a display showing the current number entered or the result of the last operation.
- [] User can see an entry pad containing buttons for the digits 0-9, operations - '+', '-', '/', and '=', a 'C' button (for clear), and an 'AC' button (for clear all).
- [] User can enter numbers as sequences up to 8 digits long by clicking on digits in the entry pad. Entry of any digits more than 8 will be ignored.
- [] User can click on an operation button to display the result of that operation on:
  the result of the preceding operation and the last number entered OR
  the last two numbers entered OR
  the last number entered
- [] User can click the 'C' button to clear the last number or the last operation. If the users last entry was an operation the display will be updated to the value that preceded it.
- [] User can click the 'AC' button to clear all internal work areas and to set the display to 0.
- [] User can see 'ERR' displayed if any operation would exceed the 8 digit maximum.

Bonus features

- [] User can click a '+/-' button to change the sign of the number that is currently displayed.
- [] User can see a decimal point ('.') button on the entry pad to that allows floating point numbers up to 3 places to be entered and operations to be carried out to the maximum number of decimal places entered for any one number.

## Calculator:

### Notes

use window listener b/c not a specific input field
clean up listener in use effect

### Fix

- []1960 / 3 => truncate decimal places to display within 8-digit limit

## Styling:

- [] add shadow on buttons
  ## Extra Features:
- [] on hover & on click styling / animation
- [] C for operation: just don't bother: just replace or retain when clicked
- [] accessibility - keyboard use
  ## Ri-factor:
- []button component
- [] extract reusable functions

// EdgeCase: enter number, then operator and clear operator w/o selecting a new operator: enter number should clear prev number
// EdgeCase: above - iPhone will just remember the operator if a new one isn't provided
// OR just overwrite operator, don't need clear function for it! :)

### Accessiblity

- [] colour contrast in dark + light mode
- [] help w/ Chakra switch Chrome WAVE tool error

### Tips:

Switch-case
Always return default state, returning void will cause a crash so don’t do that
Don’t add random elements to reducer e.g. dice or date object (bc random)
Special characters can lead to errors, better to use words
Can test reducer
~ advanced: can break up reducers

Specify types
Make items optional

Should separate render from state logic

typeTAction adds pipe at the start for multiple Ors

LHS of enum is used for calculations, RHS for display

Should always have an initial state b/c If clearing instead of declaring {} in multiple places, reference multiple initial states

Make numbers an enum?

C / AC are being dispatched as separate actions
