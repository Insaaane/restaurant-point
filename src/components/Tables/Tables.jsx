import React from 'react';
import TableItem from './TableItem.jsx';

export default function Tables() {
  return (
    <main className="tables">
      <div className="tables__wrap wrapper">
        <h1 className="tables__title title">Список всех столов</h1>

        <div className="tables__list">

          <TableItem/>
          <TableItem/>
          <TableItem/>
          <TableItem/>
          <TableItem/>
          <TableItem/>
          <TableItem/>
          <TableItem/>
          <TableItem/>

        </div>
      </div>
    </main>
  )
}
