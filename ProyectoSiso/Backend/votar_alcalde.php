<?php
session_start();
require 'db.php';

if (!isset($_SESSION['voto_diputados'])) {
    header("Location: votar_diputados.php");
    exit;
}

$alcaldes = $pdo->query("SELECT * FROM Alcalde")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['alcalde'] ?? null;
    if ($id) {
        $pdo->beginTransaction();

        $pdo->prepare("UPDATE Presidente SET Votos = Votos + 1 WHERE Id = ?")->execute([$_SESSION['voto_presidente']]);
        foreach ($_SESSION['voto_diputados'] as $dip) {
            $pdo->prepare("UPDATE Diputados SET Votos = Votos + 1 WHERE Id = ?")->execute([$dip]);
        }
        $pdo->prepare("UPDATE Alcalde SET Votos = Votos + 1 WHERE Id = ?")->execute([$id]);
        $pdo->prepare("UPDATE Usuarios SET YaVoto = 1 WHERE DNI = ?")->execute([$_SESSION['dni']]);

        $pdo->commit();
        session_destroy();
        header("Location: gracias.php");
        exit;
    }
}
?>

<h2>Votación para Alcalde</h2>
<form method="POST">
    <?php foreach ($alcaldes as $a): ?>
        <input type="radio" name="alcalde" value="<?= $a['Id'] ?>" required> <?= $a['Nombre'] ?><br>
    <?php endforeach; ?>
    <button type="submit">Finalizar</button>
</form>
