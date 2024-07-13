<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

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
    'id' => $user->id,
    'email' => $user->email,
    'username' => $user->username,
    'createdAt' => $user->created_at,
    'isAdmin' => $user->is_admin,
  ]);
} else {
  // Login failed
  echo json_encode(['message' => 'Login failed. Invalid email or password.']);
}
