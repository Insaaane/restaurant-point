import React, { useState, useEffect } from 'react';

import TableItem from './TableItem.jsx';
import Loading from '../Loading.jsx';

import { URLS } from '../../utils/urls.js';

export default function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch(URLS.TABLES)
      .then(response => response.json())
      .then(data => setTables(data))
      .catch(error => console.error('Ошибка при получении данных о столах:', error));
  }, []);

  if (tables.length === 0) {
    return (
      <Loading/>
    )
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
