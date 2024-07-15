<?php
class User
{
  private $conn;
  private $table = 'users';

  // USER Model Properties
  public $user_id;
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
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email LIMIT 0,1';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $this->email);

    $stmt->execute();

    if ($stmt->rowCount() == 1) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if (password_verify($this->password, $row['password'])) {
        $this->user_id = $row['user_id'];
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
    // Query search if users existed
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':email', $this->email);
    $stmt->execute();

    // Fetch if the email is already in use
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) return false;

    // Hash the password
    $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

    // $query = 'INSERT INTO ' . $this->table . ' (username, email, password) VALUES (:username, :email, :password)';
    $query = "INSERT INTO " . $this->table . " (username, password, email) VALUES (:username, :password, :email)";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':email', $this->email);

    // Execute the query
    if ($stmt->execute()) {
      // Get the last inserted ID
      $user_id = $this->conn->lastInsertId();

      // Retrieve the newly created user information
      $query = 'SELECT * FROM ' . $this->table . ' WHERE user_id = :user_id';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':user_id', $user_id);
      $stmt->execute();

      // Fetch the newly created user info
      $newUser = $stmt->fetch(PDO::FETCH_ASSOC);

      $this->user_id = $newUser['user_id'];
      $this->is_admin = $newUser['is_admin'];
      $this->created_at = $newUser['created_at'];

      return true;
    }

    return false;
  }

  public function read()
  {
    $query = 'SELECT * FROM ' . $this->table;

    $stmt = $this->conn->prepare($query);
    $stmt->execute();

    return $stmt;
  }
}
