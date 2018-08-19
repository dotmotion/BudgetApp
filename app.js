// BUDGET CONTROLLER
var budgetController = (() => {
  // some code
})();

// UI CONTROLLER
var UIController = (() => {
  // some code

  return {
    getinput: () => {
      return {
        type: document.querySelector(".add__type").value, // 'inc' || 'exp'
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value
      };
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = ((budgetCtrl, UICtrl) => {
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
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
  document.addEventListener("keypress", e => {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
