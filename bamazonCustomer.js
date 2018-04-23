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
      const item = answer.productId;
      const quantity = answer.quantity;

      console.log(
        "\n You have selected " +
          quantity +
          " units of item ID: " +
          item +
          ". \n"
      );

      connection.query("SELECT * FROM products", { item_id: item }, function(
        err,
        res
      ) {
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "Error: Invalid item ID. Please re-order a valid item ID."
          );
        } else {
          if (quantity > res[0].stock_quantity) {
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
