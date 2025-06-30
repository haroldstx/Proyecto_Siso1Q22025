import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Ganadores = () => {
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('presidentes');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('usuario');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      navigate('/');
    }
  }, [navigate]);

  // Cargar resultados de votación
  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await fetch('/Backend/resultados.php');
        const data = await response.json();
        
        if (data.success) {
          setResultados(data.data);
        } else {
          setError(data.message || 'Error al cargar resultados');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error de conexión con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchResultados, 30000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const goBack = () => {
    if (user?.rol === 1) {
      navigate('/mainpage-admin');
    } else {
      navigate('/mainpage');
    }
  };

  // Colores para los gráficos según partido
  const getPartyColor = (partido) => {
    switch (partido) {
      case 'LIBRE': return '#e74c3c';
      case 'Partido Liberal': return '#3498db';
      case 'Partido Nacional': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  // Preparar datos para gráficas
  const prepareChartData = (data, type) => {
    return data.map(item => ({
      ...item,
      shortName: item.nombre.split(' ').slice(0, 2).join(' '),
      fill: getPartyColor(item.partido)
    }));
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.nombre}</p>
          <p className="text-sm text-gray-600">Partido: {data.partido}</p>
          <p className="text-sm font-bold text-blue-600">
            Votos: {data.votos.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Posición: #{data.posicion}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Cargando Resultados
            </h2>
            <p className="text-gray-600 text-sm">
              Obteniendo datos de votación...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Error al Cargar Datos
            </h2>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              🏆 Resultados Electorales en Tiempo Real
            </h1>
            <p className="text-green-100 text-sm">
              Última actualización: {resultados?.timestamp ? new Date(resultados.timestamp).toLocaleString() : 'N/A'}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={goBack}
              className="px-4 py-2 text-sm bg-green-700 hover:bg-green-800 rounded transition-colors"
            >
              Volver
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas generales */}
      {resultados?.estadisticas && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-blue-500 mr-4">👥</div>
                <div>
                  <p className="text-sm text-gray-600">Total Votantes</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {resultados.estadisticas.total_votantes.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-green-500 mr-4">📊</div>
                <div>
                  <p className="text-sm text-gray-600">Participación</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {resultados.estadisticas.participacion}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-purple-500 mr-4">🗳️</div>
                <div>
                  <p className="text-sm text-gray-600">Votos Presidente</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {resultados.estadisticas.total_votos_presidente.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl text-orange-500 mr-4">🏛️</div>
                <div>
                  <p className="text-sm text-gray-600">Registrados</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {resultados.estadisticas.total_registrados.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs de navegación */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('presidentes')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'presidentes'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🏛️ Presidentes (TOP 3)
            </button>
            <button
              onClick={() => setActiveTab('alcaldes')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'alcaldes'
                  ? 'border-b-2 border-green-500 text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🏢 Alcaldes (TOP 3)
            </button>
            <button
              onClick={() => setActiveTab('diputados')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'diputados'
                  ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              👥 Diputados (TOP 10)
            </button>
          </div>

          {/* Contenido de los tabs */}
          <div className="p-6">
            {resultados && (
              <>
                {/* Presidentes */}
                {activeTab === 'presidentes' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Resultados para Presidente
                    </h3>
                    
                    {/* Gráfica de barras */}
                    <div className="mb-8">
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={prepareChartData(resultados.presidentes, 'presidentes')}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="shortName" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="votos" name="Votos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tabla de resultados */}
                    <div className="overflow-x-auto">
                      <table className="w-full bg-white rounded-lg shadow">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Posición
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Candidato
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Partido
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Votos
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {resultados.presidentes.map((candidato, index) => (
                            <tr key={candidato.id} className={index === 0 ? 'bg-yellow-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold text-white ${
                                    index === 0 ? 'bg-yellow-500' : 
                                    index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                  }`}>
                                    {candidato.posicion}
                                  </span>
                                  {index === 0 && <span className="ml-2 text-xl">🏆</span>}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {candidato.nombre}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span 
                                  className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                                  style={{ backgroundColor: getPartyColor(candidato.partido) }}
                                >
                                  {candidato.partido}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-900">
                                  {candidato.votos.toLocaleString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Alcaldes */}
                {activeTab === 'alcaldes' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Resultados para Alcalde
                    </h3>
                    
                    {/* Gráfica de barras */}
                    <div className="mb-8">
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={prepareChartData(resultados.alcaldes, 'alcaldes')}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="shortName" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="votos" name="Votos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tabla de resultados */}
                    <div className="overflow-x-auto">
                      <table className="w-full bg-white rounded-lg shadow">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Posición
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Candidato
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Partido
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Votos
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {resultados.alcaldes.map((candidato, index) => (
                            <tr key={candidato.id} className={index === 0 ? 'bg-green-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold text-white ${
                                    index === 0 ? 'bg-yellow-500' : 
                                    index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                  }`}>
                                    {candidato.posicion}
                                  </span>
                                  {index === 0 && <span className="ml-2 text-xl">🏆</span>}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {candidato.nombre}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span 
                                  className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                                  style={{ backgroundColor: getPartyColor(candidato.partido) }}
                                >
                                  {candidato.partido}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-900">
                                  {candidato.votos.toLocaleString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Diputados */}
                {activeTab === 'diputados' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Top 10 Diputados
                    </h3>
                    
                    {/* Gráfica de barras */}
                    <div className="mb-8">
                      <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={prepareChartData(resultados.diputados, 'diputados')}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="shortName" 
                            angle={-45}
                            textAnchor="end"
                            height={120}
                            fontSize={10}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="votos" name="Votos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tabla de resultados */}
                    <div className="overflow-x-auto">
                      <table className="w-full bg-white rounded-lg shadow">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Posición
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Candidato
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Partido
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Votos
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {resultados.diputados.map((candidato, index) => (
                            <tr key={candidato.id} className={index < 3 ? 'bg-purple-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold text-white ${
                                    index === 0 ? 'bg-yellow-500' : 
                                    index === 1 ? 'bg-gray-400' : 
                                    index === 2 ? 'bg-orange-400' : 'bg-gray-600'
                                  }`}>
                                    {candidato.posicion}
                                  </span>
                                  {index < 3 && <span className="ml-2 text-xl">
                                    {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                                  </span>}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {candidato.nombre}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span 
                                  className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                                  style={{ backgroundColor: getPartyColor(candidato.partido) }}
                                >
                                  {candidato.partido}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-900">
                                  {candidato.votos.toLocaleString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            Sistema Electoral Honduras 2025 | Resultados en Tiempo Real
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Los datos se actualizan automáticamente cada 30 segundos
          </p>
        </div>
      </div>
    </div>
  );
};
export default Ganadores;