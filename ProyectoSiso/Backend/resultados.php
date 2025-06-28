<?php
require 'db.php';
$cerrada = $pdo->query("SELECT * FROM Votaciones WHERE Abierto = 0 ORDER BY Cierre DESC LIMIT 1")->fetch();

if (!$cerrada) {
    echo "Votación aún está abierta.";
    exit;
}

$presidente = $pdo->query("SELECT Nombre FROM Presidente ORDER BY Votos DESC LIMIT 1")->fetchColumn();
$alcalde = $pdo->query("SELECT Nombre FROM Alcalde ORDER BY Votos DESC LIMIT 1")->fetchColumn();
$diputados = $pdo->query("SELECT Nombre FROM Diputados ORDER BY Votos DESC LIMIT 23")->fetchAll(PDO::FETCH_COLUMN);
?>

<h2>Ganadores</h2>
<p><strong>Presidente:</strong> <?= $presidente ?></p>
<p><strong>Alcalde:</strong> <?= $alcalde ?></p>
<h3>Diputados (Top 23)</h3>
<ol>
    <?php foreach ($diputados as $d): ?>
        <li><?= $d ?></li>
    <?php endforeach; ?>
</ol>
