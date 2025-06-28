import React, { useState, useRef } from 'react';
import barb from "../../assets/img/barb.png"
const AlgoritmoBarberoDurmiente = () => {
  const [maxSillas, setMaxSillas] = useState(3); // <-- ahora editable
  const [clientesEsperando, setClientesEsperando] = useState([]);
  const [barberoOcupado, setBarberoOcupado] = useState(false);
  const [log, setLog] = useState([]);
  const clienteIdRef = useRef(1);
  const timerRef = useRef(null);

  const agregarLog = (msg) => {
    setLog((prev) => [msg, ...prev]);
  };

  const llegarCliente = () => {
    const id = clienteIdRef.current++;
    if (clientesEsperando.length >= maxSillas) {
      agregarLog(`Cliente ${id} llega y se va: sala llena.`);
      return;
    }
    setClientesEsperando((prev) => [...prev, id]);
    agregarLog(`Cliente ${id} llega y espera.`);
  };

   const empezarCorte = () => {
  if (barberoOcupado) {
    agregarLog('El barbero ya está atendiendo.');
    return;
  }

  const atenderSiguienteCliente = (clientesRestantes) => {
    if (clientesRestantes.length === 0) {
      setBarberoOcupado(false);
      agregarLog('No hay más clientes. El barbero se duerme.');
      return;
    }

    const clienteActual = clientesRestantes[0];
    setBarberoOcupado(true);
    agregarLog(`Barbero empieza a atender al cliente ${clienteActual}.`);

    timerRef.current = setTimeout(() => {
      agregarLog(`Barbero terminó con cliente ${clienteActual}.`);
      const nuevosClientes = clientesRestantes.slice(1);
      setClientesEsperando(nuevosClientes);
      atenderSiguienteCliente(nuevosClientes);
    }, 3000);
  };

  atenderSiguienteCliente(clientesEsperando);
};


  const terminarAtencion = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (barberoOcupado && clientesEsperando.length > 0) {
      const clienteActual = clientesEsperando[0];
      setBarberoOcupado(false);
      setClientesEsperando((prev) => prev.slice(1));
      agregarLog(`Atención terminada manualmente para cliente ${clienteActual}.`);
    } else {
      agregarLog('No hay atención en curso para terminar.');
    }
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: 600,
      margin: '20px auto',
      padding: 20,
      backgroundColor: '#f0f4f8',
      borderRadius: 10,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    title: { textAlign: 'center', marginBottom: 20, color: '#333' },
    button: {
      padding: '10px 15px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: 5,
      cursor: 'pointer',
      fontWeight: 'bold',
      marginRight: 10,
      marginBottom: 20,
      transition: 'background-color 0.3s',
    },
    buttonDisabled: {
      backgroundColor: '#90a4ae',
      cursor: 'not-allowed',
    },
    salaEspera: {
      minHeight: 50,
      backgroundColor: '#e3f2fd',
      borderRadius: 6,
      padding: 10,
      marginBottom: 20,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    cliente: {
      width: 40,
      height: 40,
      backgroundColor: '#4caf50',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    barbero: {
      width: 60,
      height: 60,
      backgroundColor: barberoOcupado ? '#f3f7a5' : '#90a4ae',
      borderRadius: '50%',
      margin: '0 auto 20px auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      boxShadow: barberoOcupado ? '0 0 15px 5px #f44336' : 'none',
      transition: 'background-color 0.3s, box-shadow 0.3s',
    },
    logContainer: {
      maxHeight: 200,
      overflowY: 'auto',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 6,
      boxShadow: 'inset 0 0 5px #ccc',
      fontSize: 14,
      color: '#333',
    },
    logItem: {
      marginBottom: 6,
    },
    input: {
      width: 60,
      padding: 5,
      fontSize: 14,
      borderRadius: 4,
      border: '1px solid #ccc',
      marginLeft: 10,
    }
  };

  return (
    <div>
        <h1 style={{fontSize:"30px"}}><strong>Problema del Barbero Durmiente</strong></h1>
        <br></br>
                <br></br>
         <p style={{fontSize:"16px"}}>
       El problema del barbero durmiente trata sobre un barbero y sus clientes en una barbería. 
       Si no hay clientes, el barbero duerme. Si llega un cliente y el barbero está durmiendo, lo despierta. Si el 
       barbero está ocupado, los clientes esperan en sillas vacías o se van si no hay sillas disponibles. 
Cuando el barbero logra terminar un corte de pelo a un cliente, revisa la sala de espera para ver si hay más clientes esperando y si los hay, los atiende
hasta finalizar el corte para todos los clientes en la sala de espera.
      </p>
      <br></br>

      <hr style={{ margin: '30px 0' }} />
    <div style={styles.container}>
      <h2 style={styles.title}>Problema del Barbero Durmiente</h2>

      <div style={styles.barbero}>
        {barberoOcupado ? '✂️' : 'zzz'}
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          Capacidad sala de espera:
          <input
            type="number"
            min={1}
            style={styles.input}
            value={maxSillas}
            onChange={(e) => setMaxSillas(parseInt(e.target.value) || 1)}
          />
        </label>
      </div>

      <button style={styles.button} onClick={llegarCliente}>
        Llegar nuevo cliente
      </button>

      <button
        style={barberoOcupado ? { ...styles.button, ...styles.buttonDisabled } : { ...styles.button, backgroundColor: '#b646f2' }}
        onClick={empezarCorte}
        disabled={barberoOcupado}
      >
        Empezar corte
      </button>

      <button
        style={!barberoOcupado ? { ...styles.button, ...styles.buttonDisabled } : { ...styles.button, backgroundColor: '#f44336' }}
        onClick={terminarAtencion}
        disabled={!barberoOcupado}
      >
        Terminar atención
      </button>

      <div>
        <strong>Sala de espera (capacidad {maxSillas}):</strong>
        <div style={styles.salaEspera}>
          {clientesEsperando.length === 0 && <span>No hay clientes esperando</span>}
          {clientesEsperando.map((id) => (
            <div key={id} style={styles.cliente}>
              {id}
            </div>
          ))}
        </div>
      </div>

      <div>
        <strong>Registro de eventos:</strong>
        <div style={styles.logContainer}>
          {log.length === 0 && <div style={styles.logItem}>No hay eventos aún</div>}
          {log.map((msg, i) => (
            <div key={i} style={styles.logItem}>
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>

    <br></br>
                        <br></br>
                       <h2><strong>PseudoCódigo del Problema del Barbero Durmiente</strong></h2>
    
                        <img src={barb} alt="PseudoBarbero" />
    </div>
  );
};

export default AlgoritmoBarberoDurmiente;
