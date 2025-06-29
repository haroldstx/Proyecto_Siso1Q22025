import React from 'react';

/**
 * Componente de pantalla de carga
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje a mostrar durante la carga
 * @returns {React.ReactNode} - Componente de carga
 */
const LoadingScreen = ({ message = "Cargando..." }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Spinner de carga */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          
          {/* Mensaje */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {message}
          </h2>
          
          <p className="text-gray-600 text-sm">
            Por favor espera un momento...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
