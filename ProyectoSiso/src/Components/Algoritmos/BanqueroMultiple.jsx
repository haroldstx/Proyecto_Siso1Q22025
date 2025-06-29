import React, { useState } from "react";
import mult from "../../assets/img/mult.png"
const AlgoritmoBanqueroMultiple = () => {
  const [disponibles, setDisponibles] = useState([10, 5, 3]); // CPU, Memoria, Impresoras
  const [log, setLog] = useState([]);

  const [procesos, setProcesos] = useState([
    { id: "P1", max: [7, 4, 3], asignado: [0, 0, 0] },
    { id: "P2", max: [5, 2, 1], asignado: [0, 0, 0] },
    { id: "P3", max: [3, 3, 2], asignado: [0, 0, 0] },
  ]);

  const [solicitudes, setSolicitudes] = useState({
    P1: [0, 0, 0],
    P2: [0, 0, 0],
    P3: [0, 0, 0],
  });

  const sumarArrays = (a, b) => a.map((v, i) => v + b[i]);
  const restarArrays = (a, b) => a.map((v, i) => v - b[i]);
  const menorIgual = (a, b) => a.every((v, i) => v <= b[i]);

  const agregarLog = (mensaje) => {
    setLog((prev) => [mensaje, ...prev]);
  };

  const verificarEstadoSeguro = (disponiblesTemp, procesosTemp) => {
    let disponibles = [...disponiblesTemp];
    let finalizados = new Set();

    let progreso = true;
    while (progreso) {
      progreso = false;
      for (const p of procesosTemp) {
        if (finalizados.has(p.id)) continue;
        const necesidad = p.max.map((maxR, i) => maxR - p.asignado[i]);
        if (menorIgual(necesidad, disponibles)) {
          disponibles = sumarArrays(disponibles, p.asignado);
          finalizados.add(p.id);
          progreso = true;
        }
      }
    }
    return finalizados.size === procesosTemp.length;
  };

  const solicitar = (pid) => {
    const p = procesos.find((pr) => pr.id === pid);
    const solicitud = solicitudes[pid];

    if (solicitud.some((v) => v < 0 || !Number.isInteger(v))) {
      agregarLog(`⚠️ ${pid} hizo una solicitud inválida (números enteros >= 0).`);
      return;
    }

    const nuevoAsignado = sumarArrays(p.asignado, solicitud);

    if (!menorIgual(nuevoAsignado, p.max)) {
      agregarLog(`❌ ${pid} excede su máximo permitido.`);
      return;
    }
    if (!menorIgual(solicitud, disponibles)) {
      agregarLog(`❌ No hay suficientes recursos disponibles para ${pid}.`);
      return;
    }

    const nuevosDisponibles = restarArrays(disponibles, solicitud);
    const procesosSimulados = procesos.map((pr) =>
      pr.id === pid ? { ...pr, asignado: nuevoAsignado } : pr
    );

    if (verificarEstadoSeguro(nuevosDisponibles, procesosSimulados)) {
      setProcesos(procesosSimulados);
      setDisponibles(nuevosDisponibles);
      agregarLog(
        `✅ ${pid} recibió recursos: CPU ${solicitud[0]}, Memoria ${solicitud[1]}, Impresoras ${solicitud[2]}.`
      );
      setSolicitudes((prev) => ({ ...prev, [pid]: [0, 0, 0] }));
    } else {
      agregarLog(`❌ Solicitud de ${pid} causaría estado inseguro. Denegada.`);
    }
  };

  const terminarProceso = (pid) => {
    const p = procesos.find((pr) => pr.id === pid);
    if (p.asignado.every((r) => r === 0)) {
      agregarLog(`ℹ️ ${pid} no tiene recursos asignados para liberar.`);
      return;
    }
    const nuevosDisponibles = sumarArrays(disponibles, p.asignado);
    const procesosActualizados = procesos.map((pr) =>
      pr.id === pid ? { ...pr, asignado: [0, 0, 0] } : pr
    );
    setProcesos(procesosActualizados);
    setDisponibles(nuevosDisponibles);
    agregarLog(`🔄 ${pid} terminó y liberó sus recursos.`);
  };

  const manejarCambioInput = (pid, recursoIndex, valor) => {
    const num = Number(valor);
    setSolicitudes((prev) => ({
      ...prev,
      [pid]: prev[pid].map((v, i) => (i === recursoIndex ? (num >= 0 ? num : 0) : v)),
    }));
  };

  return (
    <div>
      <h1 style={{fontSize:"30px"}}><strong>Algoritmo del Banquero para varios Recursos</strong></h1>
<br></br>
        <br></br>
    <p style={{fontSize:"16px"}}>
  En vez de tener solo una cantidad total de recursos, ahora el algoritmo controla varios recursos diferentes 
  (p. ej., CPU, memoria, impresoras). La lógica es igual, pero se verifica que para cada recurso el sistema 
  pueda mantener un estado seguro.
</p>
<hr style={{ margin: '30px 0' }} />
<div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Algoritmo del Banquero para varios Recursos</h2>
      <p>
        Recursos disponibles: CPU = <strong>{disponibles[0]}</strong>, Memoria ={" "}
        <strong>{disponibles[1]}</strong>, Impresoras ={" "}
        <strong>{disponibles[2]}</strong>
      </p>

      {procesos.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <strong>{p.id}</strong>
          <p>
            Máximo: [CPU: {p.max[0]}, Memoria: {p.max[1]}, Impresoras: {p.max[2]}]
            <br />
            Asignado: [CPU: {p.asignado[0]}, Memoria: {p.asignado[1]}, Impresoras: {p.asignado[2]}]
          </p>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <label>
              CPU:
              <input
                type="number"
                min={0}
                max={p.max[0] - p.asignado[0]}
                value={solicitudes[p.id][0]}
                onChange={(e) => manejarCambioInput(p.id, 0, e.target.value)}
                style={{ width: 60, marginLeft: 5 }}
              />
            </label>
            <label>
              Memoria:
              <input
                type="number"
                min={0}
                max={p.max[1] - p.asignado[1]}
                value={solicitudes[p.id][1]}
                onChange={(e) => manejarCambioInput(p.id, 1, e.target.value)}
                style={{ width: 60, marginLeft: 5 }}
              />
            </label>
            <label>
              Impresoras:
              <input
                type="number"
                min={0}
                max={p.max[2] - p.asignado[2]}
                value={solicitudes[p.id][2]}
                onChange={(e) => manejarCambioInput(p.id, 2, e.target.value)}
                style={{ width: 60, marginLeft: 5 }}
              />
            </label>
            <button onClick={() => solicitar(p.id)} style={{ marginLeft: 10,backgroundColor:"lightgreen",cursor:"pointer" }}>
              Solicitar
            </button>
            <button
              onClick={() => terminarProceso(p.id)}
              style={{ marginLeft: 10, backgroundColor: "#f44336", color: "white",cursor:"pointer" }}
            >
              Terminar Proceso
            </button>
          </div>
        </div>
      ))}

      <hr />
      <h3>Registro de solicitudes</h3>
      <ul>
        {log.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      </div>
      <br></br>
      <br></br>
      <h2>PseudoCodigo del algoritmo Banquero para varios Recursos</h2>
      <img src={mult} alt="PseudoBanquero" />
    </div>
  );
};

export default AlgoritmoBanqueroMultiple;
