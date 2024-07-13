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

// GET Id
$product->medicine_id = isset($_GET['id']) ? $_GET['id'] : die('The product doesn\'t exist');

// Get product
$product->read_single();

// Create an Array
$product_arr = array(
  '_id' => $product->medicine_id,
  'categoryName' => $product->category_name,
  'categoryId' => $product->category_id,
  'craetedAt' => $product->created_at,
  'price' => $product->price,
  'countInStokc' => $product->count_in_stock,
  'desc' => $product->description,
  'onSale' => $product->on_sale,
  'imageUrl' => $product->image_url,
  'name' => $product->name,
);

// Turn to JSON & output
echo json_encode($product_arr);
