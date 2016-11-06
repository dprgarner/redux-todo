import {connect} from 'react-redux';

const AddTodo = connect()(({dispatch}) => {
  let input = '';

  function onTodoClick() {
    if (input.value.trim()) {
      dispatch({type: 'ADD_TODO', text: input.value});
      input.value = '';
    }
  }

  return (
    <div>
      <input type="text" ref={node => {input = node}}></input>
      <button onClick={onTodoClick}>Add!</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const Todos = connect(mapStateToProps)(({todos}) => (
  <ul>
    {todos.map((todo) =>
      <li key={todo.id}>{todo.text}</li>
    )}
  </ul>
));

const App = () => (
  <main>
    <AddTodo />
    <Todos />
  </main>
);

export default App;