import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { CardDiputado } from './CardDiputado';

const { Header, Content } = Layout;

function VotarDiputados() {
  const [diputados, setDiputados] = useState([]);
  const [diputadosSeleccionados, setDiputadosSeleccionados] = useState([]);
  const [searchParams] = useSearchParams();
  const idPresidente = searchParams.get("id_presidente");

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = () => navigate('/mainpage');

  const obtenerInfoPartido = (partidoId) => {
    switch (parseInt(partidoId)) {
      case 1: return { nombre: 'Libre', imagen: '/src/assets/img/libre.png' };
      case 2: return { nombre: 'Liberal', imagen: '/src/assets/img/Liberal.png' };
      case 3: return { nombre: 'Nacional', imagen: '/src/assets/img/nacional.png' };
      default: return { nombre: 'Desconocido', imagen: '' };
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:8000/Backend/get_diputados.php')
      .then(res => res.json())
      .then(data => setDiputados(data))
      .catch(err => console.error('Error al cargar diputados:', err));
  }, []);

  const toggleSeleccion = (id) => {
    if (diputadosSeleccionados.includes(id)) {
      setDiputadosSeleccionados(prev => prev.filter(d => d !== id));
    } else if (diputadosSeleccionados.length < 23) {
      setDiputadosSeleccionados(prev => [...prev, id]);
    }
  };

  const irAVotarAlcalde = () => {
    const idsDiputados = diputadosSeleccionados.join(",");
    navigate(`/votar-alcalde?id_presidente=${idPresidente}&ids_diputados=${idsDiputados}`);
  };

  const cardContainerStyle = {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: '#fff',
    padding: 24,
    marginBottom: 30,
    borderRadius: 8,
  };

  const renderGrupo = (titulo, imgSrc, diputadosGrupo) => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img src={imgSrc} alt={titulo} className="h-11 w-20" />
        <h2 style={{ margin: 0, fontSize: "16px" }}><strong>{titulo}</strong></h2>
      </div>
      <div style={cardContainerStyle}>
        {diputadosGrupo.map((p) => {
          const partido = obtenerInfoPartido(p.Partido);
          return (
            <CardDiputado
              key={p.Id}
              nombre={p.Nombre}
              partido={partido.nombre}
              seleccionado={diputadosSeleccionados.includes(p.Id)}
              onSeleccionar={() => toggleSeleccion(p.Id)}
            />
          );
        })}
      </div>
    </>
  );

  const diputadosLibre = diputados.filter((p) => parseInt(p.Partido) === 1);
  const diputadosLiberal = diputados.filter((p) => parseInt(p.Partido) === 2);
  const diputadosNacional = diputados.filter((p) => parseInt(p.Partido) === 3);

  return (
    <div className=''>
      <Layout>
        <Header style={{ backgroundColor: 'white', padding: '10px', height: '150px', borderBottom: '2px solid #138C8A', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1000px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img src="/src/assets/img/votacion.png" alt="Logo" className="h-11 w-20" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Portal de Votaciones - Ciudadano</h2>
                {user && <p className="text-sm text-gray-600">Identidad: {user.identidad} | Teléfono: {user.telefono}</p>}
              </div>
              <button onClick={logout} className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded" style={{ cursor: "pointer" }}>CANCELAR VOTACION</button>
            </div>
          </div>
        </Header>

        <Layout>
          <Layout>
            <Content style={{ backgroundColor: '#91e3f7', padding: 10 }}>
              <h1 style={{ textAlign: 'center', fontSize: '28px', margin: '30px 0 20px 0', color: '#071785' }}>
                <strong>VOTACIÓN DE DIPUTADOS - FRANCISCO MORAZÁN</strong>
              </h1>

              {diputados.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Cargando diputados...</p>
              ) : (
                <>
                  {renderGrupo("PARTIDO LIBRE", "/src/assets/img/libre.png", diputadosLibre)}
                  {renderGrupo("PARTIDO LIBERAL", "/src/assets/img/Liberal.png", diputadosLiberal)}
                  {renderGrupo("PARTIDO NACIONAL", "/src/assets/img/nacional.png", diputadosNacional)}
                </>
              )}

              <div style={{ position: 'fixed', bottom: 70, right: 40, zIndex: 1000 }}>
                <Button
                  type="primary"
                  disabled={diputadosSeleccionados.length === 0}
                  style={{ height: "50px", fontSize: "18px" }}
                  onClick={irAVotarAlcalde}
                >
                  Siguiente
                </Button>
              </div>
            </Content>
          </Layout>
        </Layout>

        <Footer style={{ textAlign: 'center', borderTop: '2px solid #138C8A', borderTopColor: "#071785" }}>
          <label>Página de Votación de Diputados 2025</label>
        </Footer>
      </Layout>
    </div>
  );
}

export default VotarDiputados;
