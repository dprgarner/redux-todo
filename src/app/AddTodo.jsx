import {connect} from 'react-redux';

const AddTodo = ({dispatch}) => {
  let input;

  function onSubmit(e) {
    e.preventDefault();
    if (input.value.trim()) {
      dispatch({type: 'ADD_TODO', text: input.value});
      input.value = '';
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={node => {input = node}} />
      <button type="submit">Add!</button>
    </form>
  );
};

export default connect()(AddTodo);