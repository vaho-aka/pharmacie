<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  // Get the JSON data from the request body
  $jsonData = file_get_contents('php://input');
  $data = json_decode($jsonData, true);

  if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    throw new InvalidArgumentException('Invalid JSON data');
  }

  // Validate required fields
  if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
    throw new InvalidArgumentException('Username, email, and password are required');
  }

  // Validate email format
  if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    throw new InvalidArgumentException('Invalid email format');
  }

  // Validate password strength (you can adjust these requirements)
  if (strlen($data['password']) < 8) {
    throw new InvalidArgumentException('Password must be at least 8 characters long');
  }

  $database = new Database();
  $db = $database->connect();

  $user = new User($db);

  // Set user properties
  $user->username = $data['username'];
  $user->email = $data['email'];
  $user->password = $data['password'];

  // Attempt to sign up the user
  if ($user->sign_up()) {
    http_response_code(201);
    echo json_encode(['message' => 'User registered successfully']);
  } else {
    throw new InvalidArgumentException('Email already in use');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
