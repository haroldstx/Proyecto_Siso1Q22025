import React, { useState, useEffect } from 'react';
import { Layout, Button, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { CardExample } from '../Card';

const { Header, Content } = Layout;

function VotarAlcalde() {
  const [alcaldeSeleccionado, setAlcaldeSeleccionado] = useState(null);
  const [Alcaldes, setAlcaldes] = useState([]);
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const idPresidente = searchParams.get("id_presidente");
  const idsDiputados = searchParams.get("ids_diputados"); // se espera como "1,2,3"

  const navigate = useNavigate();

  const logout = () => {
    navigate('/mainpage');
  };

  const obtenerInfoPartido = (partidoId) => {
    switch (parseInt(partidoId)) {
      case 1:
        return { nombre: 'Libre', imagen: '/src/assets/img/libre.png' };
      case 2:
        return { nombre: 'Liberal', imagen: '/src/assets/img/Liberal.png' };
      case 3:
        return { nombre: 'Nacional', imagen: '/src/assets/img/nacional.png' };
      default:
        return { nombre: 'Desconocido', imagen: '' };
    }
  };

  useEffect(() => {
    try {
      const userData = localStorage.getItem('usuario');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:8000/Backend/get_alcaldes.php')
      .then(res => res.json())
      .then(data => setAlcaldes(data))
      .catch(err => console.error('Error al cargar alcaldes:', err));
  }, []);

  const manejarVoto = (id) => {
    setAlcaldeSeleccionado(id);
  };

  const enviarVotos = () => {
    if (!alcaldeSeleccionado || !idPresidente || !idsDiputados || !user) {
      message.error('Faltan datos para registrar el voto');
      return;
    }

    const payload = {
      dni: user.identidad,
      id_presidente: idPresidente,
      id_alcalde: alcaldeSeleccionado,
      ids_diputados: idsDiputados
    };

    fetch('http://localhost:8000/Backend/enviar_votos.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          message.success('¡Voto registrado exitosamente!');
          navigate('/mainpage');
        } else {
          message.error(data.message || 'Error al registrar voto');
        }
      })
      .catch(err => {
        console.error('Error al enviar votos:', err);
        message.error('Error del servidor al enviar votos');
      });
  };

  return (
    <div className=''>
      <Layout>
        <Header style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          height: '150px',
          borderBottom: '2px solid #138C8A'
        }}>
          <div style={{ width: '100%', maxWidth: '1000px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <img src="/src/assets/img/votacion.png" alt="Logo" className="h-11 w-20" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Portal de Votaciones - Ciudadano
                </h2>
                {user && (
                  <p className="text-sm text-gray-600">
                    Identidad: {user.identidad} | Teléfono: {user.telefono}
                  </p>
                )}
              </div>
              <button onClick={logout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                style={{ cursor: "pointer" }}
              >
                CANCELAR VOTACIÓN
              </button>
            </div>
          </div>
        </Header>

        <Layout>
          <Content style={{ backgroundColor: '#91e3f7', padding: 10 }}>
            <h1 style={{
              textAlign: 'center',
              fontSize: '28px',
              margin: '30px 0 20px 0',
              color: '#071785'
            }}>
              <strong>VOTACIÓN DE ALCALDE - DISTRITO CENTRAL</strong>
            </h1>

            <div style={{
              background: '#fff',
              padding: 24,
              minHeight: 580,
              maxHeight: '500px',
              overflowY: 'auto',
              display: 'flex',
              gap: 20,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
                <div
              style={{
    background: '#fff',
    padding: 24,
    maxHeight: 'calc(100vh - 250px)',
    overflowY: 'auto',
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }}>
              {Alcaldes.length === 0 ? (
                <p>Cargando alcaldes...</p>
              ) : (
                Alcaldes.map((p) => {
                  const partido = obtenerInfoPartido(p.Partido);
                  return (
                    <CardExample
                      key={p.Id}
                      id={p.Id}
                      nombre={p.Nombre}
                      partido={partido.nombre}
                      imagen={partido.imagen}
                      seleccionado={alcaldeSeleccionado === p.Id}
                      onSeleccionar={() => manejarVoto(p.Id)}
                    />
                  );
                })
              )}
              </div>
            </div>

            <div style={{
              position: 'fixed',
              bottom: 70,
              right: 40,
              zIndex: 1000
            }}>
              <Button
                type="primary"
                disabled={!alcaldeSeleccionado}
                onClick={enviarVotos}
                style={{ height: '50px', fontSize: '18px' }}
              >
                Enviar Votos
              </Button>
            </div>
          </Content>
        </Layout>

        <Footer style={{
          textAlign: 'center',
          borderTop: '2px solid #138C8A',
          borderTopColor: "#071785"
        }}>
          <label>Página de Votación de Alcaldes 2025</label>
        </Footer>
      </Layout>
    </div>
  );
}

export default VotarAlcalde;
