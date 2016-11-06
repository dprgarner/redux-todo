const addTodo = (text) => ({
  type: 'ADD_TODO',
  text,
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export {addTodo, toggleTodo};