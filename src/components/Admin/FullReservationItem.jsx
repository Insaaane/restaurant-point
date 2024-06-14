import React from 'react';

import { STATUS } from '../../utils/urls';
import { formatDate, minDateTime } from '../../utils/date.js';

export default function FullReservationItem({ reservation, onCancel, onConfirm, isStaff }) {
  const handleCancel = () => {
    onCancel(reservation.id);
  };

  const handleConfirm = () => {
    onConfirm(reservation.id);
  };

  return (
    <div className="reservations-item">
      <div className="reservations-item__column table">
        <p className="reservations-item__label label">стол</p>
        <p className="reservations-item__text">{reservation.table.title}</p>

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

      <div className="reservations-item__column name">
        <p className="reservations-item__label label">имя бронирующего</p>
        <p className="reservations-item__text">{reservation.user.first_name}</p>

        <p className="reservations-item__label label">фамилия бронирующего</p>
        <p className="reservations-item__text end">{reservation.user.last_name}</p>
      </div>

      <div className="reservations-item__column contacts">
        <p className="reservations-item__label label">email бронирующего</p>
        <p className="reservations-item__text">{reservation.user.email}</p>

        <p className="reservations-item__label label">телефон бронирующего</p>
        <p className="reservations-item__text end">{reservation.user.phone_number}</p>
      </div>

      {((reservation.status !== 'CANCEL' && reservation.start_datetime > minDateTime) || 
        (reservation.status !== 'CANCEL' && isStaff)) && (
        <div className="reservations-item__buttons_wrap">
          {reservation.status === 'VERIFY' && (
            <button className="reservations-item__check-btn" onClick={handleConfirm}>
              <svg className="reservations-item__check-icon" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.8191 14.634L1.54427 7.72598L0 9.557L10.1135 18L24 1.53495L22.1614 0L9.8191 14.634Z" fill="#14191A"/>
              </svg>
            </button>
          )}

          <button className="reservations-item__delete-btn" onClick={handleCancel}>
            <svg className="reservations-item__delete-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.2785 11.824L3 19.199L4.6653 20.8864L11.9438 13.5114L19.3347 21.0003L21 19.3129L13.6091 11.824L20.6522 4.6874L18.9869 3L11.9438 10.1366L5.01306 3.11389L3.34776 4.80129L10.2785 11.824Z" fill="#14191A"/>
            </svg>
          </button>
        </div>
      )}
      
    </div>
  )
}
