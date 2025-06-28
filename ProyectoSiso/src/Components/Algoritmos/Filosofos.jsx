import React, { useState } from 'react';
import fi from "../../assets/img/fi.png"
const NUM_FILOSOFOS = 5;

const AlgoritmoFilosofosComelones = () => {
 const [estados, setEstados] = useState(Array(NUM_FILOSOFOS).fill('Pensando'));
  const [tenedores, setTenedores] = useState(Array(NUM_FILOSOFOS).fill(false));
  const [log, setLog] = useState([]);

  const izquierda = (i) => i;
  const derecha = (i) => (i + 1) % NUM_FILOSOFOS;

  const agregarLog = (mensaje) => {
    setLog((prev) => [mensaje, ...prev]);
  };

  const intentarComer = (i) => {
    const tIzq = izquierda(i);
    const tDer = derecha(i);

    if (!tenedores[tIzq] && !tenedores[tDer]) {
      const nuevosTenedores = [...tenedores];
      nuevosTenedores[tIzq] = true;
      nuevosTenedores[tDer] = true;

      const nuevosEstados = [...estados];
      nuevosEstados[i] = 'Comiendo';

      setTenedores(nuevosTenedores);
      setEstados(nuevosEstados);
    } else {
      agregarLog(`⚠️ Filósofo ${i} no puede comer. Un tenedor está ocupado.`);
    }
  };

  const terminarDeComer = (i) => {
    const tIzq = izquierda(i);
    const tDer = derecha(i);

    const nuevosTenedores = [...tenedores];
    nuevosTenedores[tIzq] = false;
    nuevosTenedores[tDer] = false;

    const nuevosEstados = [...estados];
    nuevosEstados[i] = 'Pensando';

    setTenedores(nuevosTenedores);
    setEstados(nuevosEstados);
  };

  const getColor = (estado) =>
    estado === 'Comiendo' ? '#4CAF50' : estado === 'Esperando' ? '#FFC107' : '#2196F3';

  return (
    <div>
        <h1 style={{fontSize:"30px"}}><strong>Problema de los Filosofos Comelones</strong></h1>
        <br></br>
        <br></br>
       <p style={{fontSize:"16px"}}>
        En 1965, Dijkstra propuso y resolvió un problema de sincronización al que llamó el problema de
los filósofos comelones. Desde ese momento, todos los que inventaban otra primitiva de sincronización 
se sentían obligados a demostrar qué tan maravillosa era esa nueva primitiva, al mostrar con
qué elegancia resolvía el problema de los filósofos comelones. Este problema se puede enunciar
simplemente de la siguiente manera. Cinco filósofos están sentados alrededor de una mesa circular.
Cada filósofo tiene un plato de espagueti. El espagueti es tan resbaloso, que un filósofo necesita dos
tenedores para comerlo. Entre cada par de platos hay un tenedor. 
      </p>
      <br></br>

      <hr style={{ margin: '30px 0' }} />
      <br></br>
      <p style={{fontSize:"16px"}}>La vida de un filósofo consiste en periodos alternos de comer y pensar (esto es algo así como
una abstracción, incluso para los filósofos, pero las otras actividades son irrelevantes aquí). Cuando 
un filósofo tiene hambre, trata de adquirir sus tenedores izquierdo y derecho, uno a la vez, en
cualquier orden. Si tiene éxito al adquirir dos tenedores, come por un momento, después deja los
tenedores y continúa pensando. </p>
      <br></br>
      <br></br>
<div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
<h2>Problema de los Filósofos Comelones</h2>
      <p>Haz clic en <strong>Comer</strong> para que un filósofo intente tomar sus tenedores.</p>
</div>
      <div
        style={{
          position: 'relative',
          width: 400,
          height: 400,
          margin: '40px auto',
          borderRadius: '50%',
          border: '2px dashed #ccc',
        }}
      >
        {estados.map((estado, i) => {
          const angle = (360 / NUM_FILOSOFOS) * i;
          const radius = 150;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 200 + y - 50,
                left: 200 + x - 50,
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: getColor(estado),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 0 8px rgba(0,0,0,0.3)',
              }}
            >
              <div><strong>F{i}</strong></div>
              <div style={{ fontSize: 12 }}>{estado}</div>
              <div style={{ marginTop: 6 }}>
                <button onClick={() => intentarComer(i)} disabled={estado === 'Comiendo'}>
                  Comer
                </button>
                <button
                  onClick={() => terminarDeComer(i)}
                  disabled={estado !== 'Comiendo'}
                  style={{ marginTop: 4 }}
                >
                  / Parar
                </button>
              </div>
            </div>
          );
        })}
      </div>
<div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2 style={{fontSize:"18px"}}>Registro de eventos</h2>
      <ul>
        {log.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      </div>
      <br></br>
              <br></br>
              <h2>PseudoCodigo del Problema de los Filosofos Comelones</h2>
              <img src={fi} alt="PseudoFilosofos" />
    </div>
  );
};

export default AlgoritmoFilosofosComelones;
