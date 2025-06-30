import React from 'react';
import { Card, Button } from 'antd';

export const CardExample = ({ id, nombre, partido, imagen, seleccionado, onSeleccionar }) => (
  <Card
    hoverable
    style={{ width: 240, border: seleccionado ? '2px solid blue' : undefined }}
    cover={
      <img
        alt={nombre}
        src={imagen}
        style={{
          height: '160px',
          objectFit: 'contain',
          padding: '10px'
        }}
      />
    }
  >
    <div style={{ marginBottom: 10 }}>
      <strong style={{ fontSize: '16px' }}>{nombre}</strong><br />
      <span style={{ fontSize: '14px', color: '#555' }}>{partido}</span>
    </div>
    <Button
      type={seleccionado ? 'default' : 'primary'}
      danger={seleccionado}
      style={{ marginTop: 10, width: '100%' }}
      onClick={onSeleccionar}
    >
      {seleccionado ? '❌ Seleccionado' : 'Marcar'}
    </Button>
  </Card>
);