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

    $stmt = $this->conn->prepare($query);

    // Execute query
    $stmt->execute();

    return $stmt;
  }

  // GET Product by categories
  public function read_category()
  {
    // Create query
    $query = 'SELECT * FROM ' . $this->table . ' WHERE category_id ';

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

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $this->product_id);
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

  // Create new product
  public function create()
  {
    $query = 'INSERT INTO ' . $this->table . ' 
              SET name = :name, 
                  description = :description, 
                  price = :price, 
                  category_id = :category_id, 
                  on_sale = :on_sale, 
                  image_url = :image_url, 
                  count_in_stock = :count_in_stock';

    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->name = $this->name;
    $this->description = $this->description;
    $this->price = $this->price;
    $this->category_id = $this->category_id;
    $this->on_sale = $this->on_sale;
    $this->image_url = $this->image_url;
    $this->count_in_stock = $this->count_in_stock;

    $stmt->bindParam(
      ':name',
      $this->name
    );
    $stmt->bindParam(':description', $this->description);
    $stmt->bindParam(':price', $this->price);
    $stmt->bindParam(':category_id', $this->category_id);
    $stmt->bindParam(':on_sale', $this->on_sale, PDO::PARAM_BOOL);
    $stmt->bindParam(':image_url', $this->image_url);
    $stmt->bindParam(':count_in_stock', $this->count_in_stock);

    // Execute query
    if ($stmt->execute()) {
      $this->product_id = $this->conn->lastInsertId();
      return true;
    }

    // Print error
    printf("Error: %s.\n", $stmt->error);

    return false;
  }

  // Update product
  public function update()
  {
    $query = 'UPDATE ' . $this->table . '
              SET name = :name, description = :description, price = :price, 
                  category_id = :category_id, on_sale = :on_sale, 
                  image_url = :image_url, count_in_stock = :count_in_stock
              WHERE product_id = :product_id';

    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->name = $this->name;
    $this->description = $this->description;
    $this->price = $this->price;
    $this->category_id = $this->category_id;
    $this->on_sale = $this->on_sale;
    $this->image_url = $this->image_url;
    $this->count_in_stock = $this->count_in_stock;
    $this->product_id = $this->product_id;

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':description', $this->description);
    $stmt->bindParam(':price', $this->price);
    $stmt->bindParam(':category_id', $this->category_id);
    $stmt->bindParam(':on_sale', $this->on_sale);
    $stmt->bindParam(':image_url', $this->image_url);
    $stmt->bindParam(':count_in_stock', $this->count_in_stock);
    $stmt->bindParam(':product_id', $this->product_id);

    if ($stmt->execute()) {
      return true;
    }

    // Print error
    printf("Error: %s.\n", $stmt->error);
    return false;
  }

  // Delete product
  public function delete()
  {
    $query = 'DELETE FROM ' . $this->table . ' WHERE product_id = :product_id';
    $stmt = $this->conn->prepare($query);

    $this->product_id = $this->product_id;

    $stmt->bindParam(':product_id', $this->product_id);

    // Execute query
    if ($stmt->execute()) {
      return true;
    }

    // Print error
    printf("Error: %s.\n", $stmt->error);

    return false;
  }
}
