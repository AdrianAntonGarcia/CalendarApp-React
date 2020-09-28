import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { setActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //new Date en moment
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
      _id: '123',
      name: 'Adrian',
    },
  },
];
export const CalendarScreen = () => {
  const [lastView, setlastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );
  const dispatch = useDispatch();
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(setActive(e));
    dispatch(uiOpenModal());
  };

  const onViewChange = (vistaActual) => {
    setlastView(vistaActual);
    localStorage.setItem('lastView', vistaActual);
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return {
      style,
    };
  };
  return (
    <div>
      <Navbar />
      <Calendar
        className="calendar-screen"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
