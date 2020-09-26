import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //new Date en moment
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
  },
];
export const CalendarScreen = () => {
  return (
    <div>
      <Navbar />
      <Calendar className="calendar-screen"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
