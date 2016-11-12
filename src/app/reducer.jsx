import _ from 'lodash';
import {combineReducers} from 'redux';

import {ADD_TODO, TOGGLE_TODO, SET_FILTER, FILTER_ALL} from './constants';

export const filter = (state=FILTER_ALL, action) => (
  (action.type === SET_FILTER) ? action.filter : state
);

export function todos(state=[], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {
        id: state.length,
        text: action.text,
        completed: false,
      }];
    case TOGGLE_TODO:
      return _.map(state, (todo) => (
        (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo
      ));
  }
  return state;
}

export default combineReducers({filter, todos});