import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

/**
 * Acción asíncrona que realiza el login del usuario, llamando a la base de datos y
 * llamando a la acción para guardar el estado del usuario
 * @param {*} email
 * @param {*} password
 */
export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

/**
 * Acción asíncrona que realiza el registro del usuario, llamando a la base de datos y
 * llamando a la acción para guardar el estado del usuario
 * @param {*} email
 * @param {*} password
 * @param {*} name
 */
export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/new',
      { name, email, password },
      'POST'
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

/**
 * Acción asíncrona que comprueba que el token del usuario sea siendo
 * válido y mantiene la sesión del usuario
 */
export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      // Swal.fire('Error', body.msg, 'error');
      dispatch(checkingFinish());
    }
  };
};

/**
 * Ponemos el checking a false
 */
const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

/**
 * Acción síncrona que guarda el estado del usuario
 * @param {*} user
 */
const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
