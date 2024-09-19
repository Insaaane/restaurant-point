import React, { useState, useEffect } from 'react';

import TableItem from './TableItem.jsx';
import Loading from '../Loading.jsx';

import { URLS } from '../../utils/urls.js';

export default function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch(URLS.TABLES)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных о столах');
        }
      })
      .then(data => setTables(data))
      .catch(error => {
        console.error('Ошибка', error);
        // alert('Ошибка при получении данных о столах.');
        setTables([{
          id: 2,
          title: 'VIP-столик',
          description: 'Стол для важных персон',
          price: 5000
        },
        {
          id: 3,
          title: 'Столик для двоих',
          description: 'Для романтического ужина',
          price: 2000
        },
        {
          id: 1,
          title: 'Банкетный стол',
          description: 'Стол для проведения мероприятий',
          price: 10000
        }])
      });
  }, []);

  if (tables.length === 0) {
    return <Loading/>;
  }

  return (
    <main className="tables">
      <div className="tables__wrap wrapper">
        <h1 className="tables__title title">Список всех столов</h1>

        <div className="tables__list">

          {tables.map((table, index) => (
            <TableItem key={index} table={table} />
          ))}

        </div>
      </div>
    </main>
  )
}
