<?php
class ErrorMiddleware
{
  public static function handleError($e)
  {
    $statusCode = 500;
    $errorMessage = $e ? $e->getMessage() : 'Internal Server Error';

    if ($e instanceof InvalidArgumentException) {
      $statusCode = 400;
      $errorMessage = $e->getMessage();
    } elseif ($e instanceof PDOException) {
      $statusCode = 503;
      $errorMessage = $e ? $e->getMessage() : 'Database error';
    } elseif ($e instanceof UnauthorizedException) {
      $statusCode = 401;
      $errorMessage = $e ? $e->getMessage() : 'Unauthorized';
    } elseif ($e instanceof NotFoundException) {
      $statusCode = 404;
      $errorMessage = $e ? $e->getMessage() : 'Not found';
    }

    http_response_code($statusCode);
    echo json_encode(['error' => $errorMessage]);
    exit();
  }

  public static function setHeaders()
  {
    header("Access-Control-Allow-Origin: http://localhost:4000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
  }


  public static function handleOptions()
  {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(204);
      exit();
    }
  }
}

// Custom exception classes
class UnauthorizedException extends Exception
{
}
class NotFoundException extends Exception
{
}
