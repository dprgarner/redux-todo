import {connect} from 'react-redux';
import {toggleTodo} from './actions';

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {dispatch(toggleTodo(id))},
})

const Todo = ({text, onClick, active}) => {
  let style = !active ? {textDecoration: 'line-through'} : {};
  return (
    <li onClick={onClick} style={style}>{text}</li>
  )
}

const Todos = ({todos, onTodoClick}) => (
  <ul>
    {todos.map((todo) =>
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>
);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);