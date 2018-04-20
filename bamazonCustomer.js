const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

function availableProducts() {
  console.log("\n Here are the items available for purchase: \n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Loop all results
    console.table(res);
    connection.end();
  });
}

// availableProducts();

function Order(name, productId, quantity) {
  this.name = name;
  this.productId = productId;
  this.quantity = quantity;
  //creates printInfo method and applies to all Order objects
  this.printInfo = function() {
    console.log(
      "Customer, " +
        this.name +
        ", has placed an order for " +
        this.quantity +
        " units of " +
        "Product ID# " +
        this.productId
    );
  };
}

var answerArr = [];

//runs inquirer and asks user their name for the order, the product they wish to order and the quantity
inquirer
  .prompt([
    {
      name: "name",
      message: "What is your name?"
    },
    {
      name: "productId",
      message: "What is the ID of the product you would like to buy?"
    },
    {
      name: "quantity",
      message: "How many units would you like to buy?"
    }
  ])
  .then(function(answers) {
    var newOrder = new Order(answers.name, answers.productId, answers.quantity);
    console.log(newOrder);
    answerArr.push(newOrder);
    console.log(answerArr);
    newOrder.printInfo();
  });

//push answers into an array!
//pull print info out of the constructor and make it it's own function so it doesn't print in the pushed array??

// //!! instead of answers and this, use array that answers are pushed to?
// function checkInventory() {
//     if (answers.quantity > this.inventory) {
//         console.log("Insufficient quantity!");
//     }
//     else {
//         console.log("Order processing")
//     }
// };
