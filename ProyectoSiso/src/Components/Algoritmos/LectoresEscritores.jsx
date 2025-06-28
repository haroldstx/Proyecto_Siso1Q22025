import React, { useState,useEffect } from "react";
import lec from "../../assets/img/lec.png"
const AlgoritmoLectoresEscritores = () => {
  const [cl, setCl] = useState(0);
  const [escritorActivo, setEscritorActivo] = useState(false);
  const [colaSolicitudes, setColaSolicitudes] = useState([]);
  const [log, setLog] = useState([]);
  const [contadorId, setContadorId] = useState(1);

  const agregarLog = (msg) => {
    setLog((prev) => [msg, ...prev]);
  };

  const solicitarLector = () => {
    const id = contadorId;
    setContadorId(id + 1);
    setColaSolicitudes((prev) => [...prev, { tipo: 'lector', id }]);
    agregarLog(`📥 Lector ${id} solicitó acceso`);
  };

  const solicitarEscritor = () => {
    const id = contadorId;
    setContadorId(id + 1);
    setColaSolicitudes((prev) => [...prev, { tipo: 'escritor', id }]);
    agregarLog(`📥 Escritor ${id} solicitó acceso`);
  };

  useEffect(() => {
    if (colaSolicitudes.length === 0) return;
    if (escritorActivo) return;

    const siguiente = colaSolicitudes[0];

    if (siguiente.tipo === 'lector') {
      const lectoresEntrantes = [];

      for (const req of colaSolicitudes) {
        if (req.tipo === 'lector') lectoresEntrantes.push(req);
        else break;
      }

      if (lectoresEntrantes.length > 0) {
        setCl((prev) => prev + lectoresEntrantes.length);
        agregarLog(`📖 ${lectoresEntrantes.length} lector(es) entran simultáneamente (IDs: ${lectoresEntrantes.map(r => r.id).join(', ')})`);
        setColaSolicitudes((prev) => prev.slice(lectoresEntrantes.length));
      }
    } else if (siguiente.tipo === 'escritor') {
      if (cl === 0) {
        setEscritorActivo(true);
        agregarLog(`✍️ Escritor ${siguiente.id} entra`);
        setColaSolicitudes((prev) => prev.slice(1));
      }
    }
  }, [colaSolicitudes, cl, escritorActivo]);

  const salirLector = () => {
    if (cl === 0) {
      agregarLog('⚠️ No hay lectores activos para salir');
      return;
    }
    setCl((prev) => {
      const nuevos = prev - 1;
      agregarLog(`📕 Lector sale, lectores activos restantes: ${nuevos}`);

      if (nuevos === 0) {
        setTimeout(() => {
          setColaSolicitudes((prevCola) => [...prevCola]);
        }, 0);
      }
      return nuevos;
    });
  };

  const salirEscritor = () => {
    if (!escritorActivo) {
      agregarLog('⚠️ No hay escritor activo para salir');
      return;
    }
    setEscritorActivo(false);
    agregarLog('📗 Escritor sale');

    setTimeout(() => {
      setColaSolicitudes((prevCola) => [...prevCola]);
    }, 0);
  };

  // Estilos CSS
  const estilos = {
    contenedor: {
      padding: 20,
      maxWidth: 700,
      margin: 'auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f7f9fc',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    titulo: {
      textAlign: 'center',
      color: '#333',
      marginBottom: 20,
    },
    estado: {
      fontSize: 16,
      marginBottom: 20,
      color: '#555',
    },
    botonesContenedor: {
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'center',
      gap: 15,
      flexWrap: 'wrap',
    },
    boton: {
      padding: '10px 18px',
      borderRadius: 5,
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: 14,
      transition: 'background-color 0.3s ease',
    },
    botonLector: {
      backgroundColor: '#4caf50',
      color: 'white',
    },
    botonEscritor: {
      backgroundColor: '#2196f3',
      color: 'white',
    },
    botonSalir: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    colaLista: {
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 6,
      padding: 10,
      maxHeight: 150,
      overflowY: 'auto',
      boxShadow: 'inset 0 0 5px #ccc',
      color: '#333',
      fontWeight: '600',
    },
    logLista: {
      maxHeight: 250,
      overflowY: 'auto',
      border: '1px solid #ccc',
      padding: 10,
      borderRadius: 6,
      backgroundColor: 'white',
      fontSize: 14,
      color: '#444',
      lineHeight: '1.4em',
    },
    itemLector: { color: '#4caf50' },
    itemEscritor: { color: '#2196f3' },
  };

  return (
    <div>
        <h1 style={{fontSize:"30px"}}><strong>Problema de Lectores Escritores</strong></h1>
        <br></br>
                <br></br>
        <p style={{fontSize:"16px"}}>
        El problema de los lectores y escritores, que modela el acceso a una base de datos. 
        Por ejemplo, imagine un sistema de reservación de aerolíneas, con muchos procesos en competencia que desean 
        leer y escribir en él. Es aceptable tener varios procesos que lean la base de datos
al mismo tiempo, pero si un proceso está actualizando (escribiendo) la base de datos, ningún otro
proceso puede tener acceso a la base de datos, ni siquiera los lectores.
      </p>
      <br></br>

      <hr style={{ margin: '30px 0' }} />
      <br></br>
      <p style={{fontSize:"16px"}}>Ahora suponga que aparece un escritor. Tal vez éste no sea admitido a la base de datos, ya que
los escritores deben tener acceso exclusivo y por ende, el escritor se suspende. Más adelante aparecen lectores adicionales. 
Mientras que haya un lector activo, se admitirán los siguientes lectores.
Como consecuencia de esta estrategia, mientras que haya un suministro continuo de lectores, todos
entrarán tan pronto lleguen. El escritor estará suspendido hasta que no haya un lector presente.  
cuando llega un lector y hay un escritor en espera, el lector se suspende detrás del escritor, en vez
de ser admitido de inmediato. De esta forma, un escritor tiene que esperar a que terminen los lectores que estaban 
activos cuando llegó, pero no tiene que esperar a los lectores que llegaron después de él. La desventaja de esta 
solución es que logra una menor concurrencia y por ende, un
menor rendimiento. 
</p>
      <br></br>
      <br></br>
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Problema de Lectores y Escritores</h2>

      <p style={estilos.estado}>
        Lectores activos: <strong>{cl}</strong> <br />
        Escritor activo: <strong>{escritorActivo ? 'Sí' : 'No'}</strong>
      </p>

      <div style={estilos.botonesContenedor}>
        <button
          onClick={solicitarLector}
          style={{ ...estilos.boton, ...estilos.botonLector }}
          title="Solicitar acceso como lector"
        >
          Solicitar acceso lector
        </button>
        <button
          onClick={solicitarEscritor}
          style={{ ...estilos.boton, ...estilos.botonEscritor }}
          title="Solicitar acceso como escritor"
        >
          Solicitar acceso escritor
        </button>
      </div>

      <div style={estilos.botonesContenedor}>
        <button
          onClick={salirLector}
          disabled={cl === 0}
          style={{ ...estilos.boton, ...estilos.botonSalir, opacity: cl === 0 ? 0.5 : 1 }}
          title="Un lector sale"
        >
          Salir lector
        </button>
        <button
          onClick={salirEscritor}
          disabled={!escritorActivo}
          style={{ ...estilos.boton, ...estilos.botonSalir, opacity: !escritorActivo ? 0.5 : 1 }}
          title="Escritor sale"
        >
          Salir escritor
        </button>
      </div>

      <h3>Cola de solicitudes</h3>
      <ul style={estilos.colaLista}>
        {colaSolicitudes.length === 0 && <li style={{ color: '#888' }}>La cola está vacía</li>}
        {colaSolicitudes.map(({ tipo, id }, i) => (
          <li
            key={i}
            style={tipo === 'lector' ? estilos.itemLector : estilos.itemEscritor}
          >
            {tipo === 'lector' ? 'Lector' : 'Escritor'} {id}
          </li>
        ))}
      </ul>

      <h3>Historial de eventos</h3>
      <ul style={estilos.logLista}>
        {log.length === 0 && <li style={{ color: '#888' }}>No hay eventos aún</li>}
        {log.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
        
    </div>
     <br></br>
                    <br></br>
                   <h2><strong>PseudoCódigo del Problema de Lectores y Escritores</strong></h2>

                    <img src={lec} alt="PseudoLectoresEscritores" />
    </div>
  );
};

export default AlgoritmoLectoresEscritores;
