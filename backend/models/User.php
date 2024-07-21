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
      $data = $stmt->fetch(PDO::FETCH_ASSOC);

      if (password_verify($this->password, $data['password'])) {
        $this->user_id = $data['user_id'];
        $this->username = $data['username'];
        $this->created_at = $data['created_at'];
        $this->is_admin = $data['is_admin'];

        return true;
      }
    }

    // Either email not found or password incorrect
    return false;
  }

  // Create new user
  public function sign_up()
  {
    $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':email', $this->email);
    $stmt->execute();

    // Fetch if the email is already in use
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($data) return false;

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

      $query = 'SELECT * FROM ' . $this->table . ' WHERE user_id = :user_id';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':user_id', $user_id);
      $stmt->execute();

      $newUser = $stmt->fetch(PDO::FETCH_ASSOC);

      $this->user_id = $newUser['user_id'];
      $this->is_admin = $newUser['is_admin'];
      $this->created_at = $newUser['created_at'];

      return true;
    }

    return false;
  }

  // Get all users
  public function read()
  {
    $query = 'SELECT * FROM ' . $this->table;

    $stmt = $this->conn->prepare($query);
    $stmt->execute();

    return $stmt;
  }

  // Delete user
  public function delete()
  {
    $query = 'DELETE FROM ' . $this->table . ' WHERE user_id = :user_id';

    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->user_id = $this->user_id;
    $stmt->bindParam(':user_id', $this->user_id);

    // Execute query
    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  // Read single user
  public function read_single()
  {
    $query = 'SELECT * FROM ' . $this->table . ' WHERE user_id = :user_id LIMIT 0,1';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':user_id', $this->user_id);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
      $this->username = $row['username'];
      $this->email = $row['email'];
      $this->is_admin = $row['is_admin'];
      $this->created_at = $row['created_at'];
      $this->password = $row['password'];

      return true;
    }

    return false;
  }

  // Update user
  public function update()
  {
    $query = 'UPDATE ' . $this->table . '
                  SET username = :username,
                      email = :email,
                      password = :password,
                      is_admin = :is_admin
                  WHERE user_id = :user_id';

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':is_admin', $this->is_admin);
    $stmt->bindParam(':user_id', $this->user_id);

    // Execute query
    if ($stmt->execute()) {
      return true;
    }

    // Print error if something goes wrong
    printf("Error: %s.\n", $stmt->error);

    return false;
  }
}