import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setlastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    //dispatch(uiOpenModal());
  };

  const onViewChange = (vistaActual) => {
    setlastView(vistaActual);
    localStorage.setItem('lastView', vistaActual);
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return {
      style,
    };
  };

  const onSelectedSlot = (e) => {
    dispatch(eventClearActiveEvent());
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
        onSelectSlot={onSelectedSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      {!!activeEvent && <DeleteEventFab />}
      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
