<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Resto del código...
require 'conexion.php';

$sql = "SELECT * FROM Diputados";
$resultado = $conn->query($sql);

$diputados = [];
while ($row = $resultado->fetch_assoc()) {
    $diputados[] = $row;
}

header('Content-Type: application/json');
echo json_encode($diputados);
?>
