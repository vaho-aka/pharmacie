<?php
class User
{
  private $conn;
  private $table = 'users';

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

  // Get User
  public function login()
  {
    // Create query
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind email
    $stmt->bindParam(':email', $this->email);

    // Execute query
    $stmt->execute();

    // Fetch the row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists and verify password
    if ($row) {
      if ($this->password === $row['password']) {
        $this->id = $row['user_id'];
        $this->email = $row['email'];
        $this->username = $row['username'];
        $this->is_admin = $row['is_admin'];
        $this->created_at = $row['created_at'];
        return true;
      }
      // User not found or wrong password
      return false;
    }
  }
}
