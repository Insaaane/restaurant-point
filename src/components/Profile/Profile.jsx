import React from 'react';
import { Link } from 'react-router-dom';

import ReservationItem from './ReservationItem.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';

import AvatarIcon from '../../assets/images/svg/avatar-icon.svg';

export default function Profile() {
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
              <p className="profile__data_text">Василий</p>

              <p className="profile__data_label label">имя</p>
              <p className="profile__data_text">Пупкин</p>

              <button className="profile__edit-btn link">редактировать профиль</button>
            </div>

            <div className="profile__data-right">
              <p className="profile__data_label label">email</p>
              <p className="profile__data_text">vasiya228@mail.ru</p>

              <p className="profile__data_label label">номер телефона</p>
              <p className="profile__data_text">+79123456780</p>

              <Link to='/admin' className="profile__admin-btn link">панель администратора</Link>
            </div>
          </div>
        </div>

        <div className="profile__reservations">
          
          <h1 className="profile__reservations_title">Все бронирования</h1>

          <ReservationItem/>
          <ReservationItem/>
          <ReservationItem/>

          {/* <EditProfilePopup/> */}
          
        </div>

      </div>
    </main>
  )
}
