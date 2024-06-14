import React from 'react';

import { STATUS } from '../../utils/urls.js';
import { formatDate, minDate } from '../../utils/date.js';

export default function ReservationItem({ reservation, onDelete }) {

  const handleDelete = () => {
    onDelete(reservation.id);
  };

  return (
    <div className="reservations-item">
      <div className="reservations-item__column table">
        <p className="reservations-item__label label">стол</p>
        <p className="reservations-item__text">{reservation.table_title}</p>

        <p className="reservations-item__label label">статус</p>
        <p className={`reservations-item__text end ${STATUS[reservation.status].style}`}>{STATUS[reservation.status].text}</p>
      </div>

      <div className="reservations-item__column date">
        <p className="reservations-item__label label">начало бронирования</p>
        <p className="reservations-item__text">{formatDate(reservation.start_datetime)}</p>

        <p className="reservations-item__label label">окончание бронирования</p>
        <p className="reservations-item__text end">{formatDate(reservation.end_datetime)}</p>
      </div>

      <div className="reservations-item__column places">
        <p className="reservations-item__label label">забронированные места</p>
        <p className="reservations-item__text">{reservation.occupied_seats}</p>
      </div>

      {(reservation.status !== 'CANCEL' && reservation.start_datetime > minDate) && (
        <div className="reservations-item__delete-btn_wrap">
          <button className="reservations-item__delete-btn" onClick={handleDelete}>
            <svg className="reservations-item__delete-icon" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.11111 17.8947C2.11111 19.0526 3.06111 20 4.22222 20H14.7778C15.9389 20 16.8889 19.0526 16.8889 17.8947V4.21053H19V2.10526H12.6667V1.05263C12.6667 0.471279 12.1941 0 11.6111 0H7.38889C6.80592 0 6.33333 0.471279 6.33333 1.05263V2.10526H0V4.21053H2.11111V17.8947ZM8.44444 6.31579V15.7895H6.33333V6.31579H8.44444ZM12.6667 15.7895V6.31579H10.5556V15.7895H12.6667Z" fill="#B0B0B0"/>
            </svg>                
          </button>
        </div>
      )}
    </div>
  )
}
