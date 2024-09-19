import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { addDays } from 'date-fns';

import { minDate } from '../../utils/date.js';
import { URLS } from '../../utils/urls.js';
import { fetchWithAuth } from '../../utils/auth.js';

import table1 from '../../assets/images/order-bg.jpg';
import table2 from '../../assets/images/order-bg-2.jpg';
import table3 from '../../assets/images/order-bg-3.jpg';

export default function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [date, setDate] = useState(state.date);
  const [table, setTable] = useState(state.table);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const [numPeople, setNumPeople] = useState(0);

  let IMG_SRC = table1;
  if (table.table_id) {
    if (table.table_id % 3 === 0) {
      IMG_SRC = table3;
    } else if (table.table_id % 3 === 2) {
      IMG_SRC = table2;
    }
  } else {
    if (table.id % 3 === 0) {
      IMG_SRC = table3;
    } else if (table.id % 3 === 2) {
      IMG_SRC = table2;
    }
  }

  useEffect(() => {
    let URL = '';
    
    if (table.table_id) {
      URL = `${URLS.TABLES}${table.table_id}/${date}/`;
    } else {
      URL = `${URLS.TABLES}${table.id}/${date}/`;
    }
    
    fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении данных о столе');
        }
      })
      .then(data => setTable(data))
      .catch(error => {
        console.error('Ошибка', error);
        // alert('Ошибка при получении данных о столе');
      });
  }, [date]);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      let end = new Date(`1970-01-01T${endTime}:00`);

      if (startTime === endTime) {
        end = new Date(`1970-01-02T${endTime}:00`);
      } else if (start > end) {
        end = new Date(`1970-01-02T${endTime}:00`); 
      }

      const hours = (end - start) / 1000 / 60 / 60;
      setTotalCost(hours * table.price);
    } else {
      setTotalCost(0);
    }
  }, [startTime, endTime, table.price]);

  const handleStartTimeChange = (evt) => {
    setStartTime(evt.target.value);
  };

  const handleEndTimeChange = (evt) => {
    setEndTime(evt.target.value);
  };

  const handleNumPeopleChange = (evt) => {
    setNumPeople(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const startDatetime = `${date}T${startTime}:00`;
    let endDatetime;

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (start >= end) {
      const nextDay = addDays(new Date(date), 1);
      const nextDayFormatted = nextDay.toISOString().split('T')[0];
      endDatetime = `${nextDayFormatted}T${endTime}:00`;
    } else {
      endDatetime = `${date}T${endTime}:00`;
    }

    const bookingData = {
      tableID: table.table_id,
      start_datetime: startDatetime,
      end_datetime: endDatetime,
      occupied_seats: numPeople
    };

    fetchWithAuth(URLS.BOOKING, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    })
    .then(response => {
      if (response.ok) {
        navigate('/profile');
      } else {
        throw new Error('Ошибка при бронировании')
      }
    })
    .catch(error => {
      console.error('Ошибка', error);
      alert('Ошибка бронирования');
    });
  };

  return (
    <main className="order" style={{background: `url(${IMG_SRC}) no-repeat center`, backgroundSize: 'cover'}}>
      <div className="order__wrap wrapper">
        <h1 className="order__title big-title">{table.title}</h1>
        <div className="order__container">
          <div className="order__desc">
            <p className="order__desc-text">{table.description}</p>
            <div className="order__cost_wrap">
              <p className="order__cost_title">Цена</p>
              <p className="order__cost_number">{table.price} руб/час</p>
            </div>
          </div>

          <form className="order__info" onSubmit={handleSubmit}>
            <p className="order__info_label">Выбранная дата</p>
            <input 
              type="date" 
              className="order__info_text date" 
              min={minDate} 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
            />

            <p className="order__info_label">Список свободных мест</p>
            <select className="order__info_text select">
              {table.schedule && table.schedule.map(time => (
                <option key={time.start_time} value="" className="order__info_select-item">
                  {`Свободно: ${time.free_seats} c ${time.start_time} до ${time.end_time}`}
                </option>
              ))}
              
            </select>

            {!localStorage.getItem('accessToken') && (
              <>
                <p className="order__info_label">Период бронирования</p>
                <div className="order__info_text-wrap">
                  <input 
                    type="time" 
                    step="3600" 
                    className="order__info_text" 
                    required 
                    onChange={handleStartTimeChange} 
                    value={startTime}
                  />
                  <input 
                    type="time" 
                    step="3600" 
                    className="order__info_text" 
                    required 
                    onChange={handleEndTimeChange} 
                    value={endTime}
                  />
                </div>

                <p className="order__info_label">Кол-во человек</p>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  value={numPeople} 
                  onChange={handleNumPeopleChange} 
                  className="order__info_text"
                />
              </>
            )}

            {!localStorage.getItem('accessToken') ? (
              <div className="order__info_btn-wrap">
                <button className="order__info_btn button">Забронировать</button>
                <p className="order__info_sum">{totalCost} руб</p>
              </div>
            ) : (
              <div className="order__info_btn-wrap">
                <Link to='/registration' className="order__info_btn button">Зарегистрироваться</Link>
              </div>
            )}

            
          </form>
        </div>
      </div>
    </main>
  )
}
