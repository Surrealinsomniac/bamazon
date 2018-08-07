DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("dog leash", "pets", 20, 50);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("fan", "home", 15, 60);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("iphone charger", "electronics", 40, 30);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("dog bed", "pets", 100, 45);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("book shelf", "home", 150, 20);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("screen protector", "electronics", 40, 3);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("car radio", "automotive", 300, 25);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("dog bone", "pets", 10, 40);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("lamp", "home", 20, 30);
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("windshield wippers", "automotive", 30, 5);

SELECT * FROM products;