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

// Buscar la votación abierta
$result = $conn->query("SELECT Id FROM Votaciones WHERE Abierto = 1 LIMIT 1");

if (!$result || $result->num_rows === 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No hay una votación abierta.'
    ]);
    exit;
}

$votacion = $result->fetch_assoc();
$votacionId = $votacion['Id'];

$conn->begin_transaction();

try {
    // Obtener los ganadores
    $presidente = $conn->query("SELECT Id FROM Presidente ORDER BY Votos DESC LIMIT 1")->fetch_assoc();
    $alcalde = $conn->query("SELECT Id FROM Alcalde ORDER BY Votos DESC LIMIT 1")->fetch_assoc();
    $diputados = $conn->query("SELECT Id FROM Diputados ORDER BY Votos DESC LIMIT 23");

    $diputados_ids = [];
    while ($row = $diputados->fetch_assoc()) {
        $diputados_ids[] = $row['Id'];
    }
    $diputados_texto = implode(',', $diputados_ids);

    // Actualizar la votación
    $stmt = $conn->prepare("UPDATE Votaciones SET 
        PresidenteGanador = ?, 
        AlcaldeGanador = ?, 
        DiputadosGanadores = ?, 
        Cierre = NOW(), 
        Abierto = 0 
        WHERE Id = ?");
    $stmt->bind_param("iisi", $presidente['Id'], $alcalde['Id'], $diputados_texto, $votacionId);
    $stmt->execute();

    $conn->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Votación cerrada correctamente.',
        'presidente_id' => $presidente['Id'],
        'alcalde_id' => $alcalde['Id'],
        'diputados_ids' => $diputados_ids,
        'votacion_id' => $votacionId
    ]);
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al cerrar la votación.',
        'error' => $e->getMessage()
    ]);
}
?>
