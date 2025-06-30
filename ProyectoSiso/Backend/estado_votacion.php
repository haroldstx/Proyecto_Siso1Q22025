<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

require 'conexion.php';

// Consulta para ver si existe alguna votación abierta (Abierto = 1)
$result = $conn->query("SELECT COUNT(*) AS count FROM Votaciones WHERE Abierto = 1");

$row = $result->fetch_assoc();

if ($row['count'] > 0) {
    echo "true";
} else {
    echo "false";
}
