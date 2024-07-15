<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if ID is set in the URL
  if (!isset($_GET['id'])) {
    throw new InvalidArgumentException('Product ID is required');
  }

  $id = $_GET['id'];

  // Check if category_id is provided
  $category_id = isset($_GET['category_name']) ? $_GET['category_name'] : null;

  $database = new Database();
  $db = $database->connect();

  $product = new Product($db);
  $product->product_id = $id;

  // Get product
  $result = $product->read_single();

  if ($result) {
    // Check if category_id matches, if provided
    if ($category_id !== null && $product->category_name != ucfirst($category_name)) {
      throw new NotFoundException('Product not found.');
    }

    // Create array
    $product_arr = array(
      'id' => $product->product_id,
      'name' => $product->name,
      'description' => $product->description,
      'price' => $product->price,
      'categoryId' => $product->category_id,
      'categoryMame' => $product->category_name,
      'onSale' => $product->on_sale,
      'createdAt' => $product->created_at,
      'imageUrl' => $product->image_url
    );

    echo json_encode($product_arr);
  } else {
    throw new NotFoundException('Product not found');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
