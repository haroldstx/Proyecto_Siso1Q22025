<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');

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
        throw new Exception("Error: " . $conn->connect_error);
    }
    
    $resultados = [
        'presidentes' => [],
        'alcaldes' => [],
        'diputados' => []
    ];
    
    // Obtener resultados de Presidentes (TOP 3)
    $query_presidentes = "
        SELECT p.Id, p.Nombre, pt.Nombre as Partido, p.Votos 
        FROM Presidente p 
        JOIN Partidos pt ON p.Partido = pt.Id 
        ORDER BY p.Votos DESC 
        LIMIT 3
    ";
    $result_presidentes = $conn->query($query_presidentes);
    
    if ($result_presidentes) {
        $position = 1;
        while ($row = $result_presidentes->fetch_assoc()) {
            $resultados['presidentes'][] = [
                'id' => $row['Id'],
                'nombre' => $row['Nombre'],
                'partido' => $row['Partido'],
                'votos' => (int)$row['Votos'],
                'posicion' => $position++
            ];
        }
    }
    
    // Obtener resultados de Alcaldes (TOP 3)
    $query_alcaldes = "
        SELECT a.Id, a.Nombre, pt.Nombre as Partido, a.Votos 
        FROM Alcalde a 
        JOIN Partidos pt ON a.Partido = pt.Id 
        ORDER BY a.Votos DESC 
        LIMIT 3
    ";
    $result_alcaldes = $conn->query($query_alcaldes);
    
    if ($result_alcaldes) {
        $position = 1;
        while ($row = $result_alcaldes->fetch_assoc()) {
            $resultados['alcaldes'][] = [
                'id' => $row['Id'],
                'nombre' => $row['Nombre'],
                'partido' => $row['Partido'],
                'votos' => (int)$row['Votos'],
                'posicion' => $position++
            ];
        }
    }
    
    // Obtener resultados de Diputados (TOP 24)
    $query_diputados = "
        SELECT d.Id, d.Nombre, pt.Nombre as Partido, d.Votos 
        FROM Diputados d 
        JOIN Partidos pt ON d.Partido = pt.Id 
        ORDER BY d.Votos DESC 
        LIMIT 24
    ";
    $result_diputados = $conn->query($query_diputados);
    
    if ($result_diputados) {
        $position = 1;
        while ($row = $result_diputados->fetch_assoc()) {
            $resultados['diputados'][] = [
                'id' => $row['Id'],
                'nombre' => $row['Nombre'],
                'partido' => $row['Partido'],
                'votos' => (int)$row['Votos'],
                'posicion' => $position++
            ];
        }
    }
    
    // Obtener estadísticas generales
    $stats_query = "
        SELECT 
            (SELECT COUNT(*) FROM Usuarios WHERE YaVoto = 1) as total_votantes,
            (SELECT COUNT(*) FROM Usuarios) as total_registrados,
            (SELECT SUM(Votos) FROM Presidente) as total_votos_presidente,
            (SELECT SUM(Votos) FROM Alcalde) as total_votos_alcalde,
            (SELECT SUM(Votos) FROM Diputados) as total_votos_diputados
    ";
    $stats_result = $conn->query($stats_query);
    $stats = $stats_result->fetch_assoc();
    
    $resultados['estadisticas'] = [
        'total_votantes' => (int)$stats['total_votantes'],
        'total_registrados' => (int)$stats['total_registrados'],
        'participacion' => $stats['total_registrados'] > 0 ? 
            round(($stats['total_votantes'] / $stats['total_registrados']) * 100, 2) : 0,
        'total_votos_presidente' => (int)$stats['total_votos_presidente'],
        'total_votos_alcalde' => (int)$stats['total_votos_alcalde'],
        'total_votos_diputados' => (int)$stats['total_votos_diputados']
    ];
    
    echo json_encode([
        'success' => true,
        'data' => $resultados,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    error_log("Error en resultados.php: " . $e->getMessage());
    http_response_code(500);
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
