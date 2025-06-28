import React, { useState } from 'react';
import ave from "../../assets/img/pseudoave.png"
const AlgoritmoAvestruz = () => {
const [dividendo, setDividendo] = useState('');
  const [divisor, setDivisor] = useState('');
  const [resultado, setResultado] = useState(null);
  const [log, setLog] = useState('');

  const ejecutarDivision = () => {
    const a = parseFloat(dividendo);
    const b = parseFloat(divisor);

    // Simula algoritmo del avestruz: ignoramos el caso divisor = 0
    if (b === 0) {
      console.warn('¡División entre 0 detectada! Pero no hacemos nada al respecto...');
      setResultado('Resultado indefinido');
      setLog('División inválida ignorada. (avestruz 🐦)');
      return;
    }

    setResultado(a / b);
    setLog('División realizada correctamente.');
  };

  return (
    <div >
<h1 style={{fontSize:"30px"}}><strong>Algoritmo del Avestruz</strong></h1>
<br></br>
        <br></br>
      <p style={{fontSize:"16px"}}>El algoritmo toma inspiración de la naturaleza de las avestruces, meta su cabeza en la arena y pretenda que no
hay ningún problema.  Las personas reaccionan a esta estrategia de diversas formas. Los matemáticos la encuentran totalmente
 inaceptable y dicen que los interbloqueos se deben prevenir a toda
costa; los ingenieros preguntan con qué frecuencia se espera el problema, con qué frecuencia falla
el sistema por otras razones y qué tan grave es un interbloqueo. Si ocurren interbloqueos en promedio 
de una vez cada cinco años, pero los fallos del sistema debido al hardware, errores del compilador
 y errores en el sistema operativo ocurren una vez por semana, la mayoría de los ingenieros no
estarán dispuestos a reducir considerablemente el rendimiento por la conveniencia de eliminar los
interbloqueos.</p>
<br></br>

<hr style={{ margin: '30px 0' }} />
<br></br>
    <p style={{fontSize:"16px"}}>Para que este contraste sea más específico, considere un sistema operativo que bloquea al proceso 
      llamador cuando no se puede llevar a cabo una llamada al sistema open en un dispositivo físico, 
      como una unidad de CD-ROM o una impresora, debido a que el dispositivo está muy ocupado.
Por lo general es responsabilidad del driver (controlador) de dispositivos decidir qué acción tomar
bajo tales circunstancias. Bloquear o devolver una clave de error son dos posibilidades obvias. Si
un proceso abre exitosamente la unidad de CD-ROM y otro la impresora, y después cada proceso
trata de abrir el otro recurso y se bloquea en el intento, tenemos un interbloqueo. Pocos sistemas actuales
 detectarán esto.</p>

      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Algoritmo del Avestruz (simulado)</h2>
      <p>Ingrese dos números y presione "Ejecutar división". Si el divisor es 0, lo ignoraremos.</p>

      <input
        type="number"
        placeholder="Dividendo"
        value={dividendo}
        onChange={(e) => setDividendo(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        type="number"
        placeholder="Divisor"
        value={divisor}
        onChange={(e) => setDivisor(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <button onClick={ejecutarDivision} style={{ padding: '10px 20px',cursor:"pointer" }}>
        Ejecutar división
      </button>

      <div style={{ marginTop: 20 }}>
        <strong>Resultado:</strong> {resultado !== null ? resultado : '---'}
        <br />
        <strong>Estado:</strong> {log}
      </div>
      </div>
      <h2>PseudoCodigo del algoritmo Avestruz</h2>
      <img src={ave} alt="PseudoAvestruz" />
    </div>
  );
};

export default AlgoritmoAvestruz;
