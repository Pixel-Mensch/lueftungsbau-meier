<?php
// Einfaches Kontaktformular-Skript für Lüftungsbau Meier

// Session starten für CSRF-Schutz und Rate Limiting
session_start();

// Ich beende das Script sofort, falls es kein POST-Request ist
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Ungültige Anfrage.";
    exit;
}

// CSRF-Token Validierung
if (!isset($_POST['csrf_token']) || !isset($_SESSION['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    http_response_code(403);
    echo "Sicherheitstoken ungültig. Bitte laden Sie die Seite neu.";
    exit;
}

// Rate Limiting: Max. 3 Anfragen pro 10 Minuten
if (!isset($_SESSION['last_submit_times'])) {
    $_SESSION['last_submit_times'] = [];
}
$now = time();
$_SESSION['last_submit_times'] = array_filter($_SESSION['last_submit_times'], function($time) use ($now) {
    return $time > ($now - 600); // Letzte 10 Minuten
});
if (count($_SESSION['last_submit_times']) >= 3) {
    http_response_code(429);
    echo "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.";
    exit;
}
$_SESSION['last_submit_times'][] = $now;

// Honeypot: wenn dieses Feld ausgefüllt ist, breche ich ab (Spam)
if (!empty($_POST['firma'] ?? '')) {
    echo "Anfrage wurde verworfen.";
    exit;
}

// Ich hole die Felder aus dem Formular
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Einfache Plausibilitätsprüfung
if ($name === '' || $email === '' || $message === '') {
    echo "Bitte füllen Sie alle Pflichtfelder aus.";
    exit;
}

// Ich verhindere Header-Injection in Name/Email
if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
    echo "Ungültige Eingabe.";
    exit;
}

// Ich prüfe die E-Mail-Adresse
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    exit;
}

// Empfänger-Adresse anpassen
$empfaenger = "info@lueftungsbau-meier.de";

// Betreff der Mail
$betreff = "Neue Kontaktanfrage über die Website Lüftungsbau Meier";

// Ich baue den Mail-Text zusammen
$nachricht =
    "Es ist eine neue Anfrage über das Kontaktformular eingegangen:\n\n" .
    "Name: " . $name . "\n" .
    "E-Mail: " . $email . "\n\n" .
    "Nachricht:\n" . $message . "\n\n" .
    "Gesendet am: " . date('d.m.Y H:i');

// Header: From- und Reply-To-Adresse
$header   = "From: Website Lüftungsbau Meier <info@lueftungsbau-meier.de>\r\n";
$header  .= "Reply-To: " . $email . "\r\n";
$header  .= "X-Mailer: PHP/" . phpversion();

// Ich versuche, die Mail zu senden
if (@mail($empfaenger, $betreff, $nachricht, $header)) {
    // Einfache Bestätigungsseite
    echo "<!DOCTYPE html>
<html lang=\"de\">
<head>
<meta charset=\"UTF-8\">
<title>Nachricht gesendet</title>
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
</head>
<body>
<h1>Vielen Dank für Ihre Nachricht.</h1>
<p>Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.</p>
<p><a href=\"/\">Zurück zur Startseite</a></p>
</body>
</html>";
} else {
    echo "<!DOCTYPE html>
<html lang=\"de\">
<head>
<meta charset=\"UTF-8\">
<title>Fehler beim Versand</title>
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
</head>
<body>
<h1>Es ist ein Fehler aufgetreten.</h1>
<p>Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.</p>
<p><a href=\"/\">Zurück zur Startseite</a></p>
</body>
</html>";
}
?>
