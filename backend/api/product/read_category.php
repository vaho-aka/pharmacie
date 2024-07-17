<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a GET request
  if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    throw new InvalidArgumentException('Only GET requests are allowed');
  }


  $database = new Database();
  $db = $database->connect();

  $product = new Product($db);

  // Product query
  $result = $product->read();
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
