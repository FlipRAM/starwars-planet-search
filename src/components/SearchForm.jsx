import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchForm() {
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const {
    filterByName,
    setFilterByName,
    setFilterByNumericValues,
  } = useContext(MyContext);
  const { name } = filterByName;

  function handleChange({ target }) {
    const { value } = target;
    setFilterByName((state) => ({
      ...state,
      name: value,
    }));
  }

  function handleNumericChange({ target }) {
    const { value } = target;
    setNumericFilter((state) => ({
      ...state,
      [target.name]: value,
    }));
  }

  function sendFilter() {
    setFilterByNumericValues((state) => (
      [...state, numericFilter]
    ));
  }

  const dropdownColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const dropdownComparison = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <form>
      <label htmlFor="name">
        Planet Name:
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ handleChange }
          id="name"
        />
      </label>
      <label htmlFor="column">
        Column:
        <select
          data-testid="column-filter"
          id="column"
          name="column"
          onChange={ handleNumericChange }
          value={ numericFilter.column }
        >
          {dropdownColumn.map((column) => (
            <option key={ column }>
              {column}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        Comparison:
        <select
          data-testid="comparison-filter"
          id="comparison"
          name="comparison"
          onChange={ handleNumericChange }
          value={ numericFilter.comparison }
        >
          {dropdownComparison.map((each) => (
            <option key={ each }>
              {each}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="value">
        Value:
        <input
          type="number"
          data-testid="value-filter"
          id="value"
          name="value"
          onChange={ handleNumericChange }
          value={ numericFilter.value }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ sendFilter }
      >
        Filter
      </button>
    </form>
  );
}

export default SearchForm;
