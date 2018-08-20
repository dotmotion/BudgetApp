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
