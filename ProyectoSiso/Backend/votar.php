<?php
session_start();
require 'db.php';
if (!isset($_SESSION['dni'])) {
    header("Location: index.php");
    exit;
}

// Obtener candidatos
$presidentes = $pdo->query("SELECT * FROM Presidente")->fetchAll();
$alcaldes = $pdo->query("SELECT * FROM Alcalde")->fetchAll();
$diputados = $pdo->query("SELECT * FROM Diputados")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Votación</title>
</head>
<body>
<h2>Votación Presidencial</h2>
<form method="POST" action="procesar_voto.php">
    <?php foreach ($presidentes as $p): ?>
        <label>
            <input type="radio" name="presidente" value="<?= $p['Id'] ?>" required>
            <?= $p['Nombre'] ?> (<?= $p['Partido'] ?>)
        </label><br>
    <?php endforeach; ?>

    <h2>Votación para Alcalde</h2>
    <?php foreach ($alcaldes as $a): ?>
        <label>
            <input type="radio" name="alcalde" value="<?= $a['Id'] ?>" required>
            <?= $a['Nombre'] ?> (<?= $a['Partido'] ?>)
        </label><br>
    <?php endforeach; ?>

    <h2>Votación para Diputados (máx. 23)</h2>
    <?php foreach ($diputados as $d): ?>
        <label>
            <input type="checkbox" name="diputados[]" value="<?= $d['Id'] ?>">
            <?= $d['Nombre'] ?> (<?= $d['Partido'] ?>)
        </label><br>
    <?php endforeach; ?>

    <br><button type="submit">Enviar Voto</button>
</form>
</body>
</html>
