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
        message: "What is the ID of the product you would like to buy?"
      },
      {
        name: "quantity",
        message: "How many units would you like to buy?"
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
        if (data.length === 0) {
          console.log(
            "Error: Invalid item ID. Please re-order a valid item ID."
          );
          // availableProducts();
        } else {
          if (quantity > data[0].stock_quantity) {
            console.log("Your order has been processed and is confirmed.");
          } else {
            console.log(
              "Unfortunately the ordered quantity is not in stock, please reorder at a different quantity.\n"
            );
            // availableProducts();
          }
        }
        connection.end();
      });
    });
}

function availableProducts() {
  console.log("\n Here are the items available for purchase: \n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Loop all results
    console.table(res);
    promptOrder();
  });
}

function runOrder() {
  availableProducts();
}

runOrder();
