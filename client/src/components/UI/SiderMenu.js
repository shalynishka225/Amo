import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useState } from 'react';
import { IconsList } from './IconsList';
import NumberInput from './NumberInput';

export const SiderMenu = (props) => {
  const [search, setSearch] = useState('');

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="app" disabled icon={<SearchOutlined />}>
          Пошук в базі
        </Menu.Item>
      </Menu>
      <div style={{ marginLeft: '5px', marginRight: '5px' }}>
        <Input
          placeholder="Пошук по Прізвищу"
          onChange={(value) => setSearch(value.target.value)}
        />
      </div>
      <div style={{ marginLeft: '5px', marginRight: '5px' }}>
        <Input
          placeholder="Пошук по місту"
          onChange={(value) => setSearch(value.target.value)}
        />
      </div>
      <NumberInput />

      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => props.state(search.toLowerCase())}
        >
          Пошук
        </Button>
      </div>
      <br />
      <IconsList />
    </Sider>
  );
};
