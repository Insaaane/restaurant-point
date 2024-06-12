import React from 'react';

export default function Entry() {
  return (
    <main className="entry wrapper">
      <div className="entry__wrap">
        <h1 className="entry__title title">Регистрация</h1>

        <form action="" className="entry__form">
          <div className="entry__form_item">
            <label htmlFor="name" className="entry__label">Имя</label>
            <input id="name" type="text" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="surname" className="entry__label">Фамилия</label>
            <input id="surname" type="text" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="login" className="entry__label">Логин</label>
            <input id="login" type="text" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="email" className="entry__label">Email</label>
            <input id="email" type="email" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="phone" className="entry__label">Номер телефона</label>
            <input id="phone" type="tel" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="password" className="entry__label">Пароль</label>
            <input id="password" type="password" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="re-password" className="entry__label">Повторите пароль</label>
            <input id="re-password" type="password" className="entry__input input"/>
          </div>

          <button className="entry__btn button">Создать аккаунт</button>
          
        </form>
      </div>
    </main>
  );
}
