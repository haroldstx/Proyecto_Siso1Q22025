import React from 'react';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {/* ...campos del formulario... */}
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Usuario</label>
          <input type="text" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;