import React from 'react';
import { Card, Button } from 'antd';

export const CardDiputado = ({ nombre, partido, seleccionado, onSeleccionar }) => (
  <Card
    hoverable
    style={{ width: 240, border: seleccionado ? '2px solid blue' : '1px solid #d9d9d9' }}
  >
    <div style={{ marginBottom: 10 }}>
      <strong style={{ fontSize: '16px' }}>{nombre}</strong><br />
      <span style={{ fontSize: '14px', color: '#555' }}>{partido}</span>
    </div>
    <Button
      type={seleccionado ? "default" : "primary"}
      onClick={onSeleccionar}
      style={{
        marginTop: 10,
        width: '100%',
        backgroundColor: seleccionado ? "#f5222d" : undefined,
        color: seleccionado ? "#fff" : undefined
      }}
    >
      {seleccionado ? 'X' : 'MARCAR'}
    </Button>
  </Card>
);
