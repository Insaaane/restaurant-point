import React, { useState, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext.jsx';

import { URLS } from '../../utils/urls';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login } = useContext(AuthContext);

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(URLS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then((data) => login(data.access, data.refresh))
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при входе');
      });
  };

  return (
    <main className="entry wrapper">
      <div className="entry__wrap">
        <h1 className="entry__title title">Авторизация</h1>

        <form action="" className="entry__form" onSubmit={handleSubmit}>
          <div className="entry__form_item">
            <label htmlFor="username" className="entry__label">Логин</label>
            <input 
              id="username" 
              type="text" 
              className="entry__input input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="entry__form_item">
            <label htmlFor="password" className="entry__label">Пароль</label>
            <input 
              id="password" 
              type="password" 
              className="entry__input input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="entry__btn button">Войти в аккаунт</button>
          
        </form>
      </div>
    </main>
  );
}
