<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';



ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a UPDATE request
  if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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


  $user->read_single();

  // Update user properties
  if (isset($data['username'])) $user->username = $data['username'];
  if (isset($data['email'])) $user->email = $data['email'];
  if (isset($data['password'])) $user->password = password_hash($data['password'], PASSWORD_DEFAULT);
  if (isset($data['isAdmin'])) $user->is_admin = $data['isAdmin'];

  $user->update();

  echo json_encode([
    'id' => $user->user_id,
    'email' => $user->email,
    'username' => $user->username,
    'createdAt' => $user->created_at,
    'isAdmin' => $user->is_admin,
  ]);
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
