import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchWithAuth } from '../../utils/auth.js'
import { URLS, MODERATION_TYPE } from '../../utils/urls.js';
import { sortByDate } from '../../utils/date.js';

import FullReservationItem from './FullReservationItem.jsx';

export default function Admin() {
  const { state } = useLocation();

  const [moderationType, setModerationType] = useState('');

  const [reservations, setReservations] = useState(null);
  const [dateAll, setDateAll] = useState();
  const [dateVerify, setDateVerify] = useState();

  useEffect(() => {
    fetchWithAuth(URLS.MODERATION_TYPE)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных о типе модерации');
        }
      })
      .then(data => setModerationType(data.moderation_type))
      .catch(error => {
        console.error('Ошибка', error);
        alert('Ошибка при получении данных о типе модерации');
      });
  }, []);

  const handleModerationTypeChange = () => {
    let URL = '';
    let MOD_TYPE = '';
    
    if (moderationType === 'manual') {
      URL = URLS.MODERATION_TYPE_AUTO;
      MOD_TYPE = 'auto';
    } else if (moderationType === 'auto') {
      URL = URLS.MODERATION_TYPE_MANUAL;
      MOD_TYPE = 'manual';
    }

    fetchWithAuth(URL, {
      method: 'POST',
      })
      .then(response => {
        if (response.ok) {
          setModerationType(MOD_TYPE);
        } else {
          throw new Error('Ошибка при изменении типа модерации');
        }
      })
      .catch(error => {
        console.error('Ошибка при изменении типа модерации:', error);
        alert('Ошибка при изменении типа модерации');
      });
  };

  const handleFindAllReservations = (evt) => {
    evt.preventDefault();

    let URL = '';
    
    if (dateAll) {
      URL = `${URLS.ADMIN_RESERVATIONS_ALL}${dateAll}/`;
    } else {
      URL = URLS.ADMIN_RESERVATIONS_ALL;
    }

    fetchWithAuth(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных о бронированиях');
        }
      })
      .then(data => setReservations(data))
      .catch(error => {
        console.error('Ошибка', error);
        alert('Ошибка при получении данных о бронированиях');
      });
  };

  const handleFindVerifyReservations = (evt) => {
    evt.preventDefault();

    let URL = '';
    
    if (dateVerify) {
      URL = `${URLS.ADMIN_RESERVATIONS_VERIFY}${dateVerify}/`;
    } else {
      URL = URLS.ADMIN_RESERVATIONS_VERIFY;
    }

    fetchWithAuth(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных о бронированиях');
        }
      })
      .then(data => setReservations(data))
      .catch(error => {
        console.error('Ошибка', error);
        alert('Ошибка при получении данных о бронированиях')
      });
  };

  const handleCancelReservation = (reservationId) => {
    const URL = `${URLS.ADMIN_DECISION}${reservationId}/`;

    fetchWithAuth(URL, {
      method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setReservations(reservations.map(reservation => 
            reservation.id === reservationId ? { ...reservation, status: 'CANCEL' } : reservation
          ));
        } else {
          throw new Error('Ошибка при отмене бронирования:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Ошибка', error);
        alert('Ошибка при отмене бронирования')
      });
  };

  const handleConfirmReservation = (reservationId) => {
    const URL = `${URLS.ADMIN_DECISION}${reservationId}/confirm/`;

    fetchWithAuth(URL, {
      method: 'PUT',
      })
      .then(response => {
        if (response.ok) {
          setReservations(reservations.map(reservation => 
            reservation.id === reservationId ? { ...reservation, status: 'PAID' } : reservation
          ));
        } else {
          throw new Error('Ошибка при подтверждении бронирования:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Ошибка', error);
        alert('Ошибка при подтверждении бронирования')
      });
  };

  return (
    <main className="admin wrapper">
      <div className="admin__wrap">
      
        <div className="admin__panel">
          <h1 className="admin__title title">Панель администратора</h1>

          <div className="admin__mode_wrap">
            <div className="admin__mode_inner-wrap">
              <p className="admin__mode_label label">тип модерации</p>
              <p className="admin__mode_text">{moderationType ? MODERATION_TYPE[moderationType] : ''}</p>
            </div>

            <button className="admin__btn button" onClick={handleModerationTypeChange}>Изменить</button>
          </div>
          
          <a href={URLS.NEW_TABLE} target="_blank" className="admin__btn button">Создать стол</a>

          <div className="admin__dates_wrap">
            <form className="admin__date" onSubmit={handleFindAllReservations}>
              <p className="admin__date_text">Просмотр всех бронирований</p>
              <p className="admin__date_label label">дата</p>
              <input 
                type="date" 
                className="admin__date_input input"
                value={dateAll}
                onChange={(evt) => setDateAll(evt.target.value)}
              />

              <button type='submit' className="admin__btn button">Поиск</button>            
            </form>

            <form className="admin__date" onSubmit={handleFindVerifyReservations}>
              <p className="admin__date_text">Подтверждение бронирований</p>
              <p className="admin__date_label label">дата</p>
              <input 
                type="date" 
                className="admin__date_input input"
                value={dateVerify}
                onChange={(evt) => setDateVerify(evt.target.value)}
              />

              <button className="admin__btn button">Поиск</button>            
            </form>
          </div>
        </div>
      
        {reservations && (
          <div className="admin__reservations">
            <h2 className="admin__title title">Просмотр бронирований</h2>

            {sortByDate(reservations).map(reservation => (
              <FullReservationItem 
                key={reservation.id} 
                reservation={reservation}
                onCancel={handleCancelReservation}
                onConfirm={handleConfirmReservation}
                isStaff={state.isStaff}
              />
            ))}

            {reservations.length === 0 && (
              <p className='reservations__no-reservations'>В эту дату бронирований не найдено</p>
            )}

          </div>
        )}
        
      </div>
    </main>
  )
}
