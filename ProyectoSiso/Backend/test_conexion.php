<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Si es una solicitud OPTIONS (preflight), responder y terminar
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Incluir conexión
    include 'conexion.php';
    
    // Verificar si la conexión está activa
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }
    
    // Si es POST, validar datos
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $identidad = $_POST['identidad'] ?? '';
        $telefono = $_POST['telefono'] ?? '';
        $errors = [];
        
        // Validaciones básicas
        if (empty($identidad)) {
            $errors[] = "El número de identidad es requerido";
        }
        
        if (empty($telefono)) {
            $errors[] = "El número de teléfono es requerido";
        }
        
        // Si faltan datos básicos, retornar error
        if (!empty($errors)) {
            throw new Exception(implode(". ", $errors));
        }
        
        // Limpiar identidad (quitar guiones)
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
        
        // Validación adicional: verificar que los dígitos sean válidos para Honduras
        $codigo_departamento = substr($identidad_limpia, 0, 4);
        $codigos_validos = ['0101', '0201', '0301', '0401', '0501', '0601', '0701', '0801', '0901', '1001', '1101', '1201', '1301', '1401', '1501', '1601', '1701', '1801'];
        
        if (!in_array($codigo_departamento, $codigos_validos)) {
            throw new Exception("Código de departamento inválido en la identidad. Verifique los primeros 4 dígitos");
        }
        
        // Si todo está bien con POST
        echo json_encode([
            'success' => true,
            'message' => 'Datos válidos y conexión exitosa',
            'data' => [
                'identidad' => $identidad,
                'identidad_limpia' => $identidad_limpia,
                'telefono' => $telefono,
                'telefono_limpio' => $telefono_limpio
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
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    // Cerrar conexión solo si existe
    if (isset($conn)) {
        $conn->close();
    }
}
?>
