const addTodo = (text) => ({
  type: 'ADD_TODO',
  text,
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

const filterAll = () => ({
  type: 'FILTER_TODO',
  filter: 'ALL',
});

const filterIncomplete = () => ({
  type: 'FILTER_TODO',
  filter: 'INCOMPLETE',
});

const filterComplete = () => ({
  type: 'FILTER_TODO',
  filter: 'COMPLETE',
});

export {addTodo, toggleTodo, filterAll, filterIncomplete, filterComplete};