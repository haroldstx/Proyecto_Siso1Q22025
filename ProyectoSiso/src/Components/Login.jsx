import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    identidad: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    identidad: '',
    telefono: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores del campo cuando el usuario empiece a escribir
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Limpiar error general
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('identidad', formData.identidad);
      formDataToSend.append('telefono', formData.telefono);

      console.log('Enviando petición a:', '/Backend/test_conexion.php');

      // Primero probamos la conexión y validación
      const response = await fetch('/Backend/test_conexion.php', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Respuesta recibida del response de conexion:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error('Respuesta no es JSON:', textResponse);
        throw new Error('El servidor no devolvió JSON válido');
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      if (data.success) {
        // Si la validación y conexión son exitosas, redirigir
        window.location.href = '/Backend/votar_presidente.php';
      } else {
        // Manejar errores específicos de formato
        const errorMessage = data.message || 'Error en la validación';
        
        // Determinar si es error de identidad o teléfono
        if (errorMessage.toLowerCase().includes('identidad')) {
          setFieldErrors(prev => ({
            ...prev,
            identidad: errorMessage
          }));
        } else if (errorMessage.toLowerCase().includes('teléfono') || errorMessage.toLowerCase().includes('telefono')) {
          setFieldErrors(prev => ({
            ...prev,
            telefono: errorMessage
          }));
        } else {
          setError(errorMessage);
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('No se puede conectar con el servidor PHP. Verifica que esté ejecutándose en localhost:8000');
      } else if (error.message.includes('status: 500')) {
        setError('Error interno del servidor. Revisa la consola del navegador para más detalles o verifica el código PHP.');
      } else {
        setError(`Error de conexión: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md flex flex-col justify-center">
        <div className="flex justify-center mb-6">
          <div className="text-orange-500 text-4xl">
            <img src="/src/assets/img/votacion.png" alt="Logo" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Bienvenido al Centro de Votaciones De Honduras</h2>
        <p className="text-center text-gray-500 mb-6">Por favor ingresa tus datos</p>

        <form onSubmit={handleSubmit} className="bg-white py-9 rounded shadow-md w-full max-w-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Numero de Identidad </label>
            <input
              type="text"
              name="identidad"
              value={formData.identidad}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${
                fieldErrors.identidad ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="ejem: 0401-1999-99999"
              required
            />
            {fieldErrors.identidad && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.identidad}</p>
            )}
          </div>

          <div className="mb-9">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Telefono: </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded ${
                  fieldErrors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder=" ejem: +504 9999-9999"
                required
              />
              {fieldErrors.telefono && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.telefono}</p>
              )}   
          </div>

          <div className='mt-9 py-2 px-4'>
            <button
            type="submit"
            disabled={loading}
            className={`w-full text-white rounded-full font-semibold transition ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-800'
            }`}>
            {loading ? 'Validando...' : 'Log In'}
          </button>

          </div>
        </form>
      </div>

      {/* Illustration */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <img
          src="/src/assets/img/image.png"
          alt="Illustration"
          className="max-w-md"
        />
      </div>
    </div>
  );
};

export default Login;
