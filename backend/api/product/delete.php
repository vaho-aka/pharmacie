<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a DELETE request
  if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    throw new InvalidArgumentException('Only DELETE requests are allowed');
  }

  // Check if ID is set in the URL
  if (!isset($_GET['id'])) {
    throw new InvalidArgumentException('Product ID is required');
  }

  $id = $_GET['id'];

  $database = new Database();
  $db = $database->connect();

  $product = new Product($db);

  $product->product_id = $id;

  // Delete product
  if ($product->delete()) {
    echo json_encode([
      'message' => 'Product Deleted Successfully',
      'product_id' => $id
    ]);
  } else {
    throw new Exception('Product deletion failed');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}