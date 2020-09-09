import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { useRoutes } from './routes';
import { BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import { Navbar } from './components/Navbar';

const { Content, Footer } = Layout;


function App() {
  const {token,login,logout,userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
    <Router>
    { isAuthenticated && <Navbar /> }
      <Layout>
    <Content className="site-layout container" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <h1>{ routes }</h1>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Mapuik design ©2020</Footer>
  </Layout>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
