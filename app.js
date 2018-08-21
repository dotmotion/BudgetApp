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

  var calculateTotal = type => {
    var sum = 0;
    data.allItems[type].forEach(cur => {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
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

    calculateBudget: () => {
      // calculate total income & expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the budget: incume - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate percentage of income spent (only if there's income)
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
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
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage"
  };

  return {
    getinput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // 'inc' || 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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

    displayBudget: obj => {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        obj.totalExp;
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
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

  var updateBudget = () => {
    //1.- Calculate the budget
    budgetCtrl.calculateBudget();
    //2.- Return the Budget
    var budget = budgetCtrl.getBudget();
    //3.- Display budget on UI
    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = () => {
    var input, newItem;

    //1.- Get field input data
    var input = UICtrl.getinput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
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

      //5.- Calculate & update Budget
      updateBudget();
    }
  };

  return {
    init: () => {
      console.log("Application has Started");
      setupEventListeners();
      //Reset values on load
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
    }
  };
})(budgetController, UIController);

controller.init();
