// BUDGET CONTROLLER
var budgetController = (() => {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = () => this.percentage;

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

    deleteItem: (type, id) => {
      var index;
      // id = 3
      var ids = data.allItems[type].map(current => current.id);
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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

    calculatePercentages: () => {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(cur => cur.percentage);
      return allPerc;
    },

    getBudget: () => {
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
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var formatNumber = (num, type) => {
    var numSplit, int, dec;
    // get absolute number
    num = Math.abs(num);
    // add exactly 2 decimal numbers (will become a string)
    num = num.toFixed(2);
    //comma separating thousands
    numSplit = num.split(".");
    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); //input 25310, output 25,310
    }

    dec = numSplit[1];

    return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
  };

  var nodeListForEach = (list, callback) => {
    for (i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
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
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-circle-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-circle-outline"></i></button></div></div></div>';
      }
      // REPLACE PLACEHOLDER TEXT WITH DATA
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
      // INSERT HTML INTO THE DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: selectorId => {
      el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
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
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        DOMstrings.expenseLabel
      ).textContent = formatNumber(obj.totalExp, "exp");
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: percentages => {
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // get node list

      nodeListForEach(fields, (current, index) => {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    displayDate: () => {
      var now, year, month, months;

      now = new Date();

      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      month = now.getMonth();

      year = now.getFullYear();

      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month] + " " + year;
    },

    changedType: () => {
      var fields = document.querySelectorAll(
        DOMstrings.inputType
        +"," + DOMstrings.inputDescription
        +"," + DOMstrings.inputValue
      );
      nodeListForEach(fields, cur => {
        cur.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
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

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener('change', UICtrl.changedType);
  };

  var updateBudget = () => {
    //1.- Calculate the budget
    budgetCtrl.calculateBudget();
    //2.- Return the Budget
    var budget = budgetCtrl.getBudget();
    //3.- Display budget on UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = () => {
    //1.- calculate percentages
    budgetCtrl.calculatePercentages();
    //2.- read percentage from budget controller
    var percentages = budgetCtrl.getPercentages();
    //3.- update UI with the new percentages
    UICtrl.displayPercentages(percentages);
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

      //6.- update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = e => {
    var itemID, splitID, ID;
    console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);
    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // inc-1 || exp-1
      splitID = itemID.split("-");
      type = splitID[0];
      id = parseInt(splitID[1]);

      // 1.- delete item from data structure
      budgetCtrl.deleteItem(type, id);

      // 2.- delete item from the UI
      UICtrl.deleteListItem(itemID);
      // 3.- update and show the new budget
      updateBudget();
      //4.- update percentages
      updatePercentages();
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
      UICtrl.displayDate();
    }
  };
})(budgetController, UIController);

controller.init();
