import {connect} from 'react-redux';
import {toggleTodo} from './actions';

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {dispatch(toggleTodo(id))},
});

export const Todo = ({text, onClick, completed}) => {
  let style = completed ? {textDecoration: 'line-through'} : {};
  return (
    <li onClick={onClick} style={style}>{text}</li>
  )
};

const Todos = ({filter, todos, onTodoClick}) => (
  <ul>
    {
      todos.filter((todo) => (
        filter === 'ALL'
        || todo.completed && filter === 'COMPLETE'
        || !todo.completed && filter === 'INCOMPLETE'
      )).map((todo) =>
        <Todo
          key={todo.id}
          onClick={() => onTodoClick(todo.id)}
          {...todo}
        />
      )
    }
  </ul>
);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);