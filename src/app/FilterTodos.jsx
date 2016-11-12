import _ from 'lodash';
import {connect} from 'react-redux';

import {filterAll, filterIncomplete, filterComplete} from './actions';

let filters = {
  'ALL': {
    text: 'All',
    action: filterAll,
  },
  'INCOMPLETE': {
    text: 'Incomplete',
    action: filterIncomplete,
  },
  'COMPLETE': {
    text: 'Complete',
    action: filterComplete,
  },
};

let FilterTodo = ({dispatch, text, action}) => {
  let liStyle = {display: 'inline-block', marginRight: '20px'};

  return (
    <li style={liStyle} onClick={() => {dispatch(action())}}>
      {text}
    </li>
  )
};
FilterTodo = connect()(FilterTodo);

const FilterTodos = () => (
  <ul style={{listStyle: 'none', padding: 0}}>
    {
      _.map(filters, (value, key) => (
        <FilterTodo key={key} {...value} />
      ))
    }
  </ul>
);

export default FilterTodos;