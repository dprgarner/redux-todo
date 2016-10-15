import {createStore} from 'redux';
import reducer from './reducer';

export default function (selector) {
  let $ctx = $(selector);
  let store = createStore(reducer);
  $ctx.append('<input type="text" value=""></input>');
  let $button = $('<button>Add!</button>').appendTo($ctx).click(handleClick);
  $ctx.append('<ul>');
  store.subscribe(renderList);

  function renderList() {
    var $ul = $ctx.find('ul');
    $ul.empty();
    store.getState().todos.forEach((todo) =>
      $('<li>').text(todo.text).appendTo($ul)
    );
  }

  function handleClick() {
    let text = $ctx.find('input').val();
    store.dispatch({type: 'ADD_TODO', text});
  }
}