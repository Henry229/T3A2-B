import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, subDays, setHours, setMinutes } from 'date-fns';
import './calendar.css';

import React from 'react';

const Calendar = ({ date, setDate, updateDate }) => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const executeChange = (dt) => {
    setDate(dt);
    updateDate && updateDate(dt);
  };

  return (
    <DatePicker
      name='date'
      id='date'
      className='bookingForm text-gray-800 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-1 my-2 dark:bg-blue-100 dark:border-none  dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500'
      placeholderText='Select date'
      selected={date}
      onChange={(dt) => executeChange(dt)}
      includeDateIntervals={[
        { start: subDays(new Date(), 1), end: addDays(new Date(), 30) },
      ]}
      format='yyyy-MM-dd'
      timeFormat='p'
      dateFormat='Pp'
      showTimeSelect
      filterTime={filterPassedTime}
      disabledKeyboardNavigation
      minTime={setHours(setMinutes(new Date(), 0), 11)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      excludeTimes={[
        setHours(setMinutes(new Date(), 30), 14),
        setHours(setMinutes(new Date(), 0), 15),
        setHours(setMinutes(new Date(), 30), 15),
        setHours(setMinutes(new Date(), 0), 16),
        setHours(setMinutes(new Date(), 30), 16),
      ]}
    />
  );
};

export default Calendar;
