
import Login from './Components/Login.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './Components/AdminPage.jsx';

function App() {

  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path="/AMain" element={<AdminPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
