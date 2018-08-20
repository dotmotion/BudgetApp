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
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list"
  };

  return {
    getinput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // 'inc' || 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: (obj, type) => {
      var html, newHtml, element;
      // CREATE HTML STRING WITH PLACEHOLDER TEXT
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-circle-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;

        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-circle-outline"></i></button></div></div></div>';
      }
      // REPLACE PLACEHOLDER TEXT WITH DATA
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      // INSERT HTML INTO THE DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: () => {
      console.log("clearing fields started");
      var fields, fieldsArr;
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // Convert list into array with slice()
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((current, index, array) => {
        current.value = "";
      });
      // Setting focus back to the first field
      fieldsArr[0].focus();
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
    UICtrl.addListItem(newItem, input.type);

    //4.- Clear fields
    UICtrl.clearFields();

    //5.- Calculate the budget
    //

    //6.- Display budget on UI
  };

  return {
    init: () => {
      setupEventListeners();
      console.log("Application has Started");
    }
  };
})(budgetController, UIController);

controller.init();
