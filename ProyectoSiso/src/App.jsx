import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import MainPage from './Components/MainPage';
import CerrarVotaciones from './Components/CerrarVotaciones';
import Votar from './Components/Votar';
import Ganadores from './Components/Ganadores';
import MainPageAdmin from './Components/MainPageAdmin';
import AlgoritmosPage from './Components/AlgoritmosPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/cerrar-votaciones" element={<CerrarVotaciones />} />
        <Route path="/votar" element={<Votar />} />
        <Route path="/ganadores" element={<Ganadores />} />
        <Route path="/mainpage-admin" element={<MainPageAdmin />} />
       <Route path="/Algoritmos" element={<AlgoritmosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
