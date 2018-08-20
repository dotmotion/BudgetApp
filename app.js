// BUDGET CONTROLLER
var budgetController = (() => {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
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
  var setupEventListeners = () => {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

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

  return {
    init: () => {
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
