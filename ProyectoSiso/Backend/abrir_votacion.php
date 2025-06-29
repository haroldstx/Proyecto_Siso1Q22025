<?php
require 'db.php';

// Verificar si ya hay una votación abierta
$abierta = $pdo->query("SELECT * FROM Votaciones WHERE Abierto = 1 LIMIT 1")->fetch();

if ($abierta) {
    echo "<h2>⚠️ Ya hay una votación abierta.</h2>";
    echo "<p>No se puede abrir otra hasta cerrarla.</p>";
    echo "<a href='cerrar_votacion.php'>Cerrar votación actual</a>";
    exit;
}

try {
    // Comenzar transacción
    $pdo->beginTransaction();

    // Reiniciar votos de presidentes, diputados y alcaldes
    $pdo->exec("UPDATE Presidente SET Votos = 0");
    $pdo->exec("UPDATE Diputados SET Votos = 0");
    $pdo->exec("UPDATE Alcalde SET Votos = 0");

    // Reiniciar YaVoto de todos los usuarios
    $pdo->exec("UPDATE Usuarios SET YaVoto = 0");

    // Insertar nueva votación
    $stmt = $pdo->prepare("INSERT INTO Votaciones (Inicio, Abierto) VALUES (NOW(), 1)");
    $stmt->execute();

    $pdo->commit();

    echo "<h2>✅ Nueva votación abierta correctamente</h2>";
    echo "<p>Todos los votos han sido reiniciados.</p>";
    echo "<a href='index.php'>Ir a votar</a>";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "<h2>❌ Error al abrir la votación:</h2>";
    echo "<pre>" . $e->getMessage() . "</pre>";
}
?>
