<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';


ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a UPDATE request
  if ($_SERVER['REQUEST_METHOD'] !== 'UPDATE') {
    throw new InvalidArgumentException('Only UPDATE requests are allowed');
  }


  // Get the JSON data from the request body
  $jsonData = file_get_contents('php://input');
  $data = json_decode($jsonData, true);

  if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    throw new InvalidArgumentException('Invalid JSON data');
  }

  if (!isset($_GET['id'])) {
    throw new InvalidArgumentException('User ID is required');
  }

  $id = $_GET['id'];

  $database = new Database();
  $db = $database->connect();

  $user = new User($db);
  $user->user_id = $id;

  // Fetch current user data
  if (!$user->read_single()) {
    throw new NotFoundException('User not found');
  }

  // Update user properties
  if (isset($data['username'])) $user->username = $data['username'];
  if (isset($data['email'])) {
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
      throw new InvalidArgumentException('Invalid email format');
    }
    $user->email = $data['email'];
  }
  if (isset($data['password'])) {
    if (strlen($data['password']) < 6) {
      throw new InvalidArgumentException('Password must be at least 6 characters long');
    }
    $user->password = password_hash($data['password'], PASSWORD_DEFAULT);
  }
  if (isset($data['is_admin'])) $user->is_admin = $data['is_admin'];

  if ($user->update()) {
    echo json_encode([
      'id' => $user->user_id,
      'email' => $user->email,
      'username' => $user->username,
      'createdAt' => $user->created_at,
      'isAdmin' => $user->is_admin,
    ]);
  } else {
    throw new Exception('User not updated');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
