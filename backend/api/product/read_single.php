<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';


ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
<<<<<<< HEAD
  $_SERVER['REQUEST_METHOD'] === 'GET';
=======
  // Check if it's a GET request
  if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    throw new InvalidArgumentException('Only GET requests are allowed');
  }

>>>>>>> afd2b72607f1757170ecaf237c6e386c8315984e

  // Check if ID is set in the URL
  if (!isset($_GET['id'])) {
    throw new InvalidArgumentException('Product ID is required');
  }

  $id = $_GET['id'];

  // Check if category_name is provided
  $category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;

  $database = new Database();
  $db = $database->connect();

  $product = new Product($db);
  $product->product_id = $id;

  $result = $product->read_single();

  if ($result) {
    // Check if category_id matches, if provided
    // if ($category_id === null || $product->category_id != ucfirst($category_id)) {
    //   throw new NotFoundException('Product not found.');
    // }

    $product_arr = array(
      '_id' => $product->product_id,
      'name' => $product->name,
      'description' => $product->description,
      'price' => $product->price,
      'categoryId' => $product->category_id,
      'categoryMame' => $product->category_name,
      'onSale' => $product->on_sale,
      'createdAt' => $product->created_at,
      'imageUrl' => $product->image_url,
      'countInStock' => $product->count_in_stock,
    );

    echo json_encode($product_arr);
  } else {
    throw new NotFoundException('Product not found');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}