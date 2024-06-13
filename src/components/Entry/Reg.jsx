import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URLS } from '../../utils/urls';

export default function Reg() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    password2: ''
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (formData.password !== formData.password2) {
      alert('Пароли не совпадают');
      return;
    }

    fetch(URLS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          fetch(URLS.LOGIN, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then((data) => {
              localStorage.setItem('accessToken', data.access);
              localStorage.setItem('refreshToken', data.refresh);
              navigate('/');
            });
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при регистрации');
      });
  };

  return (
    <main className="entry wrapper">
      <div className="entry__wrap">
        <h1 className="entry__title title">Регистрация</h1>

        <form action="" className="entry__form" onSubmit={handleSubmit}>
          <div className="entry__form_item">
            <label htmlFor="name" className="entry__label">Имя</label>
            <input 
              id="name" 
              type="text" 
              className="entry__input input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="entry__form_item">
            <label htmlFor="surname" className="entry__label">Фамилия</label>
            <input 
              id="surname" 
              type="text" 
              className="entry__input input"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="entry__form_item">
            <label htmlFor="username" className="entry__label">Логин</label>
            <input 
              id="username" 
              type="text" 
              className="entry__input input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="entry__form_item">
            <label htmlFor="email" className="entry__label">Email</label>
            <input 
              id="email" 
              type="email" 
              className="entry__input input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="entry__form_item">
            <label htmlFor="phone_number" className="entry__label">Номер телефона</label>
            <input 
              id="phone_number" 
              type="tel" 
              className="entry__input input"
              value={formData.phone_number}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <div className="entry__form_item">
            <label htmlFor="password2" className="entry__label">Повторите пароль</label>
            <input 
              id="password2" 
              type="password" 
              className="entry__input input"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className="entry__btn button">Создать аккаунт</button>
          
        </form>
      </div>
    </main>
  );
}
