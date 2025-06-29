<?php
session_start();
require 'db.php';

if (!isset($_SESSION['voto_presidente'])) {
    header("Location: votar_presidente.php");
    exit;
}

$diputados = $pdo->query("SELECT * FROM Diputados")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $seleccionados = $_POST['diputados'] ?? [];
    if (count($seleccionados) <= 23) {
        $_SESSION['voto_diputados'] = $seleccionados;
        header("Location: votar_alcalde.php");
        exit;
    }
}
?>

<h2>Seleccione hasta 23 Diputados</h2>
<form method="POST">
    <?php foreach ($diputados as $d): ?>
        <input type="checkbox" name="diputados[]" value="<?= $d['Id'] ?>"> <?= $d['Nombre'] ?><br>
    <?php endforeach; ?>
    <button type="submit">Siguiente</button>
</form>
