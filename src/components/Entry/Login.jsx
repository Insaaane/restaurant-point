import React from 'react';

export default function Login() {
  return (
    <main className="entry wrapper">
      <div className="entry__wrap">
        <h1 className="entry__title title">Регистрация</h1>

        <form action="" className="entry__form">
          <div className="entry__form_item">
            <label htmlFor="login" className="entry__label">Логин</label>
            <input id="login" type="text" className="entry__input input"/>
          </div>

          <div className="entry__form_item">
            <label htmlFor="password" className="entry__label">Пароль</label>
            <input id="password" type="password" className="entry__input input"/>
          </div>

          <button className="entry__btn button">Войти в аккаунт</button>
          
        </form>
      </div>
    </main>
  );
}
