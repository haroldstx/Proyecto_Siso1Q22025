import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const Login = () => {
  const [formData, setFormData] = useState({
    identidad: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Validando credenciales...');
  const navigate = useNavigate();
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
      formDataToSend.append('DNI', formData.identidad);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('rol', '0'); // Asumimos rol ciudadano (0)

      console.log('Enviando petición a:', '/Backend/test_conexion.php');

      // Primero probamos la conexión y validación
      const response = await fetch('http://localhost:8000/Backend/test_conexion.php', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Respuesta recibida del response de conexion:', response.status, response.statusText);

      const data = await response.json();
      console.log('Datos recibidos:', data);

      if (!response.ok) {
        throw new Error(`${data.message || response.statusText}`);
      }
      
      if (data.success) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify({
          identidad: data.data.identidad,
          telefono: data.data.telefono,
          rol: data.data.rol, 
          yavoto: data.data.yavoto,
        }));
        
        // Redirigir segun si el usuario es 0 o 1
        if (data.data.rol === 0) {
          // Cambiar mensaje y mostrar loading por 2 segundos antes de redirigir
          setLoadingMessage('¡Bienvenido! Redirigiendo al portal de ciudadanos...');
          setTimeout(() => {
            navigate('/mainpage');
          }, 2000);
        } else if (data.data.rol === 1) {
          // Cambiar mensaje y mostrar loading por 2 segundos antes de redirigir
          setLoadingMessage('¡Bienvenido Administrador! Accediendo al panel de control...');
          setTimeout(() => {
            navigate('/mainpage-admin');
          }, 2000);
        }
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
        setError(`${error.message}`);
      }
    } finally {
      // Solo resetear loading si no estamos en proceso de redirección exitosa
      if (!localStorage.getItem('usuario')) {
        setLoading(false);
        setLoadingMessage('Error al validar credenciales - Inténtalo de nuevo');
      }
    }
  };

  // Mostrar pantalla de carga cuando está validando credenciales
  if (loading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      {/* Fondo opcional, puedes descomentar la siguiente línea si quieres usar una imagen de
    //style={{ backgroundImage: 'url(/src/assets/img/hn.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      */}
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8">
        
        {/* Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-1 space-x-4 items-center">
            <img src="/src/assets/img/votacion.png" alt="Logo" className="h-18 w-18" />
            <img src="/src/assets/img/unitec.png" alt="Logo" className="h-40 w-70" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Bienvenido al Centro de Votaciones De Honduras (Unitec)
          </h2>
          <p className="text-center text-gray-500 mb-8">Por favor ingresa tus datos</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Número de Identidad:
              </label>
              <input
                type="text"
                name="identidad"
                value={formData.identidad}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  fieldErrors.identidad ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="ejem: 0401-1999-99999"
                required
              />
              {fieldErrors.identidad && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.identidad}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Teléfono:
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  fieldErrors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="ejem: +504 9999-9999"
                required
              />
              {fieldErrors.telefono && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.telefono}</p>
              )}   
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? 'Validando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>

        {/* Illustration */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <img
            src="/src/assets/img/image.png"
            alt="Illustration"
            className="w-full h-auto max-w"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Login;
