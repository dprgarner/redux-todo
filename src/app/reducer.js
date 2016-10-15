const initialState = {
  todos: [],
};

export default function reducer(state=initialState, action) {
  let todos = [...state.todos];
  switch (action.type) {
    case 'ADD_TODO':
      todos.push({id: state.todos.length, text: action.text});
  }
  return {...state, todos};
}