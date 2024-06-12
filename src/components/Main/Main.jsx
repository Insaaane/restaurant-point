import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <main className="main">
      <div className="main__wrap wrapper">
        <h1 className="main__title big-title">
          Ресторан и Точка
        </h1>
        <p className="main__label">
          сделай правильный выбор
        </p>
        <Link to='/tables' type="button" className="main__btn button">
          Выбрать стол
        </Link>
      </div>
    </main>
  )
}
