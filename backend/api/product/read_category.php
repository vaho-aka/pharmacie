<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';


ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $_SERVER['REQUEST_METHOD'] === 'GET';

  $database = new Database();
  $db = $database->connect();

  $product = new Product($db);

  // Product query
  $result = $product->read();
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
