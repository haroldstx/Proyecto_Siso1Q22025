<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dni = $_POST['dni'];
    $stmt = $pdo->prepare("SELECT * FROM Usuarios WHERE DNI = ?");
    $stmt->execute([$dni]);
    $usuario = $stmt->fetch();

    if ($usuario && $usuario['YaVoto'] == 0) {
        $_SESSION['dni'] = $dni;
        header("Location: votar_presidente.php");
        exit;
    } else {
        $error = "DNI inválido o ya votó.";
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
    <h2>Ingrese su DNI para votar</h2>
    <form method="POST">
        <input type="text" name="dni" maxlength="13" required>
        <button type="submit">Ingresar</button>
    </form>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
</body>
</html>
