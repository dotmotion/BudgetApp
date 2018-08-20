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

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: (type, des, val) => {
      var newItem, ID;
      // CREATE NEW ID
      console.log(type, des, val);
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // CREATE NEW ITEM BASED ON THE TYPE 'INC' OR 'EXP'
      if (type === "exp") {
        var newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        var newItem = new Income(ID, des, val);
      }
      // PUSH ITEM INTO DATA STRUCTURE
      data.allItems[type].push(newItem);
      // RETURN THE NEW ELEMENT
      return newItem;
    },

    testing: () => {
      console.log(data);
    }
  };
})();

//
//
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

//
//
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
    var input, newItem;
    //1.- Get field input data
    var input = UICtrl.getinput();
    //2.- Add item to budget controller
    var newItem = budgetCtrl.addItem(
      input.type,
      input.description,
      input.value
    );
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
