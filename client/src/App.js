import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

const { Content, Footer } = Layout;

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <Layout>
          <Content
            className="site-layout container"
            style={{ padding: "0 50px", marginTop: 64 }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 0, minHeight: 380 }}
            >
              <h1>{routes}</h1>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Antd design ©2020</Footer>
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
