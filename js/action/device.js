import { createAction } from 'redux-actions';

var _selectDevice = createAction('SELECT_DEVICE');

export var selectDevice = (id) => dispatch => {
  dispatch(_selectDevice(id));
};
