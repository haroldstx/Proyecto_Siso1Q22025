import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votacionAbierta, setVotacionAbierta] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userData = localStorage.getItem('usuario');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigate('/');
      }

      // Obtener el estado de votación como texto "true" o "false"
      fetch('/Backend/estado_votacion.php')
        .then(res => res.text())
        .then(text => {
          const abierto = text.trim() === 'true';
          setVotacionAbierta(abierto);
        })
        .catch(err => {
          console.error("Error al obtener estado de votación:", err);
          setVotacionAbierta(false); // por defecto se asume cerrada
        });

    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const hasVoted = user ? user.yavoto === 1 : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex justify-center mb-1 pl-5 space-x-4 ">
            <img src="/src/assets/img/nacional.png" alt="Partido Nacional" className="h-11 w-20" />
            <img src="/src/assets/img/Liberal.png" alt="Partido Liberal" className="h-11 w-20" />
            <img src="/src/assets/img/libre.png" alt="LIBRE" className="h-11 w-20" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Portal de Votaciones - Ciudadano
            </h2>
            {user && (
              <p className="text-sm text-gray-600">
                Identidad: {user.identidad} | Teléfono: {user.telefono}
              </p>
            )}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Bienvenido al Sistema de Votaciones
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Aquí puedes ejercer tu derecho al voto y consultar los resultados
            </p>

            {hasVoted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mt-4">
                <p className="font-semibold">✓ Ya has ejercido tu voto</p>
                <p className="text-sm">Gracias por participar en el proceso democrático</p>
              </div>
            )}

            {!votacionAbierta && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
                <p className="font-semibold">✖️ La votación está cerrada</p>
                <p className="text-sm">No es posible votar en este momento. Intenta más tarde.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/votar"
              className={`block p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${
                hasVoted || !votacionAbierta
                  ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'border-green-300 bg-green-50 text-green-700 hover:border-green-500 hover:bg-green-100'
              }`}
              onClick={(e) => {
                if (hasVoted || !votacionAbierta) {
                  e.preventDefault();
                }
              }}
            >
              <div className="text-center">
                <div className="text-7xl mb-3">🗳️</div>
                <h3 className="text-xl font-semibold mb-2">Votar</h3>
                <p className="text-sm">
                  {hasVoted
                    ? 'Ya has votado en estas elecciones'
                    : votacionAbierta
                      ? 'Participa en las elecciones actuales'
                      : 'La votación está cerrada'}
                </p>
              </div>
            </Link>

            <Link
              to="/ganadores"
              className="block p-6 rounded-lg border-2 border-purple-300 bg-purple-50 text-purple-700 transition-all transform hover:scale-105 hover:border-purple-500 hover:bg-purple-100"
            >
              <div className="text-center">
                <div className="text-7xl mb-3">🏆</div>
                <h3 className="text-xl font-semibold mb-2">Resultados</h3>
                <p className="text-sm">
                  Consulta los resultados de las votaciones
                </p>
              </div>
            </Link>

            <Link
              to="/Algoritmos"
              className="block p-6 rounded-lg border-2 border-red-300 bg-red-50 text-red-700 transition-all transform hover:scale-105 hover:border-red-500 hover:bg-red-100"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">
                  <img src="/src/assets/img/play.png" alt="Algoritmos" className="mx-auto mb-2" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Algoritmos</h3>
                <p className="text-sm">
                  Consulta los algoritmos utilizados en las votaciones
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Información Importante:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Solo puedes votar una vez por elección</li>
              <li>• Asegúrate de revisar tu selección antes de confirmar</li>
              <li>• Los resultados se actualizan en tiempo real</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
