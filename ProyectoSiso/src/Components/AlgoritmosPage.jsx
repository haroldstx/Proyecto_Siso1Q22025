import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, Avatar, Typography,DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/bandera.png'
import bandera from '../assets/img/admin-icono.png'
import AlgoritmoAvestruz from './Algoritmos/Avestruz';
import AlgoritmoBanqueroSolo from './Algoritmos/Banquerosolo';
import AlgoritmoBanqueroMultiple from './Algoritmos/BanqueroMultiple';
import AlgoritmoFilosofosComelones from './Algoritmos/Filosofos';
import AlgoritmoLectoresEscritores from './Algoritmos/LectoresEscritores';
import AlgoritmoBarberoDurmiente from './Algoritmos/BarberoDurmiente';
import { Footer } from 'antd/es/layout/layout';

import imgflecha from '../assets/img/flecha.png'
import imgsalir from '../assets/img/log-out.png'
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

function AlgoritmosPage() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('Avestruz');

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'Avestruz':
        return <AlgoritmoAvestruz></AlgoritmoAvestruz>;
        ;
        case 'BanqueroUnico':
        return <AlgoritmoBanqueroSolo></AlgoritmoBanqueroSolo>
        ;
        case 'BanqueroMultiple':
        return <AlgoritmoBanqueroMultiple></AlgoritmoBanqueroMultiple>
        ;
        case 'Filosofos':
        return <AlgoritmoFilosofosComelones></AlgoritmoFilosofosComelones>
        ;
        case 'Lectores':
        return <AlgoritmoLectoresEscritores></AlgoritmoLectoresEscritores>
        ;
        case 'Barbero':
        return <AlgoritmoBarberoDurmiente></AlgoritmoBarberoDurmiente>
        ;
        case 'salir':
          return navigate("/") ;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  const renderBreadcrumbs = () => {
    switch (selectedKey) {
      case 'Avestruz':
        return (
          <>
            <Breadcrumb.Item>Algoritmo del Avestruz</Breadcrumb.Item>
          </>
        );

      case 'BanqueroUnico':
        return (
          <>
            <Breadcrumb.Item>Algoritmo del Banquero para un solo Recurso</Breadcrumb.Item>
          </>
        );
        case 'BanqueroMultiple':
        return (
          <>
            <Breadcrumb.Item>Algoritmo del Banquero para Varios Recursos</Breadcrumb.Item>
          </>
        );
        case 'Filosofos':
        return (
          <>
            <Breadcrumb.Item>Problema de los Filosofos Comelones</Breadcrumb.Item>
          </>
        );
        case 'Lectores':
        return (
          <>
            <Breadcrumb.Item>Problema de Lectores Escritores</Breadcrumb.Item>
          </>
        );
        case 'Barbero':
        return (
          <>
            <Breadcrumb.Item>Problema del Barbero Durmiente</Breadcrumb.Item>
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
            <Title style={{color: 'black', margin: '0 0 0 15px' }} level={1}>Página Informativa</Title>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={bandera} style={{ width: '50px', height: '50px' }} />
          </div>
        </Header>
        

        <Layout>
          <Sider width={"12%"} style={{ backgroundColor: '#00cbf7' }}>
            <br /><br />
            <Menu
              defaultSelectedKeys={['Avestruz']}
              mode="inline"
              onClick={handleMenuClick}
            >
              <Menu.Item key='Avestruz'>
                <span>
                  <Avatar src={imgflecha} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Algoritmo Avestruz</span>
                </span>
              </Menu.Item>

              <Menu.Item key='BanqueroUnico'>
                <span>
                  <Avatar src={imgflecha} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Banquero/Un Solo Recurso</span>
                </span>
              </Menu.Item>

              <Menu.Item key='BanqueroMultiple'>
                <span>
                  <Avatar src={imgflecha} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Banquero/Varios Recursos</span>
                </span>
              </Menu.Item>

              <Menu.Item key='Filosofos'>
                <span>
                  <Avatar src={imgflecha} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Filosofos Comelones</span>
                </span>
              </Menu.Item>

                <Menu.Item key='Lectores'>
                <span>
                  <Avatar src={imgflecha} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Lectores Escritores</span>
                </span>
              </Menu.Item>

              <Menu.Item key='Barbero'>
                <span>
                  <Avatar src={imgflecha} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px"}}>Barbero Durmiente</span>
                </span>
              </Menu.Item>

              <Menu.Item key='salir'>
                <span>
                  <Avatar src={imgsalir} style={{ width: '20px', height: '20px' }} />
                  <span style={{marginLeft:"5px", color:"red"}}>Volver</span>
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
              <label>Página informativa sobre algunos Algoritmos Codificados</label>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default AlgoritmosPage;
