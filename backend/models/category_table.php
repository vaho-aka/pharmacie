<?php

require_once '../middleware/ErrorMiddleware.php';
require_once '../config/Database.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $database = new Database();
  $db = $database->connect();

  // SQL query to create the categories table
  $query = "CREATE TABLE IF NOT EXISTS categories (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )";

  // Execute the query
  $db->exec($query);

  echo "Table 'categories' created successfully\n";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}

// Close the connection
$db = null;
