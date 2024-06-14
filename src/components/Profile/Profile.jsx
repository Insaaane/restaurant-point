import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchWithAuth } from '../../utils/auth.js'
import { URLS } from '../../utils/urls.js';
import { sortByDate } from '../../utils/date.js';

import ReservationItem from './ReservationItem.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import Loading from '../Loading.jsx';

import AvatarIcon from '../../assets/images/svg/avatar-icon.svg';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    fetchWithAuth(URLS.PROFILE)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных о пользователе');
        }
      })
      .then(data => setUser(data))
      .catch(error => {
        console.error('Ошибка', error);
        alert('Ошибка при получении данных о пользователе');
      });
  }, []);

  useEffect(() => {
    fetchWithAuth(URLS.RESERVATIONS)
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
  }, []);

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleDeleteReservation = (reservationId) => {
    const URL = `${URLS.RESERVATIONS}${reservationId}/`;

    fetchWithAuth(URL, {
      method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setReservations(reservations.map(reservation => 
            reservation.id === reservationId ? { ...reservation, status: 'CANCEL' } : reservation
          ));
        } else {
          throw new Error('Ошибка при удалении бронирования:', response.statusText);
        }
      })
      .catch(error => console.error('Ошибка', error));
  };

  if (!user) {
    return <Loading/>;
  }

  return (
    <main className="profile wrapper">
      <div className="profile__wrap">
        
        <div className="profile__info">
          <div className="profile__avatar_wrap">
            <img src={AvatarIcon} alt="Аватар" className="profile__avatar"/>
          </div>

          <div className="profile__data">
            <div className="profile__data-left">
              <p className="profile__data_label label">имя</p>
              <p className="profile__data_text">{user.first_name}</p>

              <p className="profile__data_label label">фамилия</p>
              <p className="profile__data_text">{user.last_name}</p>

              <button className="profile__edit-btn link" onClick={handleOpenEditPopup}>редактировать профиль</button>
            </div>

            <div className="profile__data-right">
              <p className="profile__data_label label">email</p>
              <p className="profile__data_text">{user.email}</p>

              <p className="profile__data_label label">номер телефона</p>
              <p className="profile__data_text">{user.phone_number}</p>

              {user.is_staff && <Link to='/admin' className="profile__admin-btn link">панель администратора</Link>}
            </div>
          </div>
        </div>

        <div className="profile__reservations">
          
          <h1 className="profile__reservations_title">Все бронирования</h1>

          {reservations && sortByDate(reservations).map(reservation => (
            <ReservationItem 
              key={reservation.id} 
              reservation={reservation} 
              onDelete={handleDeleteReservation} 
            />
          ))}
          
        </div>

        {isEditPopupOpen && (
          <EditProfilePopup user={user} onClose={handleCloseEditPopup} onProfileUpdate={handleProfileUpdate} />
        )}

      </div>
    </main>
  )
}
