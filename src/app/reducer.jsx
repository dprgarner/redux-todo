import _ from 'lodash';
import {combineReducers} from 'redux';

function filter(state='ALL', action) {
  return (action.type === 'FILTER_TODO') ? action.filter : state;
}

function todos(state=[], action) {
  let todos = [...state];

  switch (action.type) {
    case 'ADD_TODO':
      todos.push({id: todos.length, text: action.text, active: true});
      break;
    case 'TOGGLE_TODO':
      todos = _.map(todos, (todo) => {
        let active = (todo.id === action.id) ? !todo.active : todo.active;
        return {...todo, active};
      });
      break;
  }
  return todos;
}

export default combineReducers({
  filter,
  todos,
})