<?php
class Product
{
  private $conn;
  private $table = 'products';

  // Product Model Properties
  public $product_id;
  public $category_id;
  public $name;
  public $price;
  public $created_at;
  public
    $count_in_stock;
  public
    $description;
  public $on_sale;
  public $image_url;
  public $category_name;


  // Constructor with DB
  public function __construct($db)
  {
    $this->conn = $db;
  }

  // Get All Products
  public function read()
  {
    // Create query
    $query = 'SELECT 
      c.name as category_name,
      p.product_id,
      p.category_id,
      p.description,
      p.name,
      p.price,
      p.image_url,
      p.on_sale,
      p.count_in_stock,
      p.created_at
    FROM ' . $this->table . ' p
    LEFT JOIN categories c ON p.category_id = c.category_id
    ORDER BY p.created_at DESC';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Execute query
    $stmt->execute();

    return $stmt;
  }

  // GET Product by categories
  public function read_category()
  {
    // Create query
    $query = 'SELECT DISTINCT c.* FROM categories c INNER JOIN ' . $this->table . ' m ON c.category_id = m.category_id WHERE c.name = ?';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind category
    // $stmt->bindParam('1', $this->cate);
  }

  // GET Product by id
  public function read_single()
  {
    // Create query
    $query = 'SELECT 
      c.name as category_name,
      m.product_id,
      m.category_id,
      m.description,
      m.name,
      m.price,
      m.image_url,
      m.on_sale,
      m.count_in_stock,
      m.created_at
    FROM ' . $this->table . ' m
    LEFT JOIN categories c ON m.category_id = c.category_id
    WHERE m.product_id = :id
    LIMIT 0,1';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind category
    $stmt->bindParam(':id', $this->product_id);

    // Execute query
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if the product exist
    if ($row) {
      $this->product_id = $row['product_id'];
      $this->category_id = $row['category_id'];
      $this->name = $row['name'];
      $this->price = $row['price'];
      $this->on_sale = $row['on_sale'];
      $this->created_at =
        $row['created_at'];
      $this->description = $row['description'];
      $this->image_url = $row['image_url'];
      $this->count_in_stock = $row['count_in_stock'];
      $this->category_name = $row['category_name'];

      return true;
    }

    // Product not found or wrong password
    return false;
  }
}