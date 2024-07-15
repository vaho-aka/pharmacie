<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/Product.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $database = new Database();
  $db = $database->connect();

  $product = new Product($db);

  // Product query
  $result = $product->read();

  // Get row count
  $num = $result->rowCount();

  if ($num > 0) {
    $product_arr = array();
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

      $product_arr[] = $product_item;
    }

    // Turn to JSON & output
    echo json_encode($product_arr);
  } else {
    throw new NotFoundException('No Products Found');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
