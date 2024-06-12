import React from 'react';

import { URLS } from '../../utils/urls.js';
import FullReservationItem from './FullReservationItem.jsx';

export default function Admin() {
  return (
    <main className="admin wrapper">
      <div className="admin__wrap">
      
        <div className="admin__panel">
          <h1 className="admin__title title">Панель администратора</h1>

          <div className="admin__mode_wrap">
            <div className="admin__mode_inner-wrap">
              <p className="admin__mode_label label">тип модерации</p>
              <p className="admin__mode_text">ручная</p>
            </div>

            <button className="admin__btn button">Изменить</button>
          </div>
          
          <a href={URLS.NEW_TABLE} target="_blank" className="admin__btn button">Создать стол</a>

          <div className="admin__dates_wrap">
            <form className="admin__date">
              <p className="admin__date_text">Просмотр всех бронирований</p>
              <p className="admin__date_label label">дата</p>
              <input type="date" className="admin__date_input input"/>

              <button className="admin__btn button">Поиск</button>            
            </form>

            <form className="admin__date">
              <p className="admin__date_text">Подтверждение бронирований</p>
              <p className="admin__date_label label">дата</p>
              <input type="date" className="admin__date_input input"/>

              <button className="admin__btn button">Поиск</button>            
            </form>
          </div>
        </div>
      
        <div className="admin__reservations">
          <h2 className="admin__title title">Просмотр бронирований</h2>

          <FullReservationItem/>
          <FullReservationItem/>
          <FullReservationItem/>

        </div>
        
      </div>
    </main>
  )
}
