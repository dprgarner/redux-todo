import {connect} from 'react-redux';
import {toggleTodo} from './actions';

const mapStateToProps = (state) => ({
  filter: state.filter,
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {dispatch(toggleTodo(id))},
});

export const Todo = ({text, onClick, active}) => {
  let style = !active ? {textDecoration: 'line-through'} : {};
  return (
    <li onClick={onClick} style={style}>{text}</li>
  )
};

const Todos = ({filter, todos, onTodoClick}) => {
  return (
    <ul>
      {todos.filter((todo) => (
        filter === 'ALL'
        || todo.active && filter === 'INCOMPLETE'
        || !todo.active && filter === 'COMPLETE'
      )).map((todo) =>
        <Todo
          key={todo.id}
          onClick={() => onTodoClick(todo.id)}
          {...todo}
        />
      )}
    </ul>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);