<?php
// Permitir CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'conexion.php'; // O db.php si usas PDO

try {
    $res = $conn->query("SELECT Abierto FROM Votaciones ORDER BY Id DESC LIMIT 1");

    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        echo json_encode([
            "status" => "success",
            "abierto" => boolval($row['Abierto'])
        ]);
    } else {
        echo json_encode([
            "status" => "success",
            "abierto" => false
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error al consultar estado: " . $e->getMessage()
    ]);
}
