import React from 'react';

export const WorkerCard = ({ worker }) => {
    return (
        <>
        <div>
            <h2>Монтажник</h2>
            <p>Ваша анкета: <a href={worker.to} target="_blank" rel="noopener noreferrer">{worker.to}</a></p>
            <p>Имя: {worker.firstName}</p>
            <p>Фамилия: {worker.secondName}</p>
            <p>Отчество: {worker.thirdName}</p>
            <p>Дата создания анкеты: <strong>{new Date(worker.date).toLocaleDateString()}</strong></p>
        </div>
            
        </>
    )
}