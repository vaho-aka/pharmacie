<?php

require_once '../middleware/ErrorMiddleware.php';
require_once '../config/Database.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $database = new Database();
  $db = $database->connect();

  $query = "CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        is_admin TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

  // Execute the query
  $db->exec($query);

  echo "Table 'users' created successfully\n";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}

// Close the connection
$db = null;
