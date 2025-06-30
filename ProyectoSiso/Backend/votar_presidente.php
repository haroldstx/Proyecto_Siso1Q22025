<?php
session_start();
require 'conexion.php';

if (!isset($_SESSION['dni'])) {
    header("Location: index.php");
    exit;
}

$candidatos = $pdo->query("SELECT * FROM Presidente")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['presidente'] ?? null;
    if ($id) {
        $_SESSION['voto_presidente'] = $id;
        header("Location: votar_diputados.php");
        exit;
    }
}
?>

<h2>Votación Presidencial</h2>
<form method="POST">
    <?php foreach ($candidatos as $c): ?>
        <input type="radio" name="presidente" value="<?= $c['Id'] ?>" required>
        <?= $c['Nombre'] ?><br>
    <?php endforeach; ?>
    <button type="submit">Siguiente</button>
</form>
