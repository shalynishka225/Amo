import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export const SelectRegion = (props) => {
  return (
    <Select
      defaultValue="Виберіть область"
      style={{ width: '100%' }}
      onChange={() => {}}
    >
      <Option value="Одеська область">Одеська область</Option>
      <Option value="Дніпропетровська область">Дніпропетровська область</Option>
      <Option value="Чернігівська область">Чернігівська область</Option>
      <Option value="Харківська область">Харківська область</Option>
      <Option value="Житомирська область">Житомирська область</Option>
      <Option value="Полтавська область">Полтавська область</Option>
    </Select>
  );
};
