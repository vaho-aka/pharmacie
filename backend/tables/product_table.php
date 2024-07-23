<?php

require_once '../middleware/ErrorMiddleware.php';
require_once '../config/Database.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $database = new Database();
  $db = $database->connect();

  // SQL query to create the products table
  $query = "CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category_name VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        count_in_stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        on_sale BOOLEAN NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    )";

  // Execute the query
  $db->exec($query);

  echo "Table 'products' created successfully \n";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}

// Close the connection
$db = null;
