<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/User.php';

// Get the JSON data from the request body
$jsonData = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($jsonData, true);

// Check if JSON decoding was successful
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
  die(json_encode(['message' => 'Invalid JSON data']));
}

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$user = new User($db);

// Check if email and password are provided
if (!isset($data['email']) || !isset($data['password'])) {
  die(json_encode(['message' => 'Email and password are required']));
}

$user->email = $data['email'];
$user->password = $data['password'];

// Attempt login
if ($user->login()) {
  // Login successful
  echo json_encode([
    'message' => 'Login successful',
    'user' => [
      'id' => $user->id,
      'email' => $user->email,
      'username' => $user->username,
      'createdAt' => $user->created_at,
      'isAdmin' => $user->is_admin,
    ]
  ]);
} else {
  // Login failed
  echo json_encode(['message' => 'Login failed. Invalid email or password.']);
}
