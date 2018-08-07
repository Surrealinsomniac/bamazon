# BAMAZON

The bamazon app imitates an Amazon like shopping experience. It leverage a command line interface in node linked to a mysql database to hold the inventory of the story,

# mySQL database:

![Alt text](./bamazon_screenshots/bamazon_mysql.png?raw=true "database")

This database hold the product name, deparment name, stock quantity, price, and a product ID,

# node bamazon customer interface:

In bamazonCustomer.js there is an interface for a customer to interact with the database in order to purchase products. This works by:

* First the customer is asked if they would like to shop.

![Alt text](./bamazon_screenshots/customer_firstStep.png?raw=true "first")

* Using a table constructer the app prints all the inventory to the command line.

* The customer is asked to input the ID of the product they would like to but and the quantity

![Alt text](./bamazon_screenshots/customer_secondStep.png?raw=true "second")

* The app then checks to see if there is enough stock of that particular item in the database.

* If there is, it calculates the total cost and places the order

![Alt text](./bamazon_screenshots/customer_thirdStep.png?raw=true "third")


# node bamazon manager interface:

In the bamazonManager.js app there is a manager interface that can:

* First ask you if you would like to continue as manager to begin running the app

![Alt text](./bamazon_screenshots/manager_firstStep.png?raw=true "mFirst")

* Then the app presents the user with several options:

![Alt text](././bamazon_screenshots/manager_secondStep.png?raw=true "mSecond")

The User can then: 

* View Products for sale
* View low Inventory
* Add to Inventory
* Add New Product
* Logout



* View Products for sale

![Alt text](./bamazon_screenshots/manager_viewProd.png?raw=true "view")

This option uses the table constructor to print a table of all the inventory in the database.

* View Low Inventory

![Alt text](./bamazon_screenshots/manager_viewLow.png?raw=true "low")

This option queries the database for all inventory with a stock equal to or lower than 5 and prints them to the command line in a table.

* Add to Inventory

![Alt text](./bamazon_screenshots/manager_add.png?raw=true "add")

This option asked to user for the ID of the product they would like to add stock to, the quantity of stock they would like to add, then prints the new row for that product.

* Add New Product

![Alt text](./bamazon_screenshots/manager_newProd.png?raw=true "new")

This option allows the user to add a new product to the database. It asked for the product name, deparment name,, price, and stock; then it prints the new row to the command line.