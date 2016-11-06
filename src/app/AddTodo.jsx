import {connect} from 'react-redux';

const AddTodo = ({dispatch}) => {
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
};

export default connect()(AddTodo);