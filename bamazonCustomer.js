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


function promptOrder() {
  inquirer
    .prompt([
      {
        name: "productId",
        message: "What is the ID of the product you would like to buy?",
        filter: Number,
      },
      {
        name: "quantity",
        message: "How many units would you like to buy?",
        filter: Number,
      }
    ])
    .then(function(answer) {
      const itemOrdered = parseInt(answer.productId);
      const quantityOrdered = parseInt(answer.quantity);

      console.log(
        "\n You have selected " +
          quantityOrdered +
          " units of item ID: " +
          itemOrdered +
          ". \n"
      );

      connection.query("SELECT * FROM products WHERE ?", {item_id: itemOrdered}, function(
        err,
        res
      ) {
        if (err) throw err;
        // console.log(res[0].stock_quantity);
        if (res.length === 0) {
          console.log(
            "Error: Invalid item ID. Please re-order a valid item ID."
          );
        } else {
          if (quantityOrdered < parseInt(res[0].stock_quantity)) {
            console.log("Your order has been processed and is confirmed.");
          } else {
            console.log(
              "Unfortunately the ordered quantity is not in stock, please re-order at a different quantity.\n"
            );
          }
        }
        connection.end();
      });
    });
}

function showInventory() {
  connection.query('SELECT * FROM products', function (err, res){
    if (err) throw err;
    console.table(res);
    promptOrder();
  })
}

function runOrder() {
  showInventory();
}

runOrder();
