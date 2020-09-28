import React, { useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hour');
const end = moment().minutes(0).seconds(0).add(2, 'hour');

export const CalendarModal = () => {
  const [dateStart, setdateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(end.toDate());

  const [titleValid, setTitleValid] = useState(true);

  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => {
    return state.ui;
  });

  const [formValues, setformValues] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: end.toDate(),
  });

  const { notes, title, start: startForm, end: endForm } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const closeModal = () => {
    dispatch(uiCloseModal());
  };

  const handleStartDateChange = (e) => {
    setdateStart(e);
    setformValues({
      ...formValues,
      start: e,
    });
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setformValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    /*Converisión de fecha en javascript a fecha en moment */
    const momentStart = moment(startForm);
    const momentEnd = moment(endForm);

    if (momentStart.isSameOrAfter(momentEnd)) {
      console.log('Fecha 2 debe ser mayor');
      return Swal.fire(
        'Error',
        'La fecha fin debe de ser mayor a la fecha de inicio',
        'error'
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    //TODO: Realizar grabación en base de datos
    /*Básicamente el formValues es el evento que queremos almacenar*/
    dispatch(
      eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user: { _id: '123', name: 'Adrian' },
      })
    );
    setTitleValid(true);
    closeModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
