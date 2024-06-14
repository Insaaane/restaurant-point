import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { minDate } from '../../utils/date.js';

import table1 from '../../assets/images/table-1.jpg';
import table2 from '../../assets/images/table-2.jpg';
import table3 from '../../assets/images/table-3.jpg';

export default function TableItem({ table }) {
  const [date, setDate] = useState('');

  let IMG_SRC = table1;
  if (table.id % 3 === 0) {
    IMG_SRC = table3;
  } else if (table.id % 3 === 2) {
    IMG_SRC = table2;
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="tables__item">
      <img src={IMG_SRC} alt="Изображение стола" className="tables__item_img"/>

      <div className="tables__item_info">
        <p className="tables__item_label label">название</p>
        <p className="tables__item_text">{table.title}</p>

        <p className="tables__item_label label">описание</p>
        <p className="tables__item_text desc">{table.description}</p>

        <p className="tables__item_label label">цена</p>
        <p className="tables__item_text">{table.price} руб./ч.</p>

        <p className="tables__item_label label">дата</p>
        <input 
          type="date" 
          min={minDate}
          className="tables__item_text input" 
          value={date} 
          onChange={handleDateChange} 
        />
      </div>

      <Link to='/order' state={{ table, date }} className={`tables__item_btn button ${!date || date < minDate ? 'disabled' : ''}`}>Найти свободные места</Link>
    </div>
  )
}
