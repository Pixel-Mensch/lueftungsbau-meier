<?php
// CSRF-Token Initialisierung für Session
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['csrf_token'])) {
    $_SESSION['csrf_token'] = $_POST['csrf_token'];
    http_response_code(200);
    echo "OK";
} else {
    http_response_code(400);
}
?>
