<?php
// Headers
header('Access-control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB & connect 
$database = new Database();
$db = $database->connect();

// Instantiate Product objet
$product = new Product($db);

// Product query
$result = $product->read();

// Get row count
$num = $result->rowCount();

// check if any Products
if ($num > 0) {
  // Product array
  $prodcut_arr = array();

  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $product_item = array(
      '_id' => $product_id,
      'name' => $name,
      'price' => $price,
      'desc' => trim($description),
      'imageUrl' => $image_url,
      'categoryId' => $category_id,
      'categoryName' => $category_name,
      'onSale' => $on_sale,
      'countInStock' => $count_in_stock,
    );

    // Push to "data"
    array_push($prodcut_arr, $product_item);
  }

  // Turn to JSON & output
  echo json_encode($prodcut_arr);
} else {
  // No Posts
  echo json_encode(
    array('message' => 'No Posts Found')
  );
}
