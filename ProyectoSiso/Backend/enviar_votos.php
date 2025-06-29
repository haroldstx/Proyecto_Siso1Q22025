<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');


require 'conexion.php';
$host = 'localhost';
$user = 'vote'; 
$pass = 'admin2025';
$dbname = 'votacion2025'; 

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión']);
    exit();
}


$data = json_decode(file_get_contents('php://input'), true);

$dni = $data['dni'] ?? null;
$id_presidente = $data['id_presidente'] ?? null;
$id_alcalde = $data['id_alcalde'] ?? null;
$ids_diputados = isset($data['ids_diputados']) ? explode(',', $data['ids_diputados']) : [];

if (!$dni || !$id_presidente || !$id_alcalde || count($ids_diputados) === 0) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit();
}


$conn->begin_transaction();

try {

    $stmt = $conn->prepare("UPDATE Usuarios SET YaVoto = 1 WHERE DNI = ?");
    $stmt->bind_param("s", $dni);
    $stmt->execute();
    $stmt->close();


    $stmt = $conn->prepare("UPDATE Presidente SET Votos = Votos + 1 WHERE ID = ?");
    $stmt->bind_param("i", $id_presidente);
    $stmt->execute();
    $stmt->close();


    $stmt = $conn->prepare("UPDATE Alcalde SET Votos = Votos + 1 WHERE ID = ?");
    $stmt->bind_param("i", $id_alcalde);
    $stmt->execute();
    $stmt->close();


    $stmt = $conn->prepare("UPDATE Diputados SET Votos = Votos + 1 WHERE ID = ?");
    foreach ($ids_diputados as $id_diputado) {
        $id = intval($id_diputado);
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }
    $stmt->close();


    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Voto registrado correctamente']);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Error al guardar votos: ' . $e->getMessage()]);
}

$conn->close();
?>
