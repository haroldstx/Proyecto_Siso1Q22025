<?php
session_start();

$identidad = $_POST['identidad'];
$telefono  = $_POST['telefono'] ?? '';
$password  = $_POST['password'] ?? '';

// Validar formato de identidad (debe comenzar con 040 y tener 13 dígitos)
if (!preg_match('/^040\d{10}$/', $identidad)) {
    die("La identidad debe comenzar con 040 y tener 13 dígitos.");
}

// Limpiar espacios del teléfono
$telefono = str_replace(' ', '', $telefono);

// Validar formato del teléfono (+504 seguido de 8 dígitos)
if (!preg_match('/^\+504\d{8}$/', $telefono)) {
    die(" El número de teléfono debe tener el formato +504XXXXXXXX (con o sin espacio).");
}

// Si pasa validación, guardar sesión
$_SESSION['identidad'] = $identidad;
$_SESSION['telefono']  = $telefono;
$_SESSION['rol'] = ($password != "") ? 'admin' : 'ciudadano';

// Redirigir al inicio de votación
header("Location: votar_presidente.php");
exit();
?>
