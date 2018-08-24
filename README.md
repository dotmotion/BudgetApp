# BudgetApp

Budget application built with JavaSript

## To-Do list:

#### 1.- Handle Inputs

- [x] Add Event Handler to submit button
- [x] Get input Values
- [x] Add new Item to data structure
- [x] Add new item to UI
- [x] Calculate Budget
- [x] Update the UI

#### 2.- Delete Items

- [x] Add event handler to delete button
- [x] Delete item from data structure
- [x] Delete item from UI
- [x] Recalculate budget and update UI

#### 3.- UI / UX changes

- [x] Calculate and update percentages on UI
- [x] Number Formatting
- [x] Display current month and year on UI
- [x] UX changes

## [JS Build LOG]

#### [8/19]

- started project with HTML and CSS skeleton

- implemented the model pattern on the base of the application:

  - built the 3 main controllers for the application, each with their own purpose
  - [Budget Controller | UI Controller | Global Controller]

- DOMstrings data object to store CSS values for querySelectors and eventListeners. reusable and clean code in case we change the CSS or want to use this code elswhere

- created init function to fire the eventListeners (start the app) and make sure the controllers only ave functoins in them, no loose variables or eventListeners lurking at the bottom

- created function controllers and a proper data structure to accept and store all expenses and incomes, as well as their corresponding totals

- created function to add a new item into the data object

- created function to push new item into the DOM as an HTML string

#### [8/20]

- created function to clear the input fields after a new item is entered

- converted value field into number on the data object (for future budget calculations)

- added conditionals to prevent false inputs

- started calculating budget and percentage

- updated budget, percentage and totals on the UI

- all values on the UI are reset after application load

#### [8/21]

- added functionality to delete items from UI and data structure

### [8/22]

- added functionality to calculate, update and show the percentages

- added method to format the numbers on the UI

- got date (month & year) and updated them on the UI

- edited UX to change color depending on the selected type
