import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchForm() {
  const { filterByName, setFilterByName } = useContext(MyContext);
  const { name } = filterByName;

  function handleChange({ target }) {
    const { value } = target;
    setFilterByName((state) => ({
      ...state,
      name: value,
    }));
  }

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleChange }
      />
    </form>
  );
}

export default SearchForm;
