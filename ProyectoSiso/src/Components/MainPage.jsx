import React from "react";

const MainPage= () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Bienvenido a la Página Principal</h1>

        <p className="text-lg mb-4">Aquí puedes navegar a diferentes secciones:</p>
        <div className="flex space-x-4">
          <a href="/cerrar-votaciones" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Cerrar Votaciones</a>
          <a href="/votar" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Votar</a>
          <a href="/ganadores" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Ganadores</a>
        </div>
      </div>
      
    </div>
    );
  };
export default MainPage;
