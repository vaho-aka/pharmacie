<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Check if it's a DELETE request
  if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    throw new InvalidArgumentException('Only DELETE requests are allowed');
  }

  // Get the raw DELETE data
  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData, true);

  // Check if user_id is set in the JSON data
  if (!isset($data['user_id'])) {
    throw new InvalidArgumentException('User ID is required');
  }

  $id = $data['user_id'];

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
