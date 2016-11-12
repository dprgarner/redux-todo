const addTodo = (text) => ({
  type: 'ADD_TODO',
  text,
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

const filterAll = () => ({
  type: 'SET_FILTER',
  filter: 'ALL',
});

const filterIncomplete = () => ({
  type: 'SET_FILTER',
  filter: 'INCOMPLETE',
});

const filterComplete = () => ({
  type: 'SET_FILTER',
  filter: 'COMPLETE',
});

export {addTodo, toggleTodo, filterAll, filterIncomplete, filterComplete};