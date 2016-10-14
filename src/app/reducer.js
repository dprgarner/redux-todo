export default function reducer(state, action) {
  return {...state, todos: [
    ...state.todos,
    {id: state.todos.length, text: action.text}
  ]};
}