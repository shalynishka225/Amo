import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { Header } = Layout;

  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <NavLink to="/create">Создать</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/workers">Работники</NavLink>
        </Menu.Item>
        <Menu.Item key='3'>
          <NavLink to="/workers/my">Моя анкета</NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="/" onClick={logoutHandler}>
            Выйти
          </a>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
