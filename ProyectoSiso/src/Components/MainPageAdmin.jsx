import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainPageAdmin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('usuario');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        // Verificar que sea admin (rol = 1)
        if (parsedUser.rol === 1) {
          setUser(parsedUser);
        } else {
          // Si no es admin, redirigir a mainpage normal
          navigate('/mainpage');
        }
      } else {
        // Si no hay usuario, redirigir al login
        navigate('/');
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p>Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header con información del administrador */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              Panel de Administración - Sistema de Votaciones
            </h2>
            {user && (
              <p className="text-blue-100 text-sm">
                Administrador: {user.identidad} | Teléfono: {user.telefono}
              </p>
            )}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Panel de Control - Administrador
            </h1>
            <p className="text-lg text-gray-600">
              Gestiona el proceso electoral y supervisa las votaciones
            </p>
          </div>

          {/* Grid de opciones administrativas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Gestión de Votaciones */}
            <Link
              to="/cerrar-votaciones"
              className="block p-6 rounded-lg border-2 border-red-300 bg-red-50 text-red-700 transition-all transform hover:scale-105 hover:border-red-500 hover:bg-red-100"
            >
              <div className="text-center">
                <div className="text-7xl mb-3">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Cerrar Votaciones</h3>
                <p className="text-sm">
                  Finalizar el proceso de votación y cerrar urnas
                </p>
              </div>
            </Link>

            {/* Consultar Resultados */}
            <Link 
              to="/ganadores"
              className="block p-6 rounded-lg border-2 border-purple-300 bg-purple-50 text-purple-700 transition-all transform hover:scale-105 hover:border-purple-500 hover:bg-purple-100"
            >
              <div className="text-center">
                <div className="text-7xl mb-3">📊</div>
                <h3 className="text-xl font-semibold mb-2">Resultados</h3>
                <p className="text-sm">
                  Ver resultados en tiempo real y estadísticas
                </p>
              </div>
            </Link>

            {/* Supervisión General */}
            <Link to="/Algoritmos">
            <div className="p-6 rounded-lg border-2 border-green-300 bg-gray-50 text-green-600 hover:border-green-500 hover:bg-green-100 transition-all transform hover:scale-105">
              <div className="text-center">
                 <img src="/src/assets/img/play.png" alt="Algoritmos" className="mx-auto mb-2" />
                <h3 className="text-xl font-semibold mb-2">Estadísticas</h3>
                <p className="text-sm">
                  Monitoreo y análisis del proceso electoral
                </p>
              </div>
            </div>
            </Link>
          </div>

          {/* Panel de información administrativa */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Estado del sistema */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                Estado del Sistema
              </h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Sistema de votación: <span className="font-semibold">Activo</span></li>
                <li>• Base de datos: <span className="font-semibold">Conectada</span></li>
                <li>• Seguridad: <span className="font-semibold">Habilitada</span></li>
              </ul>
            </div>

            {/* Herramientas administrativas */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                <span className="text-blue-600 mr-2">🛠️</span>
                Herramientas Administrativas
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Control total sobre el proceso electoral</li>
                <li>• Acceso a estadísticas en tiempo real</li>
                <li>• Supervisión de la integridad del sistema</li>
              </ul>
            </div>

          </div>

          {/* Advertencias importantes */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              Información Importante
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Una vez cerradas las votaciones, no se podrán registrar más votos</li>
              <li>• Asegúrate de que todos los votantes hayan participado antes de cerrar</li>
              <li>• Los resultados son definitivos después del cierre</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageAdmin;
