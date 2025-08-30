<?php
$config = [
    'token' => 'test',
    'chat_id' => 'test'
];
header('Content-Type: application/json');
echo json_encode($config);
?>
