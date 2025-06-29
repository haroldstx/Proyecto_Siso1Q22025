import React, { useState } from 'react';
import solo1 from "../../assets/img/solo1.png"
import solo2 from "../../assets/img/solo2.png"
const AlgoritmoBanqueroSolo = () => {
  const [disponibles, setDisponibles] = useState(10); // cantidad total de recursos disponibles
  const [log, setLog] = useState([]);
  const [procesos, setProcesos] = useState([
    { id: 'P1', max: 7, asignado: 0 },
    { id: 'P2', max: 5, asignado: 0 },
    { id: 'P3', max: 3, asignado: 0 }
  ]);

  const solicitar = (pid, cantidad) => {
    const p = procesos.find(pr => pr.id === pid);
    const nuevoAsignado = p.asignado + cantidad;

    // Validaciones básicas
    if (cantidad <= 0) {
      agregarLog(`⚠️ ${pid} hizo una solicitud inválida.`);
      return;
    }
    if (nuevoAsignado > p.max) {
      agregarLog(`❌ ${pid} excede su máximo (${p.max}). Solicitud denegada.`);
      return;
    }
    if (cantidad > disponibles) {
      agregarLog(`❌ No hay suficientes recursos disponibles para ${pid}.`);
      return;
    }

    // Simular asignación temporal para verificar seguridad
    const nuevosDisponibles = disponibles - cantidad;
    const procesosSimulados = procesos.map(pr =>
      pr.id === pid ? { ...pr, asignado: nuevoAsignado } : pr
    );

    // Verificación de estado seguro (simple): hay recursos para liberar eventualmente
    const seguro = verificarEstadoSeguro(nuevosDisponibles, procesosSimulados);

    if (seguro) {
      setProcesos(procesosSimulados);
      setDisponibles(nuevosDisponibles);
      agregarLog(`✅ ${pid} recibió ${cantidad} recursos.`);
    } else {
      agregarLog(`❌ Solicitud de ${pid} causaría estado inseguro. Denegada.`);
    }
  };

  // Función nueva para que un proceso termine y libere recursos
  const terminarProceso = (pid) => {
    const p = procesos.find(pr => pr.id === pid);
    if (p.asignado === 0) {
      agregarLog(`⚠️ ${pid} no tiene recursos asignados para liberar.`);
      return;
    }
    const nuevosProcesos = procesos.map(pr =>
      pr.id === pid ? { ...pr, asignado: 0 } : pr
    );
    setProcesos(nuevosProcesos);
    setDisponibles(disponibles + p.asignado);
    agregarLog(`🟢 ${pid} terminó y liberó ${p.asignado} recursos.`);
  };

  const verificarEstadoSeguro = (disponiblesTemp, procesosTemp) => {
    let disponibles = disponiblesTemp;
    let finalizados = new Set();

    let progreso = true;
    while (progreso) {
      progreso = false;
      for (const p of procesosTemp) {
        if (finalizados.has(p.id)) continue;
        const necesidad = p.max - p.asignado;
        if (necesidad <= disponibles) {
          disponibles += p.asignado;
          finalizados.add(p.id);
          progreso = true;
        }
      }
    }

    return finalizados.size === procesosTemp.length;
  };

  const agregarLog = (mensaje) => {
    setLog(prev => [mensaje, ...prev]);
  };

  return (
    <div>
<h1 style={{fontSize:"30px"}}><strong>Algoritmo del Banquero para un solo Recurso</strong></h1>
<br></br>
        <br></br>
      <p style={{fontSize:"16px"}}>
        Se modela de la forma en que un banquero de una
        pequeña ciudad podría tratar con un grupo de clientes a los que ha otorgado líneas de crédito. Lo
        que hace el algoritmo es comprobar si al otorgar la petición se produce un estado inseguro. Si es
        así, la petición se rechaza. Si al otorgar la petición se produce un estado seguro, se lleva a cabo.
      </p>
      <br></br>

      <hr style={{ margin: '30px 0' }} />
      <br></br>
      <p style={{fontSize:"16px"}}>Para ver si un estado es seguro, el banquero comprueba si tiene los suficientes
        recursos para satisfacer a algún cliente. De ser así, se asume que esos préstamos volverán a pagarse y
        ahora se comprueba el cliente más cercano al límite, etcétera. Si todos los préstamos se pueden
        volver a pagar en un momento dado, el estado es seguro y la petición inicial se puede otorgar.</p>
      <br></br>
      <br></br>
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Algoritmo del Banquero (1 recurso compartido)</h2>
        <p>Recursos disponibles: <strong>{disponibles}</strong></p>

        {procesos.map(p => (
          <div key={p.id} style={{ marginBottom: 10 }}>
            <strong>{p.id}</strong> - Asignado: {p.asignado} / Máximo: {p.max}
            <div style={{ marginTop: 5 }}>
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => solicitar(p.id, n)}
                  style={{ marginRight: 5 ,cursor:"pointer"}}
                >
                  Solicitar {n}
                </button>
              ))}
              {/* Botón para terminar el proceso y liberar recursos */}
              <button
                onClick={() => terminarProceso(p.id)}
                style={{ marginLeft: 10, backgroundColor: 'lightgreen' ,cursor:"pointer"}}
              >
                Terminar {p.id}
              </button>
            </div>
          </div>
        ))}

        <hr />
        <h3>Registro de solicitudes</h3>
        <ul>
          {log.map((msg, idx) => <li key={idx}>{msg}</li>)}
        </ul>
        
      </div>
      <br></br>
        <br></br>
        <h2>PseudoCodigo del algoritmo Banquero para un solo Recurso</h2>
        <img src={solo1} alt="PseudoBanquero1" />
        <img src={solo2} alt="PseudoBanquero2" />
    </div>
  );
};

export default AlgoritmoBanqueroSolo;
