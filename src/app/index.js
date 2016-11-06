import {createStore} from 'redux';
import React from 'react';
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';

import reducer from './reducer';

const AddTodo = connect()(({dispatch}) => {
  let input = '';
  return (
    <div>
      <input type="text" ref={node => {input = node}}></input>
      <button onClick={(e) => {
        dispatch({type: 'ADD_TODO', text: input.value})
      }}>Add!</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const Todos = connect(mapStateToProps)(({todos}) => (
  <ul>
    {todos.map((todo) =>
      <li>{todo.text}</li>
    )}
  </ul>
));

const App = () => (
  <main>
    <AddTodo />
    <Todos />
  </main>
);

export default function (selector) {
  let store = createStore(reducer);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    $(selector)[0]
  );
}