import React from 'react';

export default function Order() {
  return (
    <main className="order">
      <div className="order__wrap wrapper">
        <h1 className="order__title big-title">Большой шведский стол</h1>
        <div className="order__container">
          <div className="order__desc">
            <p className="order__desc-text">
              Шведский стол, буфет — способ подачи пищи, при котором множество блюд выставляются рядом, и еда разбирается
              по тарелкам самими гостями.
            </p>
            <div className="order__cost_wrap">
              <p className="order__cost_title">Цена</p>
              <p className="order__cost_number">1000 руб/час</p>
            </div>
          </div>

          <form action="post" className="order__info">
            <p className="order__info_label">Выбранная дата</p>
            <input type="date" className="order__info_text" disabled/>

            <p className="order__info_label">Список свободных мест</p>
            <select name="" id="" className="order__info_text select">
              <option value="s" className="order__info_select-item">Свободно: 52 c 17:00 до 18:00</option>
            </select>

            <p className="order__info_label">Период бронирования</p>
            <div className="order__info_text-wrap">
              <input type="time" step="3600" className="order__info_text"/>
              <input type="time" step="3600" className="order__info_text"/>
            </div>

            <p className="order__info_label">Кол-во человек</p>
            <input type="number" min="1" max="100" value="0" className="order__info_text"/>

            <div className="order__info_btn-wrap">
              <button className="order__info_btn button">Оплатить</button>
              <p className="order__info_sum">3000 руб</p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
