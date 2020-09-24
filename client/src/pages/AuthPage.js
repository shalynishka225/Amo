import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Button, Input, Space, notification } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";



export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const openNotification = (message, error) => {
        notification.open({
          message: message,
          description: error,
        });
      };
    
    
    const { loading, request, error, clearError } = useHttp();

    const [form, setForm] = useState({
        email:'', password:''
    });

    useEffect(() => {
        
        if(error) {
            openNotification('Ошибка',error);
            clearError();
        };
        
          
        
    }, [error, clearError]);



    const changeHadler = event => {
        setForm({ ...form, [event.target.name]:event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            openNotification('Регистрация прошла успешно',data.message);
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            openNotification('Вход выполнен успешно',data.message);
        } catch (e) {
            
        }
    }

  return (
    <Row>
      <Col span={6} offset={10} className="myClass">
        Сайт ассоциации монтажников
        <Card title="Авторизация" style={{ width: 300 }}>
        <Space direction="vertical">
        <Input
            placeholder="Введите Email" 
            name="email"
            id="email"
            type="text"
            onChange={changeHadler}
            value={form.email}
            prefix={<UserOutlined />}
        />
        
        <Input.Password
            placeholder="Введите пароль"
            name="password"
            onChange={changeHadler}
            value={form.password}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        </Space>
        <br />
        <br />
        
        <Button type="primary" style={{ marginRight: 10 }} disabled={ loading } onClick={loginHandler}>Войти</Button>
        <Button type="primary" onClick={ registerHandler } disabled={ loading }>Регистрация</Button>
        </Card>
      </Col>
    </Row>
  );
};
