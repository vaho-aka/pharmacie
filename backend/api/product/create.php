<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();


try {
  // Check if it's a POST request
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    throw new InvalidArgumentException('Only POST requests are allowed');
  }


  // Get the JSON data from the request body
  $jsonData = file_get_contents('php://input');
  $data = json_decode($jsonData, true);

  if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    ErrorMiddleware::handleError(new InvalidArgumentException('Invalid JSON data'));
  }

  // Validate required fields
  $required_fields = ['name', 'description', 'price', 'category_id', 'count_in_stock'];
  foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
      throw new InvalidArgumentException("$field is required");
    }
  }

  $database = new Database();
  $db = $database->connect();
  $product = new Product($db);

  // Set product properties
  $product->name = $data['name'];
  $product->description = $data['description'];
  $product->price = $data['price'];
  $product->category_id = $data['category_id'];
  $product->count_in_stock = $data['count_in_stock'];
  $product->on_sale = $data['on_sale'] ?? false;
  $product->image_url = $data['image_url'] ?? null;

  $result = $product->create();

  if ($result) {
    return json_encode([
      '_id' => $product->product_id,
      'name' => $product->name,
      'description' => $product->description,
      'price' => $product->price,
      'categoryId' => $product->category_id,
      'onSale' => $product->on_sale,
      'imageUrl' => $product->image_url,
      'countInStock' => $product->count_in_stock
    ]);
  } else {
    throw new Exception('Product creation failed');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
