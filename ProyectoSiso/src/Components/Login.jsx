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
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email: </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-9">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Password: </label>
              <input
                type="password"
                className="flex w-full px-3 py-2 border rounded"
                placeholder="Enter your password"
              />
              <Eye className="text-gray-500 w-5 h-5" />   
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mt-9">
            <label className="flex items-center space-x-2 py-9">
              <input type="checkbox" />
              <span>Remember for 30 days</span>

            </label>
            <a href="#" className="text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-9 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Log In
          </button>

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
