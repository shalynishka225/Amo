import React from 'react';
//import {Link} from 'react-router-dom';

export const WorkersList = ({ workers }) => {

    if(!workers.length) {
        return <p>Анкет пока нет</p>
    }

    return (
        <div>
            <h2>{workers.firstName}</h2>
        </div>
    )
}