// BUDGET CONTROLLER
var budgetController = (() => {
  // some code
})();

// UI CONTROLLER
var UIController = (() => {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getinput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // 'inc' || 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = ((budgetCtrl, UICtrl) => {
  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = () => {
    //1.- Get field input data
    var input = UICtrl.getinput();
    console.log(input);
    //2.- Add item to budget controller
    //
    //3.- Add item to the UI
    //
    //4.- Calculate the budget
    //
    //5.- Display budget on UI
  };
  // QUERY SELECTORS
  document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
  document.addEventListener("keypress", e => {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
