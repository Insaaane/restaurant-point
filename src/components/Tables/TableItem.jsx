import React from 'react';
import { Link } from 'react-router-dom';

import table1 from '../../assets/images/table-1.jpg';
import table2 from '../../assets/images/table-2.jpg';
import table3 from '../../assets/images/table-3.jpg';

export default function TableItem() {
  return (
    <div className="tables__item">
      <img src={table1} alt="Изображение стола" className="tables__item_img"/>

      <div className="tables__item_info">
        <p className="tables__item_label label">название</p>
        <p className="tables__item_text">Большой шведский стол</p>

        <p className="tables__item_label label">описание</p>
        <p className="tables__item_text desc">
          Шведский стол, буфет — способ подачи пищи, при котором множество блюд выставляются рядом, и еда
          разбирается
          по тарелкам самими гостями. Также предоставляется
        </p>

        <p className="tables__item_label label">цена</p>
        <p className="tables__item_text">1000 руб./ч.</p>

        <p className="tables__item_label label">дата</p>
        <input type="date" className="tables__item_text input" />
      </div>

      <Link to='/order' className="tables__item_btn button">Найти свободные места</Link>
    </div>
  )
}
