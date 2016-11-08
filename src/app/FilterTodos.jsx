const FilterTodos = () => {
  let ulStyle = {listStyle: 'none', padding: 0};
  let liStyle = {display: 'inline-block', marginRight: '20px'};

  return (
    <ul style={ulStyle}>
      {
        ['All', 'Incomplete', 'Complete'].map((name) => (
          <li key={name} style={liStyle}>{name}</li>
        ))
      }
    </ul>
  )
};

export default FilterTodos;