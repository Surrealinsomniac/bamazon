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

connection.connect(function(err) {
    if(err) throw err;
})

function initPrompt() {
    inquirer.prompt([{
        name: "ask",
        type: "list",
        message: "Would you like to continue as Manager?",
        choices: ["YES", "NO"]
    }]).then(function(answer) {
        switch (answer.ask) {
            case "YES":
            displayMenu();
            break;

            case "NO":
            connection.end();
            break;
        }
    });
};

function displayMenu() {
    inquirer.prompt([{
        name: "managerOptions",
        type: "list",
        message: "Which manager option would you like to preform?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Logout"
        ]
    }]).then(function(answer){
        switch (answer.managerOptions) {
            case "View Products for Sale":
            displayInventory();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case  "Add New Product":
            newProduct();
            break;

            case "Logout":
            console.log("Have a nice day");
            connection.end();
            break;
        }
    });
};

var displayForManager = function(results) {   
    var display = new displayTable();
    display.displayInventory(results);
}

function displayInventory() {
        connection.query("SELECT * FROM products", function(err, results) {
            displayForManager(results);
        })
        displayMenu();
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock <= 5", function(err, results) {
        console.log("\nShowing all products with a stock of 5 or less:");
        displayForManager(results);
    });
    displayMenu();
};

function addInventory() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Enter the ID of the product you wish to add to"
    },{
        name: "quantity",
        type: "input",
        message: "How much would you like to add?",
        validate: function(value){
            if(isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answers){
        connection.query("SELECT * FROM products WHERE ?", {id: answers.item}, function(err, results) {
            var newStock = results[0].stock + parseFloat(answers.quantity);
            connection.query("UPDATE products SET ? WHERE ?", [{stock: newStock}, {id: answers.item}], function(err, result){
                if (err) throw err;
            });
            connection.query("SELECT * FROM products WHERE ?", {id: answers.item}, function(err, results) {
                console.log("Product updated:\n");
                displayForManager(results);
                initPrompt();
            });
        });
    });
};

function newProduct() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Input Product Name: "
    },{
        name: "department",
        type: "input",
        message: "Input Department Name: "
    },{
        name: "price",
        type: "input",
        message: "Input Price"
    },{
        name: "stock",
        type: "input",
        message: "Input Stock"
    }]).then(function(answers){
        connection.query("INSERT INTO products SET?", 
        [{
            product_name: answers.name
        ,
            department_name: answers.department
        ,
            price: answers.price
        ,
            stock: answers.stock
        }], function(err, results) {
            if(err) throw err;
        });
        connection.query("SELECT * FROM products WHERE ?", {product_name: answers.name}, function(err, results){
            if (err) throw err;
            console.log("Product Added");
            displayForManager(results);
            initPrompt();
        });
    });
   
}

initPrompt();