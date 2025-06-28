<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');
header('Access-Control-Allow-Credentials: false');

// Si es una solicitud OPTIONS (preflight), responder y terminar
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Debug: Log de datos recibidos
    error_log("Método: " . $_SERVER['REQUEST_METHOD']);
    error_log("POST data: " . print_r($_POST, true));
    error_log("Content-Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'no definido'));
    
    // Incluir conexión
    include 'conexion.php';
    
    // Verificar si la conexión está activa
    if ($conn->connect_error) {
        throw new Exception("Error: " . $conn->connect_error);
    }
    
    // Si es POST, validar datos
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $identidad = $_POST['DNI'] ?? '';
        $telefono = $_POST['telefono'] ?? '';
        
        error_log("Identidad recibida: '" . $identidad . "'");
        error_log("Teléfono recibido: '" . $telefono . "'");
        
        // Validaciones básicas
        if (empty($identidad)) {
            throw new Exception("El número de identidad es requerido");
        }
        
        if (empty($telefono)) {
            throw new Exception("El número de teléfono es requerido");
        }
        
        // Limpiar identidad (quitar guiones para comparación)
        $identidad_limpia = str_replace('-', '', $identidad);
        
        // Validar formato de identidad - Honduras: debe comenzar con 0, tener 13 dígitos
        if (!preg_match('/^0\d{12}$/', $identidad_limpia)) {
            if (strlen($identidad_limpia) != 13) {
                throw new Exception("El número de identidad debe tener exactamente 13 dígitos (ejemplo: 0401-1999-12345)");
            } elseif (!preg_match('/^0/', $identidad_limpia)) {
                throw new Exception("El número de identidad debe comenzar con 0 (ejemplo: 0401-1999-12345)");
            } else {
                throw new Exception("Formato de identidad inválido. Use el formato: 0401-1999-12345");
            }
        }
        
        // Limpiar teléfono (quitar espacios y guiones)
        $telefono_limpio = str_replace([' ', '-'], '', $telefono);
        
        // Validar formato del teléfono Honduras: +504 seguido de 8 dígitos
        if (!preg_match('/^\+504\d{8}$/', $telefono_limpio)) {
            if (!preg_match('/^\+504/', $telefono_limpio)) {
                throw new Exception("El número de teléfono debe comenzar con +504 (ejemplo: +504 9999-9999)");
            } elseif (strlen($telefono_limpio) != 12) {
                throw new Exception("El número de teléfono debe tener 8 dígitos después de +504 (ejemplo: +504 9999-9999)");
            } else {
                throw new Exception("Formato de teléfono inválido. Use el formato: +504 9999-9999");
            }
        }
        
        // Consulta SQL para verificar si el usuario existe en la base de datos
        // Buscamos por identidad limpia (sin guiones) y teléfono limpio
        $query = "SELECT DNI, Telefono FROM Usuarios WHERE REPLACE(DNI, '-', '') = ? AND REPLACE(Telefono, ' ', '') = REPLACE(?, ' ', '')";
        $stmt = $conn->prepare($query);
        
        if (!$stmt) {
            throw new Exception("Error al preparar la consulta: " . $conn->error);
        }
        
        $stmt->bind_param("ss", $identidad_limpia, $telefono_limpio);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            throw new Exception("Los datos de identidad y teléfono no coinciden con ningún usuario registrado en la base de datos");
        }
        
        // Usuario encontrado, obtener sus datos
        $user = $result->fetch_assoc();
        $stmt->close();
        
        // Si todo está bien, responder con éxito
        echo json_encode([
            'success' => true,
            'message' => 'Autenticación exitosa',
            'data' => [
                'identidad' => $identidad,
                'telefono' => $telefono,
                'authenticated' => true
            ]
        ]);
        
    } else {
        // Solo test de conexión para GET
        echo json_encode([
            'success' => true,
            'message' => 'Conexión a la base de datos exitosa'
        ]);
    }
    
} catch (Exception $e) {
    error_log("Error en test_conexion.php: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD'],
            'post_data' => $_POST,
            'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'no definido'
        ]
    ]);
} finally {
    // Cerrar conexión solo si existe
    if (isset($conn)) {
        $conn->close();
    }
}
?>
