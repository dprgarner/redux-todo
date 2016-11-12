import _ from 'lodash';
import {combineReducers} from 'redux';

export const filter = (state='ALL', action) => (
  (action.type === 'SET_FILTER') ? action.filter : state
);

export function todos(state=[], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: state.length,
        text: action.text,
        active: true,
      }];
    case 'TOGGLE_TODO':
      return _.map(state, (todo) => (
        (todo.id === action.id) ? {...todo, active: !todo.active} : todo
      ));
  }
  return state;
}

export default combineReducers({filter, todos});