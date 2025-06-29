<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


require 'conexion.php';

$sql = "SELECT * FROM Alcalde";
$resultado = $conn->query($sql);

$alcaldes = [];
while ($row = $resultado->fetch_assoc()) {
    $alcaldes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($alcaldes);
?>
