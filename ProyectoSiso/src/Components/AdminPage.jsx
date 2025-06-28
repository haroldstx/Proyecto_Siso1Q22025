import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, Avatar, Typography,DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/bandera.png'
import bandera from '../assets/img/admin-icono.png'

import settings from '../assets/img/settings.png';
import { Footer } from 'antd/es/layout/layout';

//import imgflecha from '../assets/img/flecha.png'
import imgsalir from '../assets/img/log-out.png'

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;
function AdminPage() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('Configuracion');

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'Configuracion':
        return 
        ;
        case 'salir':
          return navigate("/") ;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  const renderBreadcrumbs = () => {
    switch (selectedKey) {
      case 'Historial':
        return (
          <>
            <Breadcrumb.Item>Expedientes Médicos</Breadcrumb.Item>
            <Breadcrumb.Item>Historial</Breadcrumb.Item>
          </>
        );

      case 'Configuracion':
        return (
          <>
            <Breadcrumb.Item>Configuración</Breadcrumb.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='Home'>
      <Layout>
        <Header style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', height: '150px', borderBottom: '2px solid #138C8A' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '170px', height: '140px', objectFit: 'contain' }} />
            <Title style={{color: 'black', margin: '0 0 0 15px' }} level={1}>Panel de Control</Title>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={bandera} style={{ width: '50px', height: '50px' }} />
            <label style={{fontSize:"16px"}}><strong>Admin</strong></label>
          </div>
        </Header>
        

        <Layout>
          <Sider style={{ backgroundColor: '#00cbf7' }}>
            <br /><br />
            <Menu
              defaultSelectedKeys={['Configuracion']}
              mode="inline"
              onClick={handleMenuClick}
            >

              <Menu.Item key='Configuracion'>
                <span>
                  <Avatar src={settings} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Configuración</span>
                </span>
              </Menu.Item>
              <Menu.Item key='salir'>
                <span>
                  <Avatar src={imgsalir} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px", color:"red"}}>Cerrar sesión</span>
                </span>
              </Menu.Item>
            </Menu>
            
          </Sider>

          <Layout>
            <Content style={{ backgroundColor: '#d9ddde', padding: 10 }}>
                
              <Breadcrumb style={{ margin: '16px 0' }}>
                {renderBreadcrumbs()}
              </Breadcrumb>
              <div style={{ 
               background: '#fff', 
               padding: 24, 
                 minHeight: 580, 
               maxHeight: '500px',
                overflowY: 'auto'   
              }}
              >
                {renderContent()}
              </div>
            </Content>

            <Footer style={{ textAlign: 'center', borderTop: '2px solid #138C8A', borderTopColor: "#071785" }}>
              <label>Plataforma de Votación para Las Elecciones Generales del 2025</label>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminPage;
