import React, { useState, useEffect } from 'react';

import { fetchWithAuth } from '../../utils/auth.js';
import { URLS } from '../../utils/urls.js';

import CloseIcon from '../../assets/images/svg/close-icon.svg';

export default function EditProfilePopup({ user, onClose, onProfileUpdate }) {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);


  // изменение имени и фамилии
  const handleFirstNameChange = (evt) => {
    setFirstName(evt.target.value);
  };

  const handleLastNameChange = (evt) => {
    setLastName(evt.target.value);
  };

  const handleProfileSubmit = (evt) => {
    evt.preventDefault();

    const updatedUser = { ...user, first_name: firstName, last_name: lastName };
    const upddatedName = { first_name: firstName, last_name: lastName };

    fetchWithAuth(URLS.UPDATE_NAME, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upddatedName),
      })
      .then(response => {
        if (response.ok) {
          onProfileUpdate(updatedUser);
          alert('Данные успешно обновлены');
        } else {
          throw new Error('Ошибка при обновлении пароля');
        }
      })
      .catch(error => {
        console.error('Ошибка при обновлении профиля:', error);
        alert('Ошибка при обновлении профиля')
      });
  };

  // измеенение пароля
  const handleOldPasswordChange = (evt) => {
    setOldPassword(evt.target.value);
  };

  const handleNewPasswordChange = (evt) => {
    setNewPassword(evt.target.value);
  };

  const handlePasswordSubmit = (evt) => {
    evt.preventDefault();

    const passwordData = {
      current_password: oldPassword,
      password: newPassword,
    };

    fetchWithAuth(URLS.UPDATE_PASSWORD, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
      })
      .then(response => {
        if (response.ok) {
          setOldPassword('');
          setNewPassword('');
        } else {
          throw new Error('Ошибка при обновлении пароля');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при обновлении пароля');
      });
  };

  return (
    <div className="profile-edit__popup popup">
      <div className="profile-edit__wrap">
        <img src={CloseIcon} alt="Закрыть" className="close" onClick={onClose}/>
        <div className="profile-edit__content">
          <h1 className="profile-edit__title entry__title title">Редактирование профиля</h1>

          <div className="profile-edit__form_wrap">

            <form className="profile-edit__form" onSubmit={handleProfileSubmit}>
              <h2 className="profile-edit__subtitle">Личная информация</h2>
              
              <div className="profile-edit__form_item">
                <label htmlFor="first_name" className="profile-edit__label">Имя</label>
                <input
                  id="first_name"
                  type="text"
                  className="profile-edit__input input"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
    
              <div className="profile-edit__form_item">
                <label htmlFor="last_name" className="profile-edit__label">Фамилия</label>
                <input
                  id="last_name"
                  type="text"
                  className="profile-edit__input input"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>

              <button type='submit' className="profile-edit__submit-btn button">Обновить</button>
            </form>
            
            <form className="profile-edit__form" onSubmit={handlePasswordSubmit}>
              <h2 className="profile-edit__subtitle"> Изменение пароля</h2>

              <div className="profile-edit__form_item">
                <label htmlFor="old_password" className="profile-edit__label">Старый пароль</label>
                <input
                  id="old_password"
                  type="password"
                  className="profile-edit__input input"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  required
                />
              </div>
    
              <div className="profile-edit__form_item">
                <label htmlFor="new_password" className="profile-edit__label">Новый пароль</label>
                <input
                  id="new_password"
                  type="password"
                  className="profile-edit__input input"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                />
              </div>

              <button type='submit' className="profile-edit__submit-btn button">Обновить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
