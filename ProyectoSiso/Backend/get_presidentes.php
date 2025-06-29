<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Resto del código...
require 'conexion.php';

$sql = "SELECT * FROM Presidente";
$resultado = $conn->query($sql);

$presidentes = [];
while ($row = $resultado->fetch_assoc()) {
    $presidentes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($presidentes);
?>
