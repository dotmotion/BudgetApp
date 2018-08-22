# BudgetApp

Budget application built with JavaSript

## [LOG]

### [8/19]

- started project with HTML and CSS skeleton

- implemented the model pattern on the base of the application:

  - built the 3 main controllers for the application, each with their own purpose
  - [Budget Controller | UI Controller | Global Controller]

- DOMstrings data object to store CSS values for querySelectors and eventListeners. reusable and clean code in case we change the CSS or want to use this code elswhere

- created init function to fire the eventListeners (start the app) and make sure the controllers only ave functoins in them, no loose variables or eventListeners lurking at the bottom

- created function controllers and a proper data structure to accept and store all expenses and incomes, as well as their corresponding totals

- created function to add a new item into the data object

- created function to push new item into the DOM as an HTML string

#[8/20]

- created function to clear the input fields after a new item is entered

- converted value field into number on the data object (for future budget calculations)

- added conditionals to prevent false inputs

- started calculating budget and percentage

- updated budget, percentage and totals on the UI

- all values on the UI are reset after application load

#[8/21]

- added functionality to delete items from UI and data structure
