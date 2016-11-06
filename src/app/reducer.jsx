const _ = require('lodash');

const initialState = {
  todos: [],
};

export default function reducer(state=initialState, action={}) {
  let todos = [...state.todos];
  switch (action.type) {
    case 'ADD_TODO':
      todos.push({id: state.todos.length, text: action.text, active: true});
      break;
    case 'TOGGLE_TODO':
      todos = _.map(todos, (todo) => {
        let active = (todo.id === action.id) ? !todo.active : todo.active;
        return {...todo, active};
      })
      break;
  }
  return {...state, todos};
}