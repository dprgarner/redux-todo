import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  FILTER_ALL,
  FILTER_INCOMPLETE,
  FILTER_COMPLETE,
} from './constants';

const addTodo = (text) => ({
  type: ADD_TODO,
  text,
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

const filterAll = () => ({
  type: SET_FILTER,
  filter: FILTER_ALL,
});

const filterIncomplete = () => ({
  type: SET_FILTER,
  filter: FILTER_INCOMPLETE,
});

const filterComplete = () => ({
  type: SET_FILTER,
  filter: FILTER_COMPLETE,
});

export {addTodo, toggleTodo, filterAll, filterIncomplete, filterComplete};