<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';


ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a UPDATE request
  if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    throw new InvalidArgumentException('Only UPDATE requests are allowed');
  }


  // Get the JSON data from the request body
  $jsonData = file_get_contents('php://input');
  $data = json_decode($jsonData, true);

  if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    throw new InvalidArgumentException('Invalid JSON data');
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

  // Fetch current product data
  $product->read_single();

  // Update product properties
  if (isset($data['name'])) $product->name = $data['name'];
  if (isset($data['description'])) $product->description = $data['description'];
  if (isset($data['price'])) $product->price = $data['price'];
  if (isset($data['category_id'])) $product->category_id = $data['category_id'];
  if (isset($data['on_sale'])) $product->on_sale = $data['on_sale'];
  if (isset($data['image_url'])) $product->image_url = $data['image_url'];
  if (isset($data['count_in_stock'])) $product->count_in_stock = $data['count_in_stock'];

  if ($product->update()) {
    echo json_encode([
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
    throw new Exception('Product Not Updated');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}