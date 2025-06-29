import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CerrarVotaciones = () => {
    const [votacionesAbiertas, setVotacionesAbiertas] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [actionType, setActionType] = useState(''); // 'abrir' o 'cerrar'
    const navigate = useNavigate();

    // Cargar datos del usuario desde localStorage
    useEffect(() => {
        try {
            const userData = localStorage.getItem('usuario');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                if (parsedUser.rol === 1) {
                    setUser(parsedUser);
                } else {
                    navigate('/mainpage');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
            navigate('/');
        }
    }, [navigate]);

    const handleToggleVotaciones = (action) => {
        setActionType(action);
        setConfirmModal(true);
    };

    const confirmarAccion = async () => {
        setLoading(true);
        setConfirmModal(false);

        try {
            // Simular llamada a la API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (actionType === 'cerrar') {
                setVotacionesAbiertas(false);
            } else {
                setVotacionesAbiertas(true);
            }
        } catch (error) {
            console.error('Error al cambiar estado de votaciones:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    const volverAlPanel = () => {
        navigate('/mainpage-admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {actionType === 'cerrar' ? 'Cerrando votaciones...' : 'Abriendo votaciones...'}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Por favor espera un momento...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-blue-600 text-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src="/src/assets/img/nacional.png" alt="Partido 1" className="h-11 w-20" />
                        <img src="/src/assets/img/Liberal.png" alt="Partido 2" className="h-11 w-20" />
                        <img src="/src/assets/img/libre.png" alt="Partido 3" className="h-11 w-20" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">
                            Control de Votaciones - Sistema Electoral
                        </h2>
                        {user && (
                            <p className="text-blue-100 text-sm">
                                Administrador: {user.identidad}
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={volverAlPanel}
                            className="px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 rounded transition-colors"
                        >
                            Volver al Panel
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

            {/* Contenido principal */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Estado actual */}
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 ${
                            votacionesAbiertas 
                                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                                : 'bg-red-100 text-red-800 border-2 border-red-300'
                        }`}>
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                                votacionesAbiertas ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            Estado: {votacionesAbiertas ? 'VOTACIONES ABIERTAS' : 'VOTACIONES CERRADAS'}
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Control del Proceso Electoral
                        </h1>
                        <p className="text-lg text-gray-600">
                            Administra el estado de las votaciones del sistema electoral
                        </p>
                    </div>

                    {/* Panel de control */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Cerrar Votaciones */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                            <div className="text-center">
                                <div className="text-5xl mb-4">🔒</div>
                                <h3 className="text-xl font-bold text-red-800 mb-3">
                                    Cerrar Votaciones
                                </h3>
                                <p className="text-sm text-red-600 mb-4">
                                    Finaliza el proceso de votación. Una vez cerradas, no se podrán registrar más votos.
                                </p>
                                <button
                                    onClick={() => handleToggleVotaciones('cerrar')}
                                    disabled={!votacionesAbiertas}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                                        votacionesAbiertas
                                            ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {votacionesAbiertas ? 'Cerrar Votaciones' : 'Ya están cerradas'}
                                </button>
                            </div>
                        </div>

                        {/* Abrir Votaciones */}
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                            <div className="text-center">
                                <div className="text-5xl mb-4">🗳️</div>
                                <h3 className="text-xl font-bold text-green-800 mb-3">
                                    Abrir Votaciones
                                </h3>
                                <p className="text-sm text-green-600 mb-4">
                                    Inicia o reactiva el proceso de votación. Los ciudadanos podrán ejercer su voto.
                                </p>
                                <button
                                    onClick={() => handleToggleVotaciones('abrir')}
                                    disabled={votacionesAbiertas}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                                        !votacionesAbiertas
                                            ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {!votacionesAbiertas ? 'Abrir Votaciones' : 'Ya están abiertas'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Información del sistema */}
                    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                            <span className="text-blue-600 mr-2">ℹ️</span>
                            Información del Sistema
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="font-semibold text-blue-700">Estado:</span>
                                <span className={`ml-2 ${votacionesAbiertas ? 'text-green-600' : 'text-red-600'}`}>
                                    {votacionesAbiertas ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                            <div>
                                <span className="font-semibold text-blue-700">Última modificación:</span>
                                <span className="ml-2 text-blue-600">
                                    {new Date().toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="font-semibold text-blue-700">Administrador:</span>
                                <span className="ml-2 text-blue-600">
                                    {user?.identidad || 'No definido'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Advertencias */}
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                            <span className="text-yellow-600 mr-2">⚠️</span>
                            Advertencias Importantes
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• Una vez cerradas las votaciones, los resultados se consideran definitivos</li>
                            <li>• Asegúrate de que todos los votantes hayan participado antes de cerrar</li>
                            <li>• La reapertura de votaciones debe hacerse con extrema precaución</li>
                            <li>• Todos los cambios quedan registrados en el sistema</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación */}
            {confirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className={`text-6xl mb-4 ${actionType === 'cerrar' ? 'text-red-500' : 'text-green-500'}`}>
                                {actionType === 'cerrar' ? '🔒' : '🗳️'}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Confirmar {actionType === 'cerrar' ? 'Cierre' : 'Apertura'} de Votaciones
                            </h3>
                            <p className="text-gray-600 mb-6">
                                ¿Estás seguro de que deseas {actionType === 'cerrar' ? 'cerrar' : 'abrir'} las votaciones?
                                {actionType === 'cerrar' && ' Esta acción no se puede deshacer fácilmente.'}
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setConfirmModal(false)}
                                    className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmarAccion}
                                    className={`flex-1 py-2 px-4 rounded-lg text-white font-semibold transition-colors ${
                                        actionType === 'cerrar'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {actionType === 'cerrar' ? 'Cerrar' : 'Abrir'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CerrarVotaciones;