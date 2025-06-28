<?php
require 'db.php';

// Buscar la votación activa
$votacion = $pdo->query("SELECT Id FROM Votaciones WHERE Abierto = 1 LIMIT 1")->fetch();

if (!$votacion) {
    echo "<h2>⚠️ No hay una votación abierta.</h2>";
    echo "<a href='abrir_votacion.php'>Abrir nueva votación</a>";
    exit;
}

$votacionId = $votacion['Id'];

try {
    $pdo->beginTransaction();

    // Obtener los ganadores
    $presidente_id = $pdo->query("SELECT Id FROM Presidente ORDER BY Votos DESC LIMIT 1")->fetchColumn();
    $alcalde_id = $pdo->query("SELECT Id FROM Alcalde ORDER BY Votos DESC LIMIT 1")->fetchColumn();
    $diputados_ids = $pdo->query("SELECT Id FROM Diputados ORDER BY Votos DESC LIMIT 23")->fetchAll(PDO::FETCH_COLUMN);
    $diputados_texto = implode(',', $diputados_ids);

    // Actualizar la votación activa
    $stmt = $pdo->prepare("UPDATE Votaciones SET 
        PresidenteGanador = ?, 
        AlcaldeGanador = ?, 
        DiputadosGanadores = ?, 
        Cierre = NOW(), 
        Abierto = 0 
        WHERE Id = ?");
    $stmt->execute([$presidente_id, $alcalde_id, $diputados_texto, $votacionId]);

    $pdo->commit();

    echo "<h2>✅ Votación cerrada correctamente</h2>";
    echo "<p><strong>ID Votación:</strong> $votacionId</p>";
    echo "<p><strong>Presidente ganador ID:</strong> $presidente_id</p>";
    echo "<p><strong>Alcalde ganador ID:</strong> $alcalde_id</p>";
    echo "<p><strong>Diputados ganadores IDs:</strong> $diputados_texto</p>";
    echo "<a href='resultados.php'>Ver resultados</a>";

} catch (Exception $e) {
    $pdo->rollBack();
    echo "<h2>❌ Error al cerrar la votación</h2>";
    echo "<pre>" . $e->getMessage() . "</pre>";
}
?>
