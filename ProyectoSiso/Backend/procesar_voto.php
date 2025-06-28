<?php
session_start();
require 'db.php';

if (!isset($_SESSION['dni'])) {
    header("Location: index.php");
    exit;
}

$dni = $_SESSION['dni'];
$presidente = $_POST['presidente'];
$alcalde = $_POST['alcalde'];
$diputados = $_POST['diputados'] ?? [];

if (count($diputados) > 23) {
    die("Error: No puede votar por más de 23 diputados.");
}

try {
    $pdo->beginTransaction();

    // Sumar votos
    $pdo->prepare("UPDATE Presidente SET Votos = Votos + 1 WHERE Id = ?")->execute([$presidente]);
    $pdo->prepare("UPDATE Alcalde SET Votos = Votos + 1 WHERE Id = ?")->execute([$alcalde]);
    foreach ($diputados as $dip) {
        $pdo->prepare("UPDATE Diputados SET Votos = Votos + 1 WHERE Id = ?")->execute([$dip]);
    }

    // Marcar como ya votó
    $pdo->prepare("UPDATE Usuarios SET YaVoto = 1 WHERE DNI = ?")->execute([$dni]);

    $pdo->commit();
    session_destroy();
    echo "<h2>¡Voto registrado con éxito!</h2>";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Error al registrar el voto: " . $e->getMessage();
}
?>
