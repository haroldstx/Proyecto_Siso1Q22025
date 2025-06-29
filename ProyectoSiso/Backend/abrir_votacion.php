<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexion.php';

// Verificar si ya hay una votación abierta
$abierta = $conn->query("SELECT * FROM Votaciones WHERE Abierto = 1 LIMIT 1");

if ($abierta && $abierta->num_rows > 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ya hay una votación abierta. No se puede abrir otra hasta cerrarla.'
    ]);
    exit;
}

$conn->begin_transaction();

try {
    // Reiniciar votos
    $conn->query("UPDATE Presidente SET Votos = 0");
    $conn->query("UPDATE Diputados SET Votos = 0");
    $conn->query("UPDATE Alcalde SET Votos = 0");

    // Reiniciar estado de votación de usuarios
    $conn->query("UPDATE Usuarios SET YaVoto = 0");

    // Insertar nueva votación
    $stmt = $conn->prepare("INSERT INTO Votaciones (Inicio, Abierto) VALUES (NOW(), 1)");
    $stmt->execute();

    $newId = $conn->insert_id;
    $conn->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Nueva votación abierta correctamente.',
        'votacionId' => $newId
    ]);
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al abrir la votación.',
        'error' => $e->getMessage()
    ]);
}
?>
