<?php

require_once '../../middleware/ErrorMiddleware.php';
require_once '../../config/Database.php';
require_once '../../models/User.php';

ErrorMiddleware::setHeaders();
ErrorMiddleware::handleOptions();

try {
  $database = new Database();
  $db = $database->connect();

  $user = new User($db);

  $result = $user->read();
  $num = $result->rowCount();

  if ($num > 0) {
    $user_arr = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $user = array(
        'id' => $user_id,
        'username' => $username,
        'email' => $email,
        'createdAt' => $email,
        'isAdmin' => $is_admin,
      );

      $user_arr[] = $user;
    }

    echo json_encode($user_arr);
  } else {
    throw new NotFoundException('No User Found');
  }
} catch (Exception $e) {
  ErrorMiddleware::handleError($e);
}
