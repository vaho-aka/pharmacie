<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';


ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $_SERVER['REQUEST_METHOD'] === 'DELETE';

  // Check if ID is set in the URL
  if (!isset($_GET['id'])) {
    throw new InvalidArgumentException('User ID is required');
  }

  $id = $_GET['id'];

  $database = new Database();
  $db = $database->connect();

  $user = new User($db);

  $user->user_id = $id;

  // Delete user
  if ($user->delete()) {
    echo json_encode([
      'message' => 'User Deleted Successfully',
    ]);
  } else {
    throw new Exception('User deletion failed');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
