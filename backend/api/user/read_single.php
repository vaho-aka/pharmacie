<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';


ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a GET request
  if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    throw new InvalidArgumentException('Only GET requests are allowed');
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
