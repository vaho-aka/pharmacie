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
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $this->email);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if (password_verify($this->password, $row['password'])) {
        $this->id = $row['user_id'];
        $this->username = $row['username'];
        $this->created_at = $row['created_at'];
        $this->is_admin = $row['is_admin'];

        return true;
      }
    }

    // Either email not found or password incorrect
    return false;
  }

  // Create new user
  public function sign_up()
  {
    // Search existed users if the email is already in use
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
    $stmt = $this->conn->prepare($query);
    // Bind email
    $stmt->bindParam(':email', $this->email);
    $stmt->execute();
    // Fetch the row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) return false;

    // Hash the password
    $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

    // Create INSERT query
    $query = 'INSERT INTO ' . $this->table . ' (username, email, password) VALUES (:username, :email, :password)';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':password', $hashedPassword);  // Use the hashed password
    $stmt->execute();
    return true;
  }
}
