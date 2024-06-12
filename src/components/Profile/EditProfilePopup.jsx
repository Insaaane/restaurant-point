import React from 'react';

import CloseIcon from '../../assets/images/svg/close-icon.svg';

export default function EditProfilePopup() {
  return (
    <div className="profile-edit__popup popup">
      <div className="profile-edit__wrap">
        <img src={CloseIcon} alt="Закрыть" className="close"/>
        <div className="profile-edit__content">
          <h1 className="profile-edit__title entry__title title">Редактирование профиля</h1>

          <div className="profile-edit__form_wrap">

            <form action="" className="profile-edit__form">
              <h2 className="profile-edit__subtitle">Личная информация</h2>
              
              <div className="profile-edit__form_item">
                <label for="name" className="profile-edit__label">Имя</label>
                <input id="name" type="text" className="profile-edit__input input"/>
              </div>
    
              <div className="profile-edit__form_item">
                <label for="surname" className="profile-edit__label">Фамилия</label>
                <input id="surname" type="text" className="profile-edit__input input"/>
              </div>

              <button className="profile-edit__submit-btn button">Обновить</button>
            </form>
            
            <form action="" className="profile-edit__form">
              <h2 className="profile-edit__subtitle"> Изменение пароля</h2>

              <div className="profile-edit__form_item">
                <label for="old-password" className="profile-edit__label">Старый пароль</label>
                <input id="old-password" type="password" className="profile-edit__input input"/>
              </div>
    
              <div className="profile-edit__form_item">
                <label for="password" className="profile-edit__label">Новый пароль</label>
                <input id="password" type="password" className="profile-edit__input input"/>
              </div>

              <button className="profile-edit__submit-btn button">Обновить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
