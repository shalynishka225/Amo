import React from "react";
import { Image, Table } from 'antd';

const columns = [
  {
    title: 'Види робіт',
    dataIndex: 'work',
  },
  {
    title: 'Монтаж',
    dataIndex: 'mounting',
    key: 'mounting',
  },
  {
    title: 'Діагностика поломок, ремонт',
    dataIndex: 'diagnostics',
    key: 'diagnostics',
  },
  {
    title: 'Сервісне обслуговування',
    dataIndex: 'service',
    key: 'service',
  },
];

export const WorkerCard = ({ worker }) => {
  return (
    <>
      <div>
        <h2>Монтажник</h2>
        <p>Имя: {worker.firstName}</p>
        <p>Фамилия: {worker.secondName}</p>
        <p>Отчество: {worker.thirdName}</p>
        <article> {worker.about} </article>
        <Image src={worker.avatar}/>
        <Table columns={columns} dataSource={worker.checkTable} bordered />

        <p>Дата создания анкеты:<strong>{new Date(worker.date).toLocaleDateString()}</strong></p>
      </div>
    </>
  );
};
