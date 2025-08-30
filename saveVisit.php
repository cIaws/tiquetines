<?php
// Configuración del bot de Telegram
define('TELEGRAM_BOT_TOKEN', '7506439293:AAGmU5W7r5M4niMIfuom6OJFHkQE0eqN5Ss');
define('TELEGRAM_CHAT_ID', '-47007882724');

// Obtiene la IP del cliente
$ipAddress = $_SERVER['REMOTE_ADDR'];

$url = "https://api.telegram.org/bot" . TELEGRAM_BOT_TOKEN . "/sendMessage";
    
    // Datos para la solicitud POST
    $postData = [
        'chat_id' => TELEGRAM_CHAT_ID,
        'text' => "<b>Nueva Visita</b>\nIP: <code>$ipAddress</code>",
        'parse_mode' => 'HTML' // Activamos el modo Markdown para formatear el texto
    ];

    // Usamos cURL para enviar el mensaje
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    $response = curl_exec($ch);
    curl_close($ch);

    // Verificamos si se envió correctamente el mensaje
    if ($response) {
        // Enviar respuesta de éxito al cliente
        echo json_encode(['status' => 'success']);
    } else {
        // Si hubo un error
        echo json_encode(['status' => 'error']);
    }
