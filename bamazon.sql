DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

	item_id INTEGER(100) NOT NULL AUTO_INCREMENT ,
    
    product_name VARCHAR (100) NOT NULL, 
    
    department_name VARCHAR(100) NOT NULL, 
    
    price DECIMAL(10, 2) NOT NULL , 
    
    stock_quantity INTEGER NOT NULL,
    
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
	("Lemons", "Produce", 0.25, 500),
    ("Limes", "Produce", 0.25, 500),
    ("Oranges", "Produce", 0.35, 500), 
    ("Grapefruit", "Produce", 0.45, 500), 
    ("Pineapple", "Produce", 1.99, 500), 
    ("Citrus Hand Press", "Kitchen", 7.99, 200),
    ("Juicing Recipe Book", "Books", 14.95, 200), 
    ("Power Smoothie Recipes", "Books", 17.95, 200),
    ("Power Juicer", "Kitchen", 299.95, 150), 
    ("Citrus Tea Towels", "Kitchen", 9.99, 150);
    