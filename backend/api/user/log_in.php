<?php
require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $jsonData = file_get_contents('php://input');
  $data = json_decode($jsonData, true);

  if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    throw new InvalidArgumentException('Invalid JSON data');
  }

  if (!isset($data['email']) || !isset($data['password'])) {
    throw new InvalidArgumentException('Email and password are required');
  }

  $database = new Database();
  $db = $database->connect();

  $user = new User($db);

  $user->email = $data['email'];
  $user->password = $data['password'];

  $loginResult = $user->login();
  if ($loginResult === true) {
    echo json_encode([
      'id' => $user->id,
      'email' => $user->email,
      'username' => $user->username,
      'createdAt' => $user->created_at,
      'isAdmin' => $user->is_admin,
    ]);
  } else {
    throw new UnauthorizedException($loginResult);
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
