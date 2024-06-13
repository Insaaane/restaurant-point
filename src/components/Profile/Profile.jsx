import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchWithAuth } from '../../utils/auth.js'
import { URLS } from '../../utils/urls.js';

import ReservationItem from './ReservationItem.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import Loading from '../Loading.jsx';

import AvatarIcon from '../../assets/images/svg/avatar-icon.svg';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    fetchWithAuth(URLS.PROFILE)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Ошибка при получении данных о пользователе:', error));
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

          <ReservationItem/>
          
        </div>

        {isEditPopupOpen && (
          <EditProfilePopup user={user} onClose={handleCloseEditPopup} onProfileUpdate={handleProfileUpdate} />
        )}

      </div>
    </main>
  )
}
