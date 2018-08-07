var inquirer = require("inquirer");

var mysql = require("mysql");

var Table = require("cli-table2");

var displayTable = require("./displayTable.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
})

function displayForUser() {
    var display = new displayTable ();
    connection.query("SELECT * FROM products", function(err, results){
        display.displayInventory(results);
    })
    itemPurchase();
};

function itemPurchase() {
    console.log("\n");
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Please enter the ID of the Item you would like to purchase"
    },{
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
            if(isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answers) {
        connection.query("SELECT * FROM products WHERE ?", {id: answers.item}, function(err, results){
            if (err) throw err;
            console.log("\nYou would like to purchase " + answers.quantity + " " + results[0].product_name + " for $" + results[0].price + " each");
            if (results[0].stock < answers.quantity){
                console.log("We do not have enough of that item in stock");
                itemPurchase();
            }
            else {
                var purchase = results[0].price * answers.quantity
                console.log("Order placed. Your total is $" + purchase);
                var newStock = results[0].stock - answers.quantity;
                connection.query("UPDATE products SET stock= ? WHERE id= ?", [newStock, answers.item], function(err, results){
                    if (err) throw err;
                    restart();
                });
            }
        });
    });
}

function restart() {
    inquirer.prompt([{
        name: "restart",
        type: "list",
        message: "would you like to continue shopping?",
        choices: ["YES", "NO"]
    }]).then(function(answer) {
        switch (answer.restart){
            case "YES":
            displayForUser();
            break;

            case "NO":
            connection.end();
            break;
        }
    });
};
restart();