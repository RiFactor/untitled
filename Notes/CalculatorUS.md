### Constraints

You may not use the eval() function to execute calculations

### User Stories

- [x] User can see a display showing the current number entered or the result of the last operation.
- [x] User can see an entry pad containing buttons for the digits 0-9, operations: '+', '-', '/', and '=', a 'C' button (for clear), and an 'AC' button (for clear all).
  - Make it a dynamic C / AC button that wen clicked twice will clear all (easy)
- [x] User can enter numbers as sequences up to 8 digits long by clicking on digits in the entry pad. Entry of any digits more than 8 will be ignored.
- [] User can click on an operation button to display the result of that operation on:
  the result of the preceding operation and the last number entered OR
  the last two numbers entered OR
  the last number entered
- [] User can click the 'C' button to clear the last number or the last operation. If the users last entry was an operation the display will be updated to the value that preceded it.
- [x] User can click the 'AC' button to clear all internal work areas and to set the display to 0.
- [x] User can see 'ERR' displayed if any operation would exceed the 8 digit maximum.

### Bonus features

- [x] User can click a '+/-' button to change the sign of the number that is currently displayed.
- [] User can see a decimal point ('.') button on the entry pad to that allows floating point numbers up to 3 places to be entered and operations to be carried out to the maximum number of decimal places entered for any one number.

## Calculator:

Qs:

- Make numbers an enum?
- C / AC are being dispatched as separate actions

### Notes

use window listener b/c not a specific input field
clean up listener in use effect

| Revisions                                                                                | Category  | Type                |
| ---------------------------------------------------------------------------------------- | --------- | ------------------- |
| on hover & on click styling / animation                                                  |           |                     |
| C for operation: just don't bother: just replace or retain when clicked                  |           |                     |
| [] add shadow on buttons                                                                 | Button    | Styling             |
| on hover & on click styling / animation                                                  | Button    | Code                |
| create reuable button component                                                          | BUtton    | Ri-factor           |
| colour contrast in dark + light mode - TW styling                                        | Dark Mode | Code                |
| help w/ Chakra switch Chrome WAVE tool error                                             | Dark Mode | Accesibility        |
| Replace Dark Mode text w/ sun and moon symbols                                           | Styling   |                     |
| Add Test for Reducer                                                                     | Reducer   | Tests               |
| Break up Reducer                                                                         | Reducer   | Advanced Code       |
| Pressing equals should remember last operation and continue e.g. 56 + 2 = 58 => 60 => 62 | Logic     | Extra Functionality |
| Add decimal and functionality                                                            | Logic     | Bonus Feature       |

### Done:

- [x]accessibility - keyboard use
- [x] 1960 / 3 => truncate decimal places to display within 8-digit limit

// EdgeCase: enter number, then operator and clear operator w/o selecting a new operator: enter number should clear prev number
// EdgeCase: above - iPhone will just remember the operator if a new one isn't provided
// OR just overwrite operator, don't need clear function for it! :)

### Tips:

- Switch-case
  - If no change: Always return at least the default state, returning void will cause a crash so don’t do that
  - Should always have an initial state of {}, instead of declaring {} in multiple places, reference same initial empty state multiple times
  - Shallow copy state intially and reference this
  - Shallow copy state when returning also
  - Remember to reference / conditionally check / use etc the shallow copied state throughout o/w will be comparing diff states
- Don’t add random elements to reducer e.g. dice or date object (bc random)
- Special characters can lead to errors, better to use words (calculator symbols)
- Specify types!
- Make items optional: easier for empty object
- Should separate render from state logic :)
- FYI: typeTAction adds pipe at the start for multiple Ors
- LHS of enum is used for calculations, RHS for display

- Don't create chains of ternary operators as this becomes difficult to read, better to write if...else statements
  - If poss turn if...else statements into switch-case statements
  - but need to comparing a single item to do so, o/w leave as else-if statement
