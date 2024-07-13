<?php
class Product
{
  private $conn;
  private $table = 'medicines';

  // USER Model Properties
  public $id;
  public $username;
  public $email;
  public $password;
  public $created_at;
  public $is_admin;

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
      p.medicine_id,
      p.category_id,
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

  public function read_category()
  {
    // Create query
    $query = 'SELECT DISTINCT c.* FROM categories c INNER JOIN ' . $this->table . ' m ON c.category_id = m.category_id WHERE c.name = ?';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind category
    // $stmt->bindParam('1', $this->cate);
  }
}
