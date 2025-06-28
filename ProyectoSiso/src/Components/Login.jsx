import React from 'react';
import { Eye } from 'lucide-react';

const Login = () => {
  return (
    <div className="flex tems-center justify-center min-h-screen bg-gray-100">
      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md flex flex-col justify-center">
        <div className="flex justify-center mb-6">
          <div className="text-orange-500 text-4xl">
            <img src="/src/assets/img/votacion.png" alt="Logo" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Bienvenido al Centro de Votaciones De Honduras</h2>
        <p className="text-center text-gray-500 mb-6">Por favor ingresa tus datos</p>

        <form className="bg-white py-9 rounded shadow-md w-full max-w-sm">

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Numero de Identidad </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="ejem: 0401-1999-99999"
            />
          </div>

          <div className="mb-9">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Telefono: </label>
              <input
                type="text"
                className="flex w-full px-3 py-2 border rounded"
                placeholder=" ejem: +504 9999-9999"
              />   
          </div>
          <div className='mt-9 py-2 px-4'>
            <button
            type="submit"
            className='w-full bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition'>
            Log In
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
